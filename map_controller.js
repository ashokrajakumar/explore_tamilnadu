/**
 * map_controller.js - Interactive Tamil Nadu Map Logic
 */
const MapController = (() => {
    let ui = {};
    
    function init() {
        ui.mapContainer = document.getElementById('interactive-map-container');
        ui.tooltip = document.getElementById('map-tooltip');
        
        if (!ui.mapContainer) return;
        
        renderMap();
    }

    function renderMap() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 1000 1100");
        svg.setAttribute("class", "w-full h-auto drop-shadow-2xl");
        
        TAMIL_NADU_MAP_DATA.forEach(district => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", district.d);
            path.setAttribute("id", `map-${district.id}`);
            path.setAttribute("fill", "rgba(16, 185, 129, 0.1)");
            path.setAttribute("stroke", "rgba(16, 185, 129, 0.3)");
            path.setAttribute("stroke-width", "2");
            path.setAttribute("class", "transition-all duration-300 cursor-pointer hover:fill-emerald-500 hover:stroke-emerald-300");
            
            // Events
            path.addEventListener('mouseenter', (e) => handleHover(e, district));
            path.addEventListener('mousemove', (e) => moveTooltip(e));
            path.addEventListener('mouseleave', () => hideTooltip());
            path.addEventListener('click', () => navigateToDistrict(district.name));
            
            svg.appendChild(path);
        });
        
        ui.mapContainer.appendChild(svg);
    }

    function handleHover(e, district) {
        if (!ui.tooltip) return;
        ui.tooltip.innerHTML = `
            <div class="p-3 bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-emerald-500/20">
                <p class="text-[10px] uppercase font-bold text-emerald-600 mb-0.5">District</p>
                <p class="text-sm font-bold text-stone-800 dark:text-stone-100">${district.name}</p>
                <p class="text-[9px] text-stone-400 mt-1">Click to explore details</p>
            </div>
        `;
        ui.tooltip.classList.remove('hidden');
        
        // Highlight in UI
        const path = e.target;
        path.classList.add('scale-[1.01]');
    }

    function moveTooltip(e) {
        if (!ui.tooltip) return;
        ui.tooltip.style.left = (e.pageX + 15) + 'px';
        ui.tooltip.style.top = (e.pageY + 15) + 'px';
    }

    function hideTooltip() {
        if (!ui.tooltip) return;
        ui.tooltip.classList.add('hidden');
    }

    function navigateToDistrict(name) {
        window.location.href = `districts.html?name=${encodeURIComponent(name)}`;
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', MapController.init);
