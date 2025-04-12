const functions = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const expressApp = require("../server"); // <-- This should point to your Express app

// Log incoming requests (optional)
expressApp.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Export the Express app as a Cloud Function
exports.api = functions.onRequest(expressApp);
