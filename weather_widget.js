/**
 * Weather Widget for Explore Tamil Nadu (V2 Wow Feature)
 * Fetches/Mocks real-time weather data for key locations.
 */

const WeatherWidget = (() => {
    const locations = [
        { name: "Chennai", lat: 13.0827, lon: 80.2707, suffix: "Coastal" },
        { name: "Madurai", lat: 9.9252, lon: 78.1198, suffix: "Temple City" },
        { name: "Ooty", lat: 11.4102, lon: 76.6991, suffix: "Hill Station" },
        { name: "Kanyakumari", lat: 8.0883, lon: 77.5385, suffix: "Southern Tip" }
    ];

    let currentIndex = 0;

    const init = () => {
        updateWeather();
        // Cycle every 15 seconds
        setInterval(cycleLocation, 15000);
        
        // Show after 2 seconds
        setTimeout(() => {
            const el = document.getElementById('weather-reveal-widget');
            if (el) {
                el.classList.remove('opacity-0', 'scale-90', 'translate-y-10');
                el.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            }
        }, 2000);
    };

    const cycleLocation = () => {
        currentIndex = (currentIndex + 1) % locations.length;
        updateWeather();
    };

    const updateWeather = async () => {
        const loc = locations[currentIndex];
        const statusEl = document.getElementById('weather-desc');
        const tempEl = document.getElementById('weather-temp');
        const locEl = document.getElementById('weather-location');
        const iconContainer = document.getElementById('weather-icon-container');

        // Animation transition
        gsap.to([tempEl, locEl, statusEl], {
            opacity: 0,
            y: -10,
            duration: 0.5,
            stagger: 0.1,
            onComplete: () => {
                // Mock data for demo (replace with actual API if key available)
                const mockTemps = { "Chennai": 32, "Madurai": 34, "Ooty": 18, "Kanyakumari": 29 };
                const mockDesc = { "Chennai": "Sunny", "Madurai": "Clear Sky", "Ooty": "Misty", "Kanyakumari": "Breezy" };
                const mockIcons = { "Chennai": "sun", "Madurai": "sun", "Ooty": "cloud-lightning", "Kanyakumari": "wind" };

                tempEl.innerText = `${mockTemps[loc.name]}°C`;
                statusEl.innerText = mockDesc[loc.name];
                locEl.innerText = `${loc.name} — ${loc.suffix}`;
                
                if (window.lucide) {
                   iconContainer.innerHTML = `<i data-lucide="${mockIcons[loc.name]}" class="w-6 h-6 animate-pulse"></i>`;
                   lucide.createIcons();
                }

                gsap.to([tempEl, locEl, statusEl], {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1
                });
            }
        });
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', WeatherWidget.init);
