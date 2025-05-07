document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("bioData")) {
        window.location.href = "./index.html";
        return;
    }

    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const selectedTheme = document.querySelector('input[name="theme"]:checked')?.value;
            if (selectedTheme === "dark") {
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");

            }
        });
    });

    const form = document.getElementById("setup-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const name = formData.get("name").trim();
        const age = parseInt(formData.get("age"), 10);
        const sex = formData.get("sex");
        const heightFeet = parseInt(formData.get("heightFeet"), 10);
        const heightInches = parseInt(formData.get("heightInches"), 10);
        const height = `${heightFeet}'${heightInches}"`;
        const weight = parseInt(formData.get("weight"), 10);
        const goal = formData.get("goal");
        const waterGoal = parseInt(formData.get("waterGoal"), 10);
        const macroSplit = formData.get("macroSplit");
        const activityLvl = formData.get("activityLvl");
        const theme = formData.get("theme");

        const bioData = {
            name,
            age,
            sex,
            height,
            weight,
            goal,
            "water-goal": waterGoal,
            "macro-split": macroSplit,
            "activity-lvl": activityLvl,
            customGoals: []
        };

        localStorage.setItem("bioData", JSON.stringify(bioData));
        localStorage.setItem("darkMode", theme === "dark");

        window.location.href = "./index.html";
    });
});