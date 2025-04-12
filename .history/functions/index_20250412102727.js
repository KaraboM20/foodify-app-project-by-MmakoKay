import functions from "firebase-functions";

import app from "./server/server.js";

// Log incoming requests (optional)
expressApp.use((req, res, next) => {
  logger.info(`Request incoming: ${req.method} ${req.path}`);
  next();
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(expressApp);
