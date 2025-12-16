import dotenv from "dotenv";

dotenv.config();

/**
 * Validates that a required environment variable is set
 * @param {string} key - The environment variable name
 * @param {string} value - The environment variable value
 * @throws {Error} If the variable is not set
 */
function validateRequired(key, value) {
  if (value === undefined || value === null || value === "") {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please set ${key} in your .env file or environment.`
    );
  }
}

/**
 * Validates that a port number is valid
 * @param {string} port - The port value
 * @returns {number} The validated port number
 * @throws {Error} If the port is missing or invalid
 */
function validatePort(port) {
  if (port === undefined || port === null || port === "") {
    throw new Error(
      `Missing required environment variable: PORT\n` +
      `Please set PORT in your .env file or environment.`
    );
  }
  const portNum = parseInt(port, 10);
  if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
    throw new Error(
      `Invalid PORT: ${port}. PORT must be a number between 1 and 65535.`
    );
  }
  return portNum;
}

/**
 * Validates NODE_ENV value
 * @param {string} nodeEnv - The NODE_ENV value
 * @returns {string} The validated NODE_ENV
 */
function validateNodeEnv(nodeEnv) {
  const validEnvs = ["development", "production", "test"];
  if (nodeEnv && !validEnvs.includes(nodeEnv)) {
    console.warn(
      `Warning: NODE_ENV is set to "${nodeEnv}". ` +
      `Expected one of: ${validEnvs.join(", ")}`
    );
  }
  return nodeEnv || "development";
}

// Load and validate environment variables
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// Validate required variables
validateRequired("DB_URL", DB_URL);

// Export validated configuration
export const ENV = {
  NODE_ENV: validateNodeEnv(NODE_ENV),
  PORT: validatePort(PORT),
  DB_URL: DB_URL,
};
