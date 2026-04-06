/**
 * Unified Theme Manager for Explore Tamil Nadu
 * Handles Dark/Light Mode across all pages with persistence.
 */

const ThemeManager = (() => {
    const THEME_KEY = 'color-theme';

    const init = () => {
        // 1. Initial State Check
        if (localStorage.getItem(THEME_KEY) === 'dark' || 
            (!localStorage.getItem(THEME_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 2. Setup Listeners
        setupToggleListeners();
        updateIcons();
    };

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem(THEME_KEY, 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem(THEME_KEY, 'dark');
        }
        updateIcons();
    };

    const updateIcons = () => {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Find all possible theme icons across different pages
        const sunIcons = document.querySelectorAll('#sun-icon, .sun-icon, #sun-icon-mob');
        const moonIcons = document.querySelectorAll('#moon-icon, .moon-icon, #moon-icon-mob');

        sunIcons.forEach(icon => {
            if (isDark) icon.classList.remove('hidden');
            else icon.classList.add('hidden');
        });

        moonIcons.forEach(icon => {
            if (isDark) icon.classList.add('hidden');
            else icon.classList.remove('hidden');
        });
    };

    const setupToggleListeners = () => {
        // Select all potential toggle buttons
        const toggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mob, #aura-theme-toggle');
        
        toggleButtons.forEach(btn => {
            // Remove existing listeners if any (by cloning)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
        });
    };

    return {
        init,
        toggleTheme
    };
})();

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
