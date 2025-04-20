import Logger, { LogLevel, logger } from '../../utils/logger';

// Mock console methods
const originalConsole = { ...console };
let consoleOutput: { [key: string]: any[] } = {};

beforeEach(() => {
  // Clear previous console output
  consoleOutput = {
    log: [],
    debug: [],
    info: [],
    warn: [],
    error: [],
  };
  
  // Mock console methods to capture output
  console.debug = jest.fn((...args) => {
    consoleOutput.debug.push(args);
  });
  
  console.info = jest.fn((...args) => {
    consoleOutput.info.push(args);
  });
  
  console.warn = jest.fn((...args) => {
    consoleOutput.warn.push(args);
  });
  
  console.error = jest.fn((...args) => {
    consoleOutput.error.push(args);
  });
});

afterEach(() => {
  // Restore original console methods
  console.debug = originalConsole.debug;
  console.info = originalConsole.info;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

describe('Logger', () => {
  describe('Initialization', () => {
    it('should create a logger instance with default config', () => {
      const testLogger = new Logger();
      expect(testLogger).toBeInstanceOf(Logger);
      expect(consoleOutput.info.length).toBeGreaterThan(0);
      expect(consoleOutput.info[0][2]).toBe('Logger initialized');
    });
    
    it('should create a logger instance with custom config', () => {
      const customConfig = {
        minLevel: LogLevel.ERROR,
        enableConsole: true,
        enableRemote: false,
        applicationName: 'TestApp',
      };
      
      const testLogger = new Logger(customConfig);
      expect(testLogger).toBeInstanceOf(Logger);
      expect(consoleOutput.info.length).toBeGreaterThan(0);
      
      // Check if config was applied
      const loggedConfig = consoleOutput.info[0][3].config;
      expect(loggedConfig.minLevel).toBe(LogLevel.ERROR);
      expect(loggedConfig.applicationName).toBe('TestApp');
    });
  });
  
  describe('Log Levels', () => {
    let testLogger: Logger;
    
    beforeEach(() => {
      // Create a new logger for each test with DEBUG min level
      testLogger = new Logger({ 
        minLevel: LogLevel.DEBUG,
        enableRemote: false,
      });
      
      // Clear console output from initialization
      consoleOutput.debug = [];
      consoleOutput.info = [];
      consoleOutput.warn = [];
      consoleOutput.error = [];
    });
    
    it('should not log messages below minimum level', () => {
      testLogger.trace('This should not be logged');
      expect(consoleOutput.debug.length).toBe(0);
    });
    
    it('should log debug messages', () => {
      testLogger.debug('Debug message');
      expect(consoleOutput.debug.length).toBe(1);
      expect(consoleOutput.debug[0][2]).toBe('Debug message');
    });
    
    it('should log info messages', () => {
      testLogger.info('Info message');
      expect(consoleOutput.info.length).toBe(1);
      expect(consoleOutput.info[0][2]).toBe('Info message');
    });
    
    it('should log warn messages', () => {
      testLogger.warn('Warning message');
      expect(consoleOutput.warn.length).toBe(1);
      expect(consoleOutput.warn[0][2]).toBe('Warning message');
    });
    
    it('should log error messages', () => {
      testLogger.error('Error message');
      expect(consoleOutput.error.length).toBe(1);
      expect(consoleOutput.error[0][2]).toBe('Error message');
    });
    
    it('should log fatal messages', () => {
      testLogger.fatal('Fatal message');
      expect(consoleOutput.error.length).toBe(1);
      expect(consoleOutput.error[0][2]).toBe('Fatal message');
    });
    
    it('should include additional data in log messages', () => {
      const testData = { id: 123, name: 'Test' };
      testLogger.info('Message with data', testData);
      expect(consoleOutput.info.length).toBe(1);
      expect(consoleOutput.info[0][2]).toBe('Message with data');
      expect(consoleOutput.info[0][3]).toEqual(testData);
    });
    
    it('should include source in log messages', () => {
      testLogger.info('Message with source', null, 'TestComponent');
      expect(consoleOutput.info.length).toBe(1);
      expect(consoleOutput.info[0][0]).toContain('[TestComponent]');
    });
  });
  
  describe('Configuration', () => {
    it('should update configuration', () => {
      const testLogger = new Logger({
        minLevel: LogLevel.INFO,
        enableRemote: false,
      });
      
      // Clear console output from initialization
      consoleOutput.debug = [];
      consoleOutput.info = [];
      
      // Test initial config
      testLogger.debug('Should not log');
      expect(consoleOutput.debug.length).toBe(0);
      
      // Update config
      testLogger.configure({ minLevel: LogLevel.DEBUG });
      
      // Test updated config
      testLogger.debug('Should log now');
      expect(consoleOutput.debug.length).toBe(1);
      expect(consoleOutput.debug[0][2]).toBe('Should log now');
    });
    
    it('should disable console logging when configured', () => {
      const testLogger = new Logger({
        enableConsole: true,
        enableRemote: false,
      });
      
      // Clear console output from initialization
      consoleOutput.info = [];
      
      // Test initial config
      testLogger.info('Should log');
      expect(consoleOutput.info.length).toBe(1);
      
      // Update config to disable console
      testLogger.configure({ enableConsole: false });
      
      // Test updated config
      testLogger.info('Should not log');
      expect(consoleOutput.info.length).toBe(1); // Still 1 from before
    });
  });
  
  describe('Singleton Instance', () => {
    it('should export a singleton logger instance', () => {
      expect(logger).toBeInstanceOf(Logger);
    });
    
    it('should use the singleton logger for application logging', () => {
      // Clear console output
      consoleOutput.info = [];
      
      // Log using singleton
      logger.info('Test singleton');
      
      expect(consoleOutput.info.length).toBe(1);
      expect(consoleOutput.info[0][2]).toBe('Test singleton');
    });
  });
  
  // Note: Remote logging tests would typically be more complex and involve mocking fetch/API calls
  // For simplicity, we're not testing the actual remote logging functionality in this basic test suite
});