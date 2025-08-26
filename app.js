// Guardrails - Blocked phrases
const BLOCKED_PHRASES = [
    'haz mi tarea',
    'escribe mi ensayo',
    'dame la respuesta',
    'resuelve el examen',
    'completa mi trabajo'
];

// AI Agent Responses
const agentResponses = {
    resumia: {
        intro: "Soy ResumIA. Te ayudaré a crear resúmenes efectivos. ¿Qué parte del texto te gustaría resumir?",
        guide: "Para un buen resumen, considera: 1) ¿Cuáles son las ideas principales? 2) ¿Qué detalles son esenciales? 3) ¿Cómo conectarías estas ideas?"
    },
    claves: {
        intro: "Soy Claves. Te ayudaré a identificar conceptos fundamentales. ¿Qué tema estás estudiando?",
        guide: "Identifiquemos juntos: 1) Conceptos principales 2) Términos importantes 3) Relaciones entre ideas"
    },
    destaca: {
        intro: "Soy Destaca. Te guiaré para identificar información importante. ¿Qué estás leyendo?",
        guide: "Busquemos: 1) Fechas clave 2) Personajes importantes 3) Eventos significativos"
    },
    planifica: {
        intro: "Soy Planifica. Te ayudaré a organizar tu estudio. ¿Cuánto tiempo tienes disponible?",
        guide: "Creemos un plan: 1) Define objetivos 2) Divide el contenido 3) Establece tiempos"
    },
    evalua: {
        intro: "Soy Evalúa. Te ayudaré con la autoevaluación. ¿Qué tema quieres repasar?",
        guide: "Evaluemos tu comprensión: 1) ¿Qué entendiste? 2) ¿Qué necesitas repasar? 3) ¿Cómo lo aplicarías?"
    },
    explica: {
        intro: "Soy Explica. Clarificaré conceptos complejos. ¿Qué no entiendes completamente?",
        guide: "Exploremos: 1) El concepto básico 2) Ejemplos prácticos 3) Aplicaciones reales"
    },
    inspira: {
        intro: "Soy Inspira. Te motivaré con proyectos creativos. ¿Qué te apasiona de este tema?",
        guide: "Creemos algo único: 1) ¿Qué proyecto te gustaría hacer? 2) ¿Cómo lo conectarías con tu vida? 3) ¿Qué impacto tendría?"
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the demo page
    const sendBtn = document.getElementById('sendBtn');
    const agentSelect = document.getElementById('agentSelect');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        
        // Allow Enter key to send (Shift+Enter for new line)
        document.getElementById('userInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    if (agentSelect) {
        agentSelect.addEventListener('change', changeAgent);
    }
});

// Change AI Agent
function changeAgent() {
    const agentSelect = document.getElementById('agentSelect');
    const selectedAgent = agentSelect.value;
    const chatMessages = document.getElementById('chatMessages');
    
    // Clear chat and show new agent intro
    chatMessages.innerHTML = `
        <div class="message ai-message">
            ${agentResponses[selectedAgent].intro}
        </div>
    `;
}

// Send message function
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const agentSelect = document.getElementById('agentSelect');
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);
    
    // Clear input
    userInput.value = '';
    
    // Check for blocked phrases
    const messageLower = message.toLowerCase();
    let blocked = false;
    
    for (let phrase of BLOCKED_PHRASES) {
        if (messageLower.includes(phrase)) {
            blocked = true;
            break;
        }
    }
    
    // Generate AI response
    setTimeout(() => {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'message ai-message';
        
        if (blocked) {
            aiMessageDiv.textContent = "No puedo hacer tareas por ti, pero te puedo ayudar a entender mejor el tema. " +
                "¿Qué parte específica te gustaría comprender mejor? Puedo guiarte paso a paso.";
        } else {
            const selectedAgent = agentSelect.value;
            aiMessageDiv.textContent = agentRe
