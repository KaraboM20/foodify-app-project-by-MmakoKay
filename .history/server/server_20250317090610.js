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
mongoose
  .connect(mongoURI || 'mongodb://localhost:27017/recipeDB')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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



    // Check if data exists, insert if empty
    const count = await Recipe.countDocuments();
    if (count === 0) {
      const recipes = [
        // Breakfast
        { name: "Pancakes", ingredients: ["flour", "milk", "eggs"], instructions: "Mix and cook on skillet", image: "pancakes.jpg", category: "breakfast" },
        { name: "Omelette", ingredients: ["eggs", "cheese", "ham"], instructions: "Beat eggs, cook with fillings", image: "omelette.jpg", category: "breakfast" },
        { name: "Toast", ingredients: ["bread", "butter"], instructions: "Toast bread, spread butter", image: "toast.jpg", category: "breakfast" },
        { name: "Cereal", ingredients: ["cereal", "milk"], instructions: "Pour cereal, add milk", image: "cereal.jpg", category: "breakfast" },
        { name: "Smoothie", ingredients: ["banana", "yogurt", "berries"], instructions: "Blend all ingredients", image: "smoothie.jpg", category: "breakfast" },
        // Lunch
        { name: "Sandwich", ingredients: ["bread", "ham", "cheese"], instructions: "Assemble and serve", image: "sandwich.jpg", category: "lunch" },
        { name: "Salad", ingredients: ["lettuce", "tomato", "dressing"], instructions: "Toss ingredients", image: "salad.jpg", category: "lunch" },
        { name: "Soup", ingredients: ["broth", "vegetables"], instructions: "Simmer ingredients", image: "soup.jpg", category: "lunch" },
        { name: "Wrap", ingredients: ["tortilla", "chicken", "veggies"], instructions: "Roll ingredients in tortilla", image: "wrap.jpg", category: "lunch" },
        { name: "Burger", ingredients: ["bun", "patty", "lettuce"], instructions: "Grill patty, assemble", image: "burger.jpg", category: "lunch" },
        // Dinner
        { name: "Pasta", ingredients: ["pasta", "sauce", "cheese"], instructions: "Boil pasta, add sauce", image: "pasta.jpg", category: "dinner" },
        { name: "Steak", ingredients: ["beef", "salt", "pepper"], instructions: "Grill steak, season", image: "steak.jpg", category: "dinner" },
        { name: "Pizza", ingredients: ["dough", "sauce", "cheese"], instructions: "Bake with toppings", image: "pizza.jpg", category: "dinner" },
        { name: "Stir Fry", ingredients: ["rice", "veggies", "soy sauce"], instructions: "Cook in wok", image: "stirfry.jpg", category: "dinner" },
        { name: "Roast", ingredients: ["chicken", "potatoes"], instructions: "Roast in oven", image: "roast.jpg", category: "dinner" },
        // Dessert
        { name: "Cake", ingredients: ["flour", "sugar", "eggs"], instructions: "Bake batter", image: "cake.jpg", category: "dessert" },
        { name: "Cookies", ingredients: ["flour", "butter", "chocolate"], instructions: "Bake dough", image: "cookies.jpg", category: "dessert" },
        { name: "Ice Cream", ingredients: ["cream", "sugar"], instructions: "Freeze mixture", image: "icecream.jpg", category: "dessert" },
        { name: "Pie", ingredients: ["crust", "apples", "sugar"], instructions: "Bake filling in crust", image: "pie.jpg", category: "dessert" },
        { name: "Brownie", ingredients: ["chocolate", "flour", "eggs"], instructions: "Bake batter", image: "brownie.jpg", category: "dessert" },
      ];
      await Recipe.insertMany(recipes);
      console.log("Inserted 20 recipes into recipeDB");
    } else {
      console.log("Recipes already exist, skipping insert");
    },
  
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  
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
const port = process.env.PORT || 3000; // Fallback to 3000 if .env is missing
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
