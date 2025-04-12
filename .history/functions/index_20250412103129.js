import functions from "firebase-functions";
import app from "./server/server.js";

// Log incoming requests (optional)
app.use((req, res, next) => {
  console.log(`Request incoming: ${req.method} ${req.path}`);
  next();
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app);
