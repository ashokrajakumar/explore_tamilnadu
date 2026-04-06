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
        checkVibe();
    };

    const checkVibe = () => {
        const hour = new Date().getHours();
        const body = document.documentElement;

        // Reset vibes
        body.classList.remove('vibe-dawn', 'vibe-golden', 'vibe-midnight');

        if (hour >= 4 && hour < 8) {
            body.classList.add('vibe-dawn');
            updateAuraColors('#FFECD2', '#FCB69F'); // Warm early sun
            console.log("Welcome to Dawn Vibe 🌅");
        } else if (hour >= 16 && hour < 20) {
            body.classList.add('vibe-golden');
            updateAuraColors('#FAD0C4', '#FFD1FF'); // Soft evening pink/purple
            console.log("Welcome to Golden Hour 🍯");
        } else if (hour >= 20 || hour < 4) {
            body.classList.add('vibe-midnight');
            updateAuraColors('#1E3A8A', '#0F172A'); // Deep night blue
            console.log("Welcome to Midnight Vibe 🌌");
        } else {
            // Day vibe
            updateAuraColors('#10b981', '#f59e0b'); // Emerald and Amber
        }
    };

    const updateAuraColors = (c1, c2) => {
        const aura1 = document.getElementById('aura-1');
        const aura2 = document.getElementById('aura-2');
        if (aura1 && aura2) {
            aura1.style.background = `radial-gradient(circle, ${c1} 0%, transparent 70%)`;
            aura2.style.background = `radial-gradient(circle, ${c2} 0%, transparent 70%)`;
        }
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
