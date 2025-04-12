const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let conn = null;

// Define the schema and model
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  image: String,
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "dessert"],
    required: true,
  },
});
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

// Handler
exports.handler = async function (event, context) {
  // Connect to MongoDB only once
  if (conn == null) {
    conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await conn;
  }

  if (event.httpMethod === "GET") {
    try {
      const recipes = await Recipe.find({});
      return {
        statusCode: 200,
        body: JSON.stringify(recipes),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch recipes" }),
      };
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const { name, ingredients, instructions, image, category } = JSON.parse(event.body);

      const newRecipe = new Recipe({ name, ingredients, instructions, image, category });
      const savedRecipe = await newRecipe.save();

      return {
        statusCode: 201,
        body: JSON.stringify(savedRecipe),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save recipe" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
};
