For getAvailableDrinks() either do mongo search or get the full data back and parse it using
_.where
_.pluck

All measurements are in oz

Proposed API
```
drinks : [
    {
        name: "Margarita",
        glass: "High baller",
        alcoholic: true,
        categories: ["Ordinary Drink", "Cocktail"],
        ingredients: [
            {
                name: "tequila",
                quantity: 1.5

            }
        ]
    }
]
```