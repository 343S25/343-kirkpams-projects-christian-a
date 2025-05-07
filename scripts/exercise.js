import { redirectIfNotSetup } from './checkSetup.js';

redirectIfNotSetup();

document.addEventListener("DOMContentLoaded", () => {
    const DARK_MODE_KEY = "darkMode";
    function applyDarkMode(enable) {
        if (enable) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }

    const darkModeEnabled = localStorage.getItem(DARK_MODE_KEY) === "true";
    applyDarkMode(darkModeEnabled);
});