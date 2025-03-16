import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

// Initialize Express app
const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;


// Recipe Schema
const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: String,
    image: String,
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
        required: true,
      },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Create Recipe (POST)
app.post("/recipes", async (req, res) => {
    try {
        const { name, ingredients, instructions, image, category } = req.body;
        const newRecipe = new Recipe({ name, ingredients, instructions, image, category });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error("Error creating recipe:", error);
        res.status(500).json({ message: "Error creating recipe" });
    }
});

// Get Recipes (GET)
app.get("/recipes", async (req, res) => {
    try {
        const { search,category } = req.query; 

        let filter = {};

        if (category) {
            filter.category = category;
        }
        
        if (search) {
            filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        
        const recipes = await Recipe.find(filter);
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

// Get Recipe by ID (GET)
app.get("/recipes/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Error fetching recipe" });
    }
});

// Update Recipe (PUT)
app.put("/recipes/:id", async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error("Error updating recipe:", error);
        res.status(500).json({ message: "Error updating recipe" });
    }
});

// Delete Recipe (DELETE)
app.delete("/recipes/:id", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ message: "Error deleting recipe" });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
