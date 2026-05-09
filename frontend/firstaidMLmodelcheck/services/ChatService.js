// import axios from 'axios';

// // ==========================================
// // CONFIGURATION
// // ==========================================
// // Set this to true to use the real Gemini API
// // You must provide your API Key below
// const USE_AI = false;
// const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// // ==========================================
// // MOCK DATA (Fallback)
// // ==========================================
// const MOCK_RESPONSES = {
//     "default": "I'm here to help with First Aid. You can ask me about burns, cuts, CPR, or feeling dizzy.",
//     "burn": "For minor burns: Cool the burn with cool (not cold) running water for 10-20 minutes. Cover with a sterile, non-fluff dressing. Don't apply ice or creams.",
//     "cut": "Apply pressure to stop bleeding. Clean the wound with water. Cover with a sterile dressing or bandage.",
//     "bleeding": "Ap" +
//         "ply direct pressure to the wound with a clean cloth. Elevate the injury if possible.",
//     "cpr": "Call emergency services immediately. Push hard and fast in the center of the chest (100-120 compressions per minute). Rescue breaths are optional for untrained rescuers.",
//     "dizzy": "Sit or lie down immediately. Drink water if dehydrated. Avoid sudden movements.",
//     "heart attack": "Call Emergency Services (911/112) immediately! Have the person sit down and rest. If they are not allergic, give them aspirin to chew. Be ready to perform CPR if they stop breathing.",
//     "stroke": "Think F.A.S.T: Face drooping, Arm weakness, Speech difficulty, Time to call emergency. If you spot these signs, call ambulance immediately.",
//     "choking": "If the person cannot breathe, cough, or speak: Perform 5 back blows followed by 5 abdominal thrusts (Heimlich maneuver). Repeat until the object clears.",
//     "fracture": "Immobilize the injured area. Do not try to realign the bone. Apply ice packs wrapped in cloth to reduce swelling. Seek medical help.",
//     "seizure": "Do not restrain the person. Clear the area of hard or sharp objects. Place something soft under their head. Turn them onto their side to keep airway clear. Time the seizure.",
//     "shock": "Lay the person down and elevate their legs slightly. Keep them warm and comfortable. Loosen tight clothing. Call emergency services.",
//     "snake bite": "Keep the person calm and still. Do NOT suck the venom. Immobilize the bitten limb. Remove tight jewelry/clothing. Seek immediate medical help.",
//     "dog bite": "Wash the wound thoroughly with soap and warm water. Apply an antibiotic cream and cover with a bandage. Seek medical attention properly.",
//     "head injury": "Check for responsiveness. If there is vomiting, confusion, or loss of consciousness, call 'Emergency' immediately. Keep the person still.",
//     "electric shock": "Do not touch the person until the power source is turned off. Call emergency services. Check for breathing and start CPR if needed.",
//     "poisoning": "Call Poison Control or emergency services immediately. Do not induce vomiting unless told to do so. Identify what was swallowed.",
//     "heat stroke": "Move to a cool place. Cool the body with water or wet cloths. Do not give fluids if they are unconscious. This is a medical emergency.",
//     "hypothermia": "Move to a warm place. Remove wet clothing. Warm the center of the body first (chest, neck, head, groin) using blankets. Give warm beverages if conscious.",
//     "nosebleed": "Sit up and lean forward slightly. Pinch the soft part of the nose for 10-15 minutes. breathe through mouth.",
//     "hello": "Hello! How can I assist you with first aid today?",
//     "hi": "Hi there! Stay calm. What emergency or injury do you need help with?"
// };

// // ==========================================
// // SERVICE METHODS
// // ==========================================

// export const sendMessage = async (message) => {
//     if (USE_AI) {
//         return await fetchGeminiResponse(message);
//     } else {
//         return await fetchMockResponse(message);
//     }
// };

// const fetchMockResponse = async (message) => {
//     // Simulate network delay for realism
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const lowerMsg = message.toLowerCase();
//             let response = MOCK_RESPONSES["default"];

//             // Simple keyword matching
//             for (const key in MOCK_RESPONSES) {
//                 if (lowerMsg.includes(key)) {
//                     response = MOCK_RESPONSES[key];
//                     break;
//                 }
//             }
//             resolve(response);
//         }, 1000);
//     });
// };

// const fetchGeminiResponse = async (message) => {
//     if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
//         return "Error: Please set your Gemini API Key in services/ChatService.js";
//     }

//     try {
//         const payload = {
//             contents: [{
//                 parts: [{
//                     text: `You are a helpful First Aid Assistant. Provide concise, accurate first aid advice for the following situation: ${message}. strictly generic advice only.`
//                 }]
//             }]
//         };

//         const response = await axios.post(GEMINI_URL, payload);

//         if (response.data && response.data.candidates && response.data.candidates.length > 0) {
//             return response.data.candidates[0].content.parts[0].text;
//         } else {
//             return "Sorry, I couldn't understand that. Please try again.";
//         }

//     } catch (error) {
//         console.error("Gemini API Error:", error);
//         return "Sorry, I'm having trouble connecting to the AI service right now. Please check your internet connection or API key.";
//     }
// };

// export default {
//     sendMessage
// };


import axios from 'axios';

const API_URL =
  'http://10.8.56.93:8000/chat';

export const sendMessage = async (message) => {

    try {

        const response = await axios.post(
            API_URL,
            {
                message
            }
        );

        return response.data.reply;

    } catch (error) {

        console.log(error);

        return "معذرت، سروس دستیاب نہیں۔";
    }
};