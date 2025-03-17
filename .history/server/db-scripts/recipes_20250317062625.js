
use('recipeDB');

db.recipes.drop();

db.getCollection('recipes').insertMany([
        { "name": "Breakfast Burger", "category": "breakfast", "ingredients": ["bun", "egg", "bacon", "cheese", "lettuce"], "instructions": "Fry egg and bacon, assemble on bun with cheese and lettuce, serve warm.", "image": " https://stephenlarosa.co/wp-content/uploads/2021/07/Breakfast-Burger.blog-1-scaled.jpg" },
        { "name": "Breakfast Pizza", "category": "breakfast", "ingredients": ["pizza dough", "egg", "sausage", "cheese", "spinach"], "instructions": "Spread dough, top with scrambled egg, sausage, cheese, and spinach, bake at 400°F for 15 mins.", "image": "https://www.skinnytaste.com/wp-content/uploads/2018/02/breakfast-pizza-1-6.jpg" },
        { "name": "Breakfast Sandwich", "category": "breakfast", "ingredients": ["bread", "egg", "ham", "cheese", "butter"], "instructions": "Fry egg, layer with ham and cheese between buttered bread, grill until golden.", "image": "https://grilledcheesesocial.com/wp-content/uploads/2024/04/bagel-breakfast-sandwich-recipe-9.jpg" },
        { "name": "Breakfast Toast", "category": "breakfast", "ingredients": ["bread", "avocado", "egg", "salt", "pepper"], "instructions": "Toast bread, mash avocado on top, add fried egg, season with salt and pepper.", "image": "https://www.aberdeenskitchen.com/wp-content/uploads/2019/05/Avocado-Egg-Breakfast-Toast-FI-Thumbnail-1200X1200.jpg" },
        { "name": "Veggie Breakfast Pizza", "category": "breakfast", "ingredients": ["pizza dough", "egg", "bell peppers", "cheese", "mushrooms"], "instructions": "Roll out dough, top with scrambled egg, veggies, and cheese, bake at 400°F for 15 mins.", "image": "https://frommybowl.com/wp-content/uploads/2017/06/Cheezy_Vegan_Breakfast_Pizza_Smoky_Tempeh_Bacon-6.jpg" },
        { "name": "Chicken Burger", "category": "lunch", "ingredients": ["bun", "chicken patty", "lettuce", "tomato", "mayo"], "instructions": "Grill chicken patty, assemble on bun with lettuce, tomato, and mayo.", "image": "https://i.ytimg.com/vi/L5Z3mO5SqJs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXIjGEsLrH8ZKQmhoiqH6d25b9qg" },
        { "name": "Pepperoni Pizza", "category": "lunch", "ingredients": ["pizza dough", "tomato sauce", "pepperoni", "cheese", "oregano"], "instructions": "Spread sauce on dough, add pepperoni and cheese, sprinkle oregano, bake at 425°F for 20 mins.", "image": "https://www.cobsbread.com/us/wp-content//uploads/2022/09/Pepperoni-pizza-850x630-1.png" },
        { "name": "Turkey Sandwich", "category": "lunch", "ingredients": ["bread", "turkey", "lettuce", "cheese", "mustard"], "instructions": "Layer turkey, lettuce, and cheese on bread, spread mustard, serve cold or grilled.", "image": "https://www.eatingonadime.com/wp-content/uploads/2022/03/eod-turkey-sandwich-5-2.jpg" },
        { "name": "Cheese Toast", "category": "lunch", "ingredients": ["bread", "cheese", "butter", "garlic", "parsley"], "instructions": "Butter bread, add cheese and garlic, bake at 375°F until melted, sprinkle parsley.", "image": "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese-500x500.jpg" },
        { "name": "Veggie Burger", "category": "lunch", "ingredients": ["bun", "veggie patty", "lettuce", "tomato", "ketchup"], "instructions": "Cook veggie patty, assemble on bun with lettuce, tomato, and ketchup.", "image": "https://biancazapatka.com/wp-content/uploads/2020/05/veganer-bohnen-burger.jpg" },
        { "name": "BBQ Burger", "category": "dinner", "ingredients": ["bun", "beef patty", "bbq sauce", "onion", "cheese"], "instructions": "Grill beef patty, brush with BBQ sauce, add onion and cheese on bun.", "image": "https://realfoodbydad.com/wp-content/uploads/2019/07/Southern-BBQ-Burger-Real-Food-by-Dad-683x1024.jpg" },
        { "name": "Meat Lovers Pizza", "category": "dinner", "ingredients": ["pizza dough", "tomato sauce", "sausage", "pepperoni", "cheese"], "instructions": "Spread sauce on dough, top with meats and cheese, bake at 425°F for 20 mins.", "image": "https://perfectitaliano.com.au/content/dam/perfectitaliano-aus/recipe/0_desktop/Desktop-BBQ-Meat-Lovers-21.jpg" },
        { "name": "Steak Sandwich", "category": "dinner", "ingredients": ["bread", "steak", "onion", "cheese", "pepper"], "instructions": "Grill steak, sauté onions, layer on bread with cheese, season with pepper.", "image": "https://www.twopeasandtheirpod.com/wp-content/uploads/2024/06/Steak-Sandwich-4348.jpg" },
        { "name": "Garlic Toast", "category": "dinner", "ingredients": ["bread", "butter", "garlic", "cheese", "parsley"], "instructions": "Mix butter with garlic, spread on bread, top with cheese, bake at 375°F, add parsley.", "image": "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/09/texastoast1.jpg" },
        { "name": "Mushroom Pizza", "category": "dinner", "ingredients": ["pizza dough", "tomato sauce", "mushrooms", "cheese", "basil"], "instructions": "Spread sauce, add mushrooms and cheese, bake at 425°F, garnish with basil.", "image": "https://www.acouplecooks.com/wp-content/uploads/2019/06/Mushroom-Pizza-with-Herbs-011.jpg" },
        { "name": "Dessert Burger", "category": "dessert", "ingredients": ["bun", "ice cream", "chocolate sauce", "sprinkles"], "instructions": "Scoop ice cream into bun, drizzle with chocolate sauce, add sprinkles.", "image": "https://www.amummytoo.co.uk/wp-content/uploads/2017/10/schar-gluten-free-apple-burger-treats-main-1.jpg" },
        { "name": "Dessert Pizza", "category": "dessert", "ingredients": ["pizza dough", "nutella", "banana", "powdered sugar"], "instructions": "Spread Nutella on dough, add banana slices, bake at 400°F, dust with sugar.", "image": "https://hallmark.brightspotcdn.com/dims4/default/df20191/2147483647/strip/true/crop/2500x1406+0+0/resize/1200x675!/quality/90/?url=http%3A%2F%2Fhallmark-channel-brightspot.s3.amazonaws.com%2Fca%2Fd5%2Fc3a471c07f35852418a5d3c4d675%2Fhhaf8112-200218-122128.jpg" },
        { "name": "Sweet Toast", "category": "dessert", "ingredients": ["bread", "butter", "cinnamon", "sugar", "honey"], "instructions": "Butter bread, sprinkle with cinnamon and sugar, toast, drizzle with honey.", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI8N1_DFTMwWW0zFLqu8I2E98Ydg633KmDAg&s" },
        { "name": "Fruit Sandwich", "category": "dessert", "ingredients": ["bread", "cream cheese", "strawberries", "blueberries"], "instructions": "Spread cream cheese on bread, add berries, sandwich together.", "image": "https://www.seriouseats.com/thmb/SSs7XT0dLI1YdWGdk_PMT7qScls=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20240304-SEA-DebbieWee-fruitsando-HERO-5a229f2d872b469ca43d5f51bc8dd318.jpg" },
        { "name": "Chocolate Toast", "category": "dessert", "ingredients": ["bread", "chocolate spread", "banana", "whipped cream"], "instructions": "Spread chocolate on toast, top with banana slices and whipped cream.", "image": "https://www.tasteofhome.com/wp-content/uploads/2018/01/Chocolate-French-Toast_EXPS_CMZ18_8306_B10_26_6b.jpg" }
]);


const allRecipes = db.getCollection('recipes').find().count();


console.log(`${allRecipes} recipes are available.`);


db.recipes.aggregate([
    { $group: { _id: "$category", totalRecipes: { $sum: 1 } } },
    { $sort: { _id: 1 } }
]).forEach(doc => print(`${doc._id}: ${doc.totalRecipes} recipes`));
