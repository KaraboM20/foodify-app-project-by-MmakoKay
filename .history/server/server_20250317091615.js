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
        { "name": "Breakfast Burger", "category": "breakfast", "ingredients": ["bun", "egg", "bacon", "cheese", "lettuce"], "instructions": "Fry egg and bacon, assemble on bun with cheese and lettuce, serve warm.", "image": " https://stephenlarosa.co/wp-content/uploads/2021/07/Breakfast-Burger.blog-1-scaled.jpg" },
        { "name": "Breakfast Pizza", "category": "breakfast", "ingredients": ["pizza dough", "egg", "sausage", "cheese", "spinach"], "instructions": "Spread dough, top with scrambled egg, sausage, cheese, and spinach, bake at 400°F for 15 mins.", "image": "https://www.skinnytaste.com/wp-content/uploads/2018/02/breakfast-pizza-1-6.jpg" },
        { "name": "Breakfast Sandwich", "category": "breakfast", "ingredients": ["bread", "egg", "ham", "cheese", "butter"], "instructions": "Fry egg, layer with ham and cheese between buttered bread, grill until golden.", "image": "https://grilledcheesesocial.com/wp-content/uploads/2024/04/bagel-breakfast-sandwich-recipe-9.jpg" },
        { "name": "Breakfast Toast", "category": "breakfast", "ingredients": ["bread", "avocado", "egg", "salt", "pepper"], "instructions": "Toast bread, mash avocado on top, add fried egg, season with salt and pepper.", "image": "https://www.aberdeenskitchen.com/wp-content/uploads/2019/05/Avocado-Egg-Breakfast-Toast-FI-Thumbnail-1200X1200.jpg" },
        {"name": "Veggie Breakfast Pizza", "category": "breakfast", "ingredients": ["pizza dough", "egg", "bell peppers", "cheese", "mushrooms"], "instructions": "Roll out dough, top with scrambled egg, veggies, and cheese, bake at 400°F for 15 mins.", "image": "https://frommybowl.com/wp-content/uploads/2017/06/Cheezy_Vegan_Breakfast_Pizza_Smoky_Tempeh_Bacon-6.jpg" },
        // Lunch
        { { "name": "Chicken Burger", "category": "lunch", "ingredients": ["bun", "chicken patty", "lettuce", "tomato", "mayo"], "instructions": "Grill chicken patty, assemble on bun with lettuce, tomato, and mayo.", "image": "https://i.ytimg.com/vi/L5Z3mO5SqJs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXIjGEsLrH8ZKQmhoiqH6d25b9qg" },
        { "name": "Pepperoni Pizza", "category": "lunch", "ingredients": ["pizza dough", "tomato sauce", "pepperoni", "cheese", "oregano"], "instructions": "Spread sauce on dough, add pepperoni and cheese, sprinkle oregano, bake at 425°F for 20 mins.", "image": "https://www.cobsbread.com/us/wp-content//uploads/2022/09/Pepperoni-pizza-850x630-1.png" },
        { "name": "Turkey Sandwich", "category": "lunch", "ingredients": ["bread", "turkey", "lettuce", "cheese", "mustard"], "instructions": "Layer turkey, lettuce, and cheese on bread, spread mustard, serve cold or grilled.", "image": "https://www.eatingonadime.com/wp-content/uploads/2022/03/eod-turkey-sandwich-5-2.jpg" },
        { "name": "Cheese Toast", "category": "lunch", "ingredients": ["bread", "cheese", "butter", "garlic", "parsley"], "instructions": "Butter bread, add cheese and garlic, bake at 375°F until melted, sprinkle parsley.", "image": "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese-500x500.jpg" },
        { "name": "Veggie Burger", "category": "lunch", "ingredients": ["bun", "veggie patty", "lettuce", "tomato", "ketchup"], "instructions": "Cook veggie patty, assemble on bun with lettuce, tomato, and ketchup.", "image": "https://biancazapatka.com/wp-content/uploads/2020/05/veganer-bohnen-burger.jpg" },
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
    };


  
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

