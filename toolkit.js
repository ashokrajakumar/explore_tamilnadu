/**
 * toolkit.js - Tamil Traveler's Language Toolkit
 */
const TravelerToolkit = (() => {
    const PHRASES = [
        { en: "Hello / Welcome", ta: "Vanakkam", phon: "Va-nah-kum" },
        { en: "Thank you", ta: "Nandri", phon: "Nun-dree" },
        { en: "How much is this?", ta: "Idhu enna vilai?", phon: "Idhu en-na vi-lay?" },
        { en: "Where is the temple?", ta: "Kovil enge irukku?", phon: "Ko-vil en-gay i-ru-ku?" },
        { en: "Water", ta: "Thanneer", phon: "Thun-neer" },
        { en: "Delicious!", ta: "Arumai!", phon: "A-ru-my!" },
        { en: "Yes", ta: "Aamaam", phon: "Aa-maam" },
        { en: "No", ta: "Illai", phon: "Il-ly" }
    ];

    function init() {
        createUI();
    }

    function createUI() {
        // Floating Toggle Button
        const btn = document.createElement('button');
        btn.id = 'toolkit-toggle';
        btn.className = 'fixed bottom-8 left-8 w-14 h-14 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center justify-center z-[100] hover:scale-110 transition-all group border-4 border-white dark:border-stone-800';
        btn.innerHTML = `<i data-lucide="languages" class="w-6 h-6"></i>`;
        
        // Modal Container
        const modal = document.createElement('div');
        modal.id = 'toolkit-modal';
        modal.className = 'fixed bottom-28 left-8 w-80 bg-white dark:bg-stone-900 rounded-[2rem] shadow-premium z-[100] hidden border border-stone-100 dark:border-stone-800 overflow-hidden animate-fade-in';
        modal.innerHTML = `
            <div class="p-6 bg-emerald-600 text-white">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-serif font-bold text-lg">Traveler's Toolkit</h3>
                    <button id="close-toolkit" class="w-6 h-6 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                        <i data-lucide="x" class="w-3 h-3"></i>
                    </button>
                </div>
                <p class="text-[10px] uppercase font-bold tracking-widest opacity-70">Essential Tamil Phrases</p>
            </div>
            <div class="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                <div class="space-y-3" id="phrase-list"></div>
            </div>
            <div class="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800">
                <p class="text-[9px] text-stone-400 text-center font-medium italic">"Language is the gateway to culture."</p>
            </div>
        `;

        document.body.appendChild(btn);
        document.body.appendChild(modal);

        const list = modal.querySelector('#phrase-list');
        PHRASES.forEach(p => {
            const row = document.createElement('div');
            row.className = 'p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm';
            row.innerHTML = `
                <div class="flex items-center justify-between mb-1">
                    <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">${p.en}</p>
                    <button class="speak-btn text-emerald-600 hover:scale-110 transition-transform"><i data-lucide="volume-2" class="w-3.5 h-3.5"></i></button>
                </div>
                <h4 class="text-lg font-bold text-stone-800 dark:text-stone-100">${p.ta}</h4>
                <p class="text-[10px] text-stone-400 font-medium italic">${p.phon}</p>
            `;
            
            row.addEventListener('click', () => speak(p.ta));
            list.appendChild(row);
        });

        // Event Listeners
        btn.addEventListener('click', () => {
            modal.classList.toggle('hidden');
            if (window.lucide) lucide.createIcons();
        });

        modal.querySelector('#close-toolkit').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        if (window.lucide) lucide.createIcons();
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ta-IN'; // Tamil (India)
            utterance.rate = 0.8; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
        }
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', TravelerToolkit.init);
