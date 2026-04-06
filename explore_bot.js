/**
 * Explore Bot - AI Travel Assistant for Explore Tamil Nadu
 * 
 * Upgraded to use Google Gemini 1.5 Flash AI Agent with fallback.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// ======== CONFIGURATION ========
// To enable the AI Agent, get a FREE API Key from: https://aistudio.google.com/
const CONFIG = {
    API_KEY: "AIzaSyA5n08447VibvENdLUcKBbNbPCdh-_2zp8", // Activated by User
    MODEL: "gemini-flash-latest",
    AGENT_NAME: "Explore Bot (AI Agent)",
};

const ExploreBot = (() => {
    // ======== CONSTANTS & DATA ========
    const DEFAULT_GREETING = "Namaste! 🙏 I'm your Tamil Nadu travel guide. I've been upgraded with **Gemini AI** to answer all your travel dreams! What are you looking to explore today?";

    const DISTANCE_MAP = {
        'chennai_madurai': 'Approx. 460 KM. Recommended: Vaigai Express (Train) or NH45 (Road).',
        'chennai_coimbatore': 'Approx. 510 KM. Recommended: Cheran Express or NH47.',
        'madurai_kanyakumari': 'Approx. 245 KM. Beautiful coastal drive via NH44.',
        'chennai_pondy': 'Approx. 150 KM. The scenic ECR road is a must-drive!',
        'chennai_trichy': 'Approx. 330 KM. Well connected by both rail and road.'
    };

    const LOCAL_CUISINE_MAP = {
        'madurai': 'Madurai is a food paradise! You MUST try the **Jigarthanda** (cool almond resin milk) and the famous **Bun Parotta**. For non-veg lovers, the Kari Dosai is legendary!',
        'chennai': 'Chennai offers everything from elite filter coffee to beach bajji. Don\'t miss the **Sowcarpet Sandwich**, **Marina Beach Sundal**, and authentic **Filter Kaapi**.',
        'tirunelveli': 'Tirunelveli is world-famous for its glossy, melt-in-the-mouth **Iruttu Kadai Halwa**. It\'s a sweet experience you won\'t forget!',
        'thanjavur': 'In Thanjavur, try the traditional **Ashoka Halwa** and the unique temple-style **Kovil Idli**.',
        'dindigul': 'You can\'t visit Dindigul without trying the **Thalappakatti Biryani**, made with aromatic Seeraga Samba rice!',
        'ooty': 'Hot **Ooty Varkey** (crispy biscuits) paired with fresh plantation tea is the perfect hill station snack!',
        'kanyakumari': 'Being a coastal town, the **Nanjil Fish Curry** and banana chips are the highlights here.'
    };

    // ======== UI ELEMENTS ========
    let ui = {};
    let genAI = null;
    let model = null;

    // ======== CORE LOGIC ========
    
    function initAI() {
        if (CONFIG.API_KEY && CONFIG.API_KEY !== "PASTE_YOUR_KEY_HERE") {
            try {
                genAI = new GoogleGenerativeAI(CONFIG.API_KEY);
                model = genAI.getGenerativeModel({ 
                    model: CONFIG.MODEL,
                    systemInstruction: `You are the 'Explore Bot', a friendly, professional AI travel assistant for Tamil Nadu, India.
                    
                    CUISINE CONCIERGE MODE:
                    If the user asks about food, dishes, or where to eat, always provide a rich, detailed response. 
                    Structure your response to include: 
                    1. The name of the dish/specialty.
                    2. The region it's famous for.
                    3. A brief 'vibe' description (e.g., 'Spicy & Heroic', 'Cool & Refreshing').
                    
                    Use emojis like 🙏 and ✨. Focus on Tamil Nadu's culture, food, temples, and history. 
                    If asked a non-travel question, politely steer the conversation back to exploring Tamil Nadu.`
                });
                console.log("AI Agent Initialized 🚀");
                return true;
            } catch (e) {
                console.error("AI Initialization failed", e);
                return false;
            }
        }
        return false;
    }

    async function fetchGeminiResponse(prompt) {
        if (!model) return null;
        try {
            const chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: "Hello!" }] },
                    { role: "model", parts: [{ text: "Namaste! 🙏 I am your Explore Bot. I am here to help you discover the hidden gems of Tamil Nadu! How can I assist you today? ✨" }] },
                ],
            });

            const result = await chat.sendMessage(prompt);
            return result.response.text();
        } catch (e) {
            console.error("Gemini Error:", e);
            return null;
        }
    }

    async function fetchWikiInfo(query) {
        const cleanQuery = query.toLowerCase()
            .replace(/how to go|tell me about|what is|where is|history of|distance|kilometers|how many/g, '')
            .trim();

        if (!cleanQuery) return null;

        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery + " Tamil Nadu")}&format=json&origin=*`;
        
        try {
            const sRes = await fetch(searchUrl);
            const sData = await sRes.json();
            const bestMatch = sData.query?.search?.[0]?.title;
            
            if (!bestMatch) return null;

            const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(bestMatch)}&origin=*`;
            const res = await fetch(url);
            const data = await res.json();
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pageId === "-1") return null;
            
            const extract = pages[pageId].extract;
            if (!extract) return null;

            const sentences = extract.split('. ').slice(0, 2);
            return sentences.join('. ') + (sentences.length > 0 ? '.' : '');
        } catch (e) {
            return null;
        }
    }

    function showTyping(show) {
        if (!ui.typingIndicator || !ui.chatMessages) return;
        if (show) {
            ui.typingIndicator.classList.remove('hidden');
            ui.chatMessages.scrollTop = ui.chatMessages.scrollHeight;
        } else {
            ui.typingIndicator.classList.add('hidden');
        }
    }

    function addMessage(text, isUser = false) {
        if (!ui.chatMessages) return;
        const msgDiv = document.createElement('div');
        
        msgDiv.className = `flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`;
        
        const botIconContent = `<i data-lucide="bot" class="w-5 h-5 text-emerald-600"></i>`;
        const userIconContent = `<i data-lucide="user" class="w-5 h-5 text-stone-400"></i>`;
        
        const avatar = `
            <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center shadow-sm">
                    ${isUser ? userIconContent : botIconContent}
                </div>
            </div>`;

        msgDiv.innerHTML = `
            ${avatar}
            <div class="max-w-[80%]">
                <div class="p-4 rounded-2xl ${isUser ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-sm border border-stone-100 dark:border-stone-700 rounded-tl-none'}">
                    <p class="text-sm leading-relaxed">
                        ${text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}
                    </p>
                </div>
            </div>
        `;
        
        ui.chatMessages.appendChild(msgDiv);
        ui.chatMessages.scrollTo({ top: ui.chatMessages.scrollHeight, behavior: 'smooth' });
        if (window.lucide) lucide.createIcons();
    }

    function addCuisineCard(data) {
        if (!ui.chatMessages) return;
        const cardDiv = document.createElement('div');
        cardDiv.className = "flex gap-3 mb-6 animate-fade-in";
        
        cardDiv.innerHTML = `
            <div class="flex-shrink-0 w-10"></div>
            <div class="max-w-[85%] w-full">
                <div class="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-[2rem] overflow-hidden shadow-xl border border-white/10">
                    <div class="h-32 bg-cover bg-center relative" style="background-image: url('${data.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80'}')">
                        <div class="absolute inset-0 bg-black/30"></div>
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-bold text-white uppercase tracking-widest">${data.category || 'Local Specialty'}</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h4 class="text-xl font-serif font-bold text-white mb-1">${data.name}</h4>
                        <p class="text-xs text-emerald-300 font-medium mb-4 flex items-center gap-1">
                            <i data-lucide="map-pin" class="w-3 h-3"></i> ${data.region}
                        </p>
                        <p class="text-sm text-emerald-100/70 leading-relaxed mb-6">${data.desc}</p>
                        <div class="flex items-center justify-between pt-4 border-t border-white/5">
                            <div class="flex -space-x-2">
                                <div class="w-6 h-6 rounded-full border-2 border-emerald-900 bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-900">🌶️</div>
                                <div class="w-6 h-6 rounded-full border-2 border-emerald-900 bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-900">⭐</div>
                            </div>
                            <button onclick="ExploreBot.addMessage('Tell me more about ${data.name}', true); ExploreBot.handleAIResponse('Tell me more about ${data.name}')" class="text-[10px] font-bold text-white uppercase tracking-wider hover:text-emerald-400 transition-colors">Analyze Flavors →</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        ui.chatMessages.appendChild(cardDiv);
        ui.chatMessages.scrollTo({ top: ui.chatMessages.scrollHeight, behavior: 'smooth' });
        if (window.lucide) lucide.createIcons();
    }


    async function handleAIResponse(userVal) {
        const val = userVal.toLowerCase();
        showTyping(true);

        let response = "";

        // Special Context: Tamil Nadu Sports / IPL / CSK (Addressing User frustration)
        if (val.includes("ipl") || val.includes("csk") || val.includes("cricket") || val.includes("match")) {
            response = "IPL and **CSK** are more than just sports in Tamil Nadu—they are a heartbeat! 🏏 While I'm your travel guide, I can't talk about Chennai without mentioning the **M. A. Chidambaram Stadium (Chepauk)**. It's the den of the 'Yellow Army'! If you're in Chennai during match season, the energy is electric. Shall I help you find things to do near the stadium? ✨";
        }

        // Attempt Gemini First (if configured)
        if (!response && model) {
            response = await fetchGeminiResponse(userVal);
        }

        // Fallback Logic
        if (!response) {
            const cities = ['chennai', 'madurai', 'coimbatore', 'trichy', 'pondy', 'kanyakumari', 'thanjavur', 'tirunelveli', 'dindigul', 'ooty'];
            const foundCities = cities.filter(c => val.includes(c));
            
            // 1. Food/Cuisine Intent
            if (val.includes("food") || val.includes("eat") || val.includes("dish") || val.includes("specialty") || val.includes("famous for")) {
                const targetCity = foundCities[0]; 
                if (targetCity && LOCAL_CUISINE_MAP[targetCity]) {
                    response = `Exploring the flavors of **${targetCity.toUpperCase()}**? ${LOCAL_CUISINE_MAP[targetCity]}`;
                } else if (val.includes("food") && !targetCity) {
                    response = "Tamil Nadu has a rich culinary heritage! From **Chettinad Spicy Curries** to **Dindigul Biryani**, every region has a story. Which city are you interested in?";
                }
            }
            
            // 2. Travel/Distance Logic
            if (!response && (val.includes("distance") || val.includes("how to go") || val.includes("km") || val.includes("kilometers")) && foundCities.length >= 2) {
                const key = foundCities.sort().slice(0, 2).join('_');
                if (DISTANCE_MAP[key]) {
                    response = `The distance between **${foundCities[0].toUpperCase()}** and **${foundCities[1].toUpperCase()}** is ${DISTANCE_MAP[key]}`;
                } else {
                    response = `Traveling between those cities usually takes 4-8 hours by TNSTC buses or Southern Railway trains. NH44 and NH45 are the main lifelines!`;
                }
            }
            
            // 3. Basic Intents
            if (!response) {
                if (val.includes("hi") || val.includes("hello") || val.includes("namaste")) {
                    response = "Hello! I'm happy to help you discover the beauty of Tamil Nadu. What's on your mind?";
                } else if (val.includes("temple")) {
                    response = "Tamil Nadu has some of the world's most magnificent temples. **Madurai Meenakshi**, **Thanjavur Big Temple**, and **Kanchipuram** are absolute must-visits!";
                } else if (val.includes("beach")) {
                    response = "We have stunning coastlines! **Marina Beach** in Chennai is the 2nd longest in the world, while **Mahabalipuram** offers history by the sea.";
                } else if (val.includes("hill") || val.includes("cool")) {
                    response = "For cool weather, traveler's love **Ooty**, **Kodaikanal**, and the tea gardens of **Valparai**.";
                } else {
                    // 4. Smart Search Backup
                    const wikiInfo = await fetchWikiInfo(userVal);
                    if (wikiInfo && wikiInfo.trim().length > 5) {
                        response = `That's a great question! Here's what I found: ${wikiInfo}`;
                    } else {
                        response = "I'm still learning about that specific detail. Did you know Tamil Nadu has over 33,000 ancient temples? You can ask me about **Temples**, **Beaches**, or **Hill Stations**!";
                    }
                }
            }
        }

        setTimeout(() => {
            showTyping(false);
            
            // Check if we should show a Cuisine Card (Heuristic-based for this demo, usually AI would trigger this)
            const foodKeywords = ['biryani', 'dosa', 'idli', 'coffee', 'halwa', 'pongal', 'meals'];
            const foundFood = foodKeywords.find(f => val.includes(f));
            
            if (foundFood) {
                // Generate a card for the found food
                const foodData = {
                    biryani: { name: "Thalappakatti Biryani", region: "Dindigul", desc: "Aromatic Seeraga Samba rice cooked with succulent meat and secret mountain spices.", category: "Legendary Main", image: "https://images.unsplash.com/photo-1563379091339-03b21ef4a4f8?auto=format&fit=crop&w=400&q=80" },
                    dosa: { name: "Podi Dose", region: "Madurai / Chennai", desc: "Crispy fermented crepe smeared with 'Gunpowder' spice mix and pure ghee.", category: "Street Soul", image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=400&q=80" },
                    coffee: { name: "Degree Filter Coffee", region: "Kumbakonam", desc: "Pure brass-filtered decoction with foamy, thick milk. The soul of Tamil mornings.", category: "Liquid Gold", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" },
                    halwa: { name: "Iruttu Kadai Halwa", region: "Tirunelveli", desc: "Wheat-based glossy sweet that melts at room temperature. Famous for its secret recipe.", category: "Classic Sweet", image: "https://images.unsplash.com/photo-1589119634773-8408d0391238?auto=format&fit=crop&w=400&q=80" }
                };
                
                if (foodData[foundFood]) {
                    addCuisineCard(foodData[foundFood]);
                    // Also add a text response
                    addMessage(`Excellent choice! **${foodData[foundFood].name}** is a masterpiece of Tamil cuisine. Here's a quick look at why it's so special:`);
                    return;
                }
            }

            addMessage(response);
        }, 800 + Math.random() * 1000);
    }

    function resetChat() {
        if (!ui.chatMessages) return;
        ui.chatMessages.innerHTML = '';
        
        let greeting = DEFAULT_GREETING;
        if (window.cleanName && window.cleanName !== 'Tamil Nadu') {
            greeting = `Vanakkam! 🙏 I see you're exploring **${window.cleanName}**. It's a truly remarkable part of Tamil Nadu! How can I help you discover its hidden gems, local flavors, or history?`;
        }
        
        addMessage(greeting);
    }

    // ======== INITIALIZATION ========
    
    function init() {
        const isChatPage = window.location.pathname.includes('chat.html');
        
        ui.toggleChatBtn = document.getElementById('toggle-chat-btn');
        ui.aiChatModal = document.getElementById('ai-chat-modal');
        ui.closeChatBtn = document.getElementById('close-chat-btn');
        ui.chatForm = document.getElementById('chat-form');
        ui.chatInput = document.getElementById('chat-input');
        ui.chatMessages = document.getElementById('chat-messages');
        ui.typingIndicator = document.getElementById('typing-indicator');

        // Initialize Gemini AI
        initAI();

        if (isChatPage) {
            // STANDALONE MODE: chat.html
            if (ui.chatForm && ui.chatMessages) {
                resetChat();
                
                ui.chatForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const val = ui.chatInput.value.trim();
                    if (!val) return;

                    addMessage(val, true);
                    ui.chatInput.value = '';
                    handleAIResponse(val);
                });
            }
        } else {
            // NAVIGATION MODE: index.html or districts.html
            if (ui.toggleChatBtn) {
                ui.toggleChatBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const context = window.cleanName || '';
                    window.location.href = `chat.html?context=${encodeURIComponent(context)}`;
                });
            }
            
            // Legacy support for modal (if we decide to keep it anywhere, but based on request we are moving away)
            if (ui.aiChatModal && !ui.aiChatModal.classList.contains('hidden')) {
                 ui.aiChatModal.classList.add('hidden');
            }
        }
    }

    // Export to window for global access
    window.ExploreBot = {
        init,
        resetChat,
        addMessage
    };

    return window.ExploreBot;
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ExploreBot.init();
});
