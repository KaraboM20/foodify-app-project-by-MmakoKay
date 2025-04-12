const express = require("express");
const serverless = require("serverless-http");

const app = express();

// Sample route (you can add your MongoDB and other routes here)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Netlify Function API!" });
});

// Export the Express app as a serverless function
module.exports.handler = serverless(app);
