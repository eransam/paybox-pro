import dotenv from "dotenv";
class Config {}

class DevelopmentConfig extends Config {
  isDevelopment = true;
  logFile = "logger.log";
  get_users = "http://localhost:3002/api/get_users";
  insertHistory = "http://localhost:3002/api/insertHistory";
  connectionString = "mongodb://localhost:27017/payBox";
}

class ProductionConfig extends Config {
  isDevelopment = false;
  logFile = "logger.log";
  connectionString = "mongodb://localhost:27017/payBox";
  get_users = "http://localhost:3002/api/get_users";
  insertHistory = "http://localhost:3002/api/insertHistory";
}

const config =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();
export default config;
