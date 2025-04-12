import functions from "firebase-functions";
import express from "express";
import app from "./server/server.js";

const app = express();
// Log incoming requests (optional)
app.use((req, res, next) => {
  logger.info(`Request incoming: ${req.method} ${req.path}`);
  next();
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest();
