const macroViewBox = document.getElementById("macro-view-box");
const foodViewBox = document.getElementById("food-view-box");
const addFoodButn = document.getElementById("add-food-butn");
const toggleViewButn = document.getElementById("toggle-view-butn");
const exitButn = document.getElementById("exit-search");
const nutritionContainer = document.getElementById("nutrition-container");
toggleViewButn.textContent = "See Foods";



let currentDay = 1;
const prevDayButn = document.getElementById("prev-day");
const nextDayButn = document.getElementById("next-day");
const dayLabel = document.getElementById("day-label");
updateDayLabel();

toggleViewButn.addEventListener('click', () => {
    if (macroViewBox.style.display === "none")
    {
        macroViewBox.style.display = "flex";
        foodViewBox.style.display = "none";
        toggleViewButn.textContent = "See Macros"
    }
    else
    {
        macroViewBox.style.display = "none";
        foodViewBox.style.display = "flex";
        toggleViewButn.textContent = "See Foods";
    }
});

prevDayButn.addEventListener('click', () => {
    if (currentDay > 1)
    {
        currentDay--;
        updateDayLabel();

    }
});

nextDayButn.addEventListener('click', () => {
    currentDay++;
    updateDayLabel();
});

function updateDayLabel() {
    dayLabel.textContent = `Day ${currentDay}`;
}

document.getElementById("food-input").addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        const query = event.target.value.trim();
        const usdaAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=khCsg6ERo2tKLqaq047WmgPTxWCdwjaig9nnbeme`

        try {
            const resp = await fetch(usdaAPI);
            const data = await resp.json();
            const foods = data.foods;
      
            const resultsDiv = document.getElementById("autocomplete-list");
            resultsDiv.innerHTML = "";
      
            if (!foods || foods.length === 0) {
              const noMatch = document.createElement("div");
              noMatch.textContent = "No results found.";
              resultsDiv.appendChild(noMatch);
              return;
            }
      
            foods.forEach(food => {
                const itemDiv = document.createElement("div");
                itemDiv.innerHTML = `<strong>${food.description.toLowerCase()}</strong>`;

              
                itemDiv.addEventListener("click", () => {
                    document.getElementById("food-input").value = food.description.toLowerCase();
                    resultsDiv.innerHTML = "";
                
                    const nutrientMap = {
                        calories: 0,
                        carbs: 0,
                        fat: 0,
                        protein: 0,
                        fiber: 0,
                        sodium: 0,
                        sugar: 0
                    };
                
                    
                    for (const nutrient of food.foodNutrients) {
                        const name = nutrient.nutrientName.toLowerCase();
                        const value = nutrient.value;
                
                        if (name.includes("energy"))
                            nutrientMap.calories = Math.round(value);
                        if (name.includes("carbohydrate"))
                            nutrientMap.carbs = Math.round(value);
                        if (name.includes("total lipid") || name === "fat")
                            nutrientMap.fat = Math.round(value);
                        if (name.includes("protein"))
                            nutrientMap.protein = Math.round(value);
                        if (name.includes("fiber"))
                            nutrientMap.fiber = Math.round(value);
                        if (name.includes("sodium"))
                            nutrientMap.sodium = Math.round(value);
                        if (name.includes("sugars") || name === "sugar")
                            nutrientMap.sugar = Math.round(value);
                    }
                
                    const form = document.getElementById("custom-form");
                    const inputs = form.querySelectorAll("input");
                
                    inputs.forEach(input => {
                        const field = input.placeholder.toLowerCase();
                        if (field === "name") {
                            input.value = food.description.toLowerCase();
                        } else if (nutrientMap[field] !== undefined) {
                            input.value = nutrientMap[field];
                        } else {
                            input.value = "";
                        }
                    });
                });


                resultsDiv.appendChild(itemDiv);
            });
      
          } catch (err) {
            console.error(err);
          }
        }
      });
 
document.addEventListener("click", function (event) {
    const searchBox = document.getElementById("usda-search");
    const resultList = document.getElementById("autocomplete-list");
      
    if (!searchBox.contains(event.target)) {
        resultList.innerHTML = "";
    }
});

addFoodButn.addEventListener('click', () => {
    if (macroViewBox) macroViewBox.style.display = "none";
    if (foodViewBox) foodViewBox.style.display = "none";

    addFoodButn.style.visibility = "hidden";
    toggleViewButn.style.visibility = "hidden";
    nutritionContainer.style.display = "flex";
    nextDayButn.style.visibility = "hidden";
    prevDayButn.style.visibility = "hidden";
    document.getElementById("day-label").style.visibility = "hidden";

    exitButn.style.display = "inline-block";
});

exitButn.addEventListener('click', () => {
    addFoodButn.style.visibility = "visible";
    toggleViewButn.style.visibility = "visible";
    nextDayButn.style.visibility = "visible";
    prevDayButn.style.visibility = "visible";
    document.getElementById("day-label").style.visibility = "visible";
    macroViewBox.style.display = "flex";

    nutritionContainer.style.display = "none";
    exitButn.style.display = "none";

})
            




