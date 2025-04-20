const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';
const analyzeBundle = process.env.ANALYZE === 'true';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
    chunkFilename: isProduction ? 'js/[name].[contenthash].chunk.js' : 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
    clean: true
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: !isProduction
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : false
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV || 'development'}`
    }),
    ...(isProduction ? [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].chunk.css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '',
            globOptions: {
              ignore: ['**/index.html', '**/favicon.ico']
            }
          }
        ]
      })
    ] : []),
    ...(analyzeBundle ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })] : [])
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  stats: {
    assets: true,
    modules: false,
    children: false
  },
  performance: {
    hints: isProduction ? 'warning' : false,
    maxAssetSize: 512000, // 500 KiB
    maxEntrypointSize: 512000 // 500 KiB
  }
};