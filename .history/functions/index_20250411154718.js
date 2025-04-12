import functions from "firebase-functions";
import logger from "firebase-functions/logger.js";
 // <-- This should point to your Express app

// Log incoming requests (optional)
expressApp.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app);
