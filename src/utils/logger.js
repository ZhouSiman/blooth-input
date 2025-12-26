/**
 * 日志工具
 */

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../../logs");

// 确保日志目录存在
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const getLogFile = (level) => {
  const date = new Date().toISOString().split("T")[0];
  return path.join(LOG_DIR, `${level}-${date}.log`);
};

const formatLog = (level, message, data) => {
  const timestamp = new Date().toISOString();
  const logMessage = data ? `${message} | ${JSON.stringify(data)}` : message;
  return `[${timestamp}] [${level}] ${logMessage}`;
};

const writeLog = (level, message, data) => {
  const formattedMessage = formatLog(level, message, data);
  const logFile = getLogFile(level);

  fs.appendFileSync(logFile, formattedMessage + "\n", "utf8");
};

const logger = {
  info: (message, data = null) => {
    const formattedMessage = formatLog("INFO", message, data);
    console.log(formattedMessage);
    writeLog("INFO", message, data);
  },

  error: (message, error = null) => {
    const formattedMessage = formatLog("ERROR", message, error?.message || error);
    console.error(formattedMessage);
    writeLog("ERROR", message, error?.message || error);
  },

  warn: (message, data = null) => {
    const formattedMessage = formatLog("WARN", message, data);
    console.warn(formattedMessage);
    writeLog("WARN", message, data);
  },

  debug: (message, data = null) => {
    if (process.env.ENABLE_DEBUG === "true") {
      const formattedMessage = formatLog("DEBUG", message, data);
      console.log(formattedMessage);
      writeLog("DEBUG", message, data);
    }
  },

  success: (message, data = null) => {
    const formattedMessage = formatLog("SUCCESS", message, data);
    console.log(formattedMessage);
    writeLog("SUCCESS", message, data);
  },
};

module.exports = logger;
