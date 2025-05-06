import { getTodayKey, parseDateKey } from './dateUtils.js';

const activeDay = getTodayKey();
localStorage.setItem("current-day", activeDay);

function calculatePercentages(current, target) {
    return Math.min(100, Math.round((current / target) * 100));
}


document.addEventListener("DOMContentLoaded", () => {
    const todayKey = getTodayKey();
    let dayData = JSON.parse(localStorage.getItem(`day-${todayKey}`));

    if (!dayData) {
        dayData = { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
    }
    
    let calories = 0;
    let carbs = 0;
    let fat = 0;
    let protein = 0;
    let fiber = 0;
    let sodium = 0;
    let sugar = 0;
    let water = 0;
    const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
    meals.forEach(meal => {
        let foods = dayData[meal];
        if (!foods) {
            foods = [];
        }
        foods.forEach(food => {
            calories += food.calories;
            carbs += food.carbs;
            fat += food.fat;
            protein += food.protein;
            fiber += food.fiber;
            sodium += food.sodium;
            sugar += food.sugar;
        });
        
            
    });
        // Get Rid of Hardcoded goals
        calories = calculatePercentages(calories, 2000);
        carbs = calculatePercentages(carbs, 200);
        fat = calculatePercentages(fat, 65);
        protein = calculatePercentages(protein, 200);
        sugar = calculatePercentages(sugar, 100);
        water = calculatePercentages(dayData.water, 3000);

        document.getElementById("cal").textContent = `${calories}%`;
        document.getElementById("carb").textContent = `${carbs}%`;
        document.getElementById("fat").textContent = `${fat}%`;
        document.getElementById("prot").textContent = `${protein}%`;
        document.getElementById("water").textContent = `${water}%`;
});





