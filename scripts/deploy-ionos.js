#!/usr/bin/env node

/**
 * IONOS Deployment Script
 * 
 * This script deploys the application to IONOS hosting using FTP.
 * It handles both the client and server deployment.
 * 
 * Usage:
 *   node deploy-ionos.js [environment]
 * 
 * Where environment is one of:
 *   - staging (default)
 *   - production
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const chalk = require('chalk');
const { program } = require('commander');
const archiver = require('archiver');

// Load environment variables
dotenv.config();

// Parse command line arguments
program
  .version('1.0.0')
  .argument('[environment]', 'deployment environment (staging or production)', 'staging')
  .option('-c, --client-only', 'deploy only the client')
  .option('-s, --server-only', 'deploy only the server')
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);

const options = program.opts();
const environment = program.args[0] || 'staging';

// Validate environment
if (!['staging', 'production'].includes(environment)) {
  console.error(chalk.red(`Error: Invalid environment "${environment}". Must be "staging" or "production".`));
  process.exit(1);
}

// Load environment-specific configuration
const envFile = `.env.${environment}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

// FTP configuration
const ftpConfig = {
  host: process.env.IONOS_FTP_HOST || 'ftp.ionos.com',
  port: parseInt(process.env.IONOS_FTP_PORT || '21', 10),
  user: process.env.IONOS_FTP_USER,
  password: process.env.IONOS_FTP_PASSWORD,
  secure: true, // Use FTPS
};

// Remote directories
const remoteDirectories = {
  staging: {
    client: '/staging',
    server: '/staging-api',
  },
  production: {
    client: '/',
    server: '/api',
  },
};

// Local directories
const localDirectories = {
  client: path.join(__dirname, '../client/build'),
  server: path.join(__dirname, '../server/dist'),
};

// Check if required directories exist
if (!options.serverOnly && !fs.existsSync(localDirectories.client)) {
  console.error(chalk.red(`Error: Client build directory not found at ${localDirectories.client}`));
  console.error(chalk.yellow('Run "npm run build" in the client directory first.'));
  process.exit(1);
}

if (!options.clientOnly && !fs.existsSync(localDirectories.server)) {
  console.error(chalk.red(`Error: Server build directory not found at ${localDirectories.server}`));
  console.error(chalk.yellow('Run "npm run build" in the server directory first.'));
  process.exit(1);
}

// Check if FTP credentials are provided
if (!ftpConfig.user || !ftpConfig.password) {
  console.error(chalk.red('Error: FTP credentials not found in environment variables.'));
  console.error(chalk.yellow('Make sure IONOS_FTP_USER and IONOS_FTP_PASSWORD are set.'));
  process.exit(1);
}

/**
 * Create a zip archive of a directory
 * 
 * @param {string} sourceDir - Source directory to zip
 * @param {string} outputPath - Output path for the zip file
 * @returns {Promise<void>} - Promise that resolves when the zip is created
 */
async function createZipArchive(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Highest compression level
    });

    output.on('close', () => {
      if (options.verbose) {
        console.log(chalk.gray(`Created zip archive: ${outputPath} (${archive.pointer()} bytes)`));
      }
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

/**
 * Deploy application to IONOS hosting
 */
async function deploy() {
  console.log(chalk.blue(`Deploying to ${environment} environment...`));
  
  const client = new ftp.Client();
  client.ftp.verbose = options.verbose;
  
  try {
    // Connect to FTP server
    console.log(chalk.gray('Connecting to FTP server...'));
    await client.access(ftpConfig);
    console.log(chalk.green('Connected to FTP server.'));
    
    // Deploy client
    if (!options.serverOnly) {
      console.log(chalk.blue('Deploying client...'));
      
      // Create zip archive of client build
      const clientZipPath = path.join(__dirname, '../client-build.zip');
      await createZipArchive(localDirectories.client, clientZipPath);
      
      // Upload client zip
      const clientRemoteDir = remoteDirectories[environment].client;
      console.log(chalk.gray(`Uploading client to ${clientRemoteDir}...`));
      await client.ensureDir(clientRemoteDir);
      await client.uploadFrom(clientZipPath, `${clientRemoteDir}/client-build.zip`);
      
      // Extract client zip on server (if supported)
      console.log(chalk.yellow('Note: You may need to extract the client-build.zip file on the server manually.'));
      
      // Clean up
      fs.unlinkSync(clientZipPath);
      console.log(chalk.green('Client deployment complete.'));
    }
    
    // Deploy server
    if (!options.clientOnly) {
      console.log(chalk.blue('Deploying server...'));
      
      // Create zip archive of server build
      const serverZipPath = path.join(__dirname, '../server-build.zip');
      await createZipArchive(localDirectories.server, serverZipPath);
      
      // Upload server zip
      const serverRemoteDir = remoteDirectories[environment].server;
      console.log(chalk.gray(`Uploading server to ${serverRemoteDir}...`));
      await client.ensureDir(serverRemoteDir);
      await client.uploadFrom(serverZipPath, `${serverRemoteDir}/server-build.zip`);
      
      // Extract server zip on server (if supported)
      console.log(chalk.yellow('Note: You may need to extract the server-build.zip file on the server manually.'));
      
      // Upload package.json and .env file
      console.log(chalk.gray('Uploading server package.json...'));
      await client.uploadFrom(
        path.join(__dirname, '../server/package.json'),
        `${serverRemoteDir}/package.json`
      );
      
      if (fs.existsSync(envFile)) {
        console.log(chalk.gray(`Uploading ${envFile}...`));
        await client.uploadFrom(
          path.join(__dirname, `../${envFile}`),
          `${serverRemoteDir}/.env`
        );
      }
      
      // Clean up
      fs.unlinkSync(serverZipPath);
      console.log(chalk.green('Server deployment complete.'));
    }
    
    console.log(chalk.green(`Deployment to ${environment} environment complete.`));
    
  } catch (err) {
    console.error(chalk.red('Deployment failed:'));
    console.error(err);
    process.exit(1);
  } finally {
    client.close();
  }
}

// Run deployment
deploy();