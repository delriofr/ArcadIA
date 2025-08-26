// ArcadIA Main Application
class ArcadIA {
    constructor() {
        this.resources = [];
        this.agents = [];
        this.blockedPhrases = [];
        this.currentAgent = 'resumia';
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderComponents();
    }

    async loadData() {
        try {
            const response = await fetch('/data/sep-resources.json');
            const data = await response.json();
            this.resources = data.oficialResources;
            this.agents = data.agents;
            this.blockedPhrases = data.blockedPhrases;
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback data
            this.agents = [
                {
                    id: 'resumia',
                    name: 'ResumIA',
                    icon: '📘',
                    description: 'Te guío para crear resúmenes'
                }
            ];
        }
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    renderComponents() {
        this.renderAgents();
        this.renderResources();
    }

    renderAgents() {
        const agentsGrid = document.getElementById('agentsGrid');
        if (!agentsGrid) return;

        agentsGrid.innerHTML = this.agents.map(agent => `
            <div class="agent-card" style="border-color: ${agent.color}">
                <div class="agent-icon">${agent.icon}</div>
                <h3>${agent.name}</h3>
                <p>${agent.description}</p>
            </div>
        `).join('');
    }

    renderResources() {
        const resourcesGrid = document.getElementById('resourcesGrid');
        if (!resourcesGrid) return;

        // Show first 6 resources
        const displayResources = this.resources.slice(0, 6);
        resourcesGrid.innerHTML = displayResources.map(resource => `
            <div class="resource-card">
                <div class="resource-type">${this.getResourceTypeLabel(resource.type)}</div>
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <div class="resource-meta">
                    ${resource.phase ? `<span>Fase ${resource.phase}</span>` : ''}
                    ${resource.subject ? `<span>${resource.subject}</span>` : ''}
                </div>
                <a href="${resource.url}" target="_blank" class="resource-link">
                    Acceder →
                </a>
            </div>
        `).join('');
    }

    getResourceTypeLabel(type) {
        const labels = {
            'portal_nem': '🌐 Portal',
            'libro_sep': '📚 Libro',
            'caja_herramientas': '🧰 Herramientas',
            'pdf_sep': '📄 PDF',
            'sitio_unam': '🎓 UNAM'
        };
        return labels[type] || '📖 Recurso';
    }

    checkGuardrails(message) {
        const messageLower = message.toLowerCase();
        return this.blockedPhrases.filter(phrase => 
            messageLower.includes(phrase)
        );
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.arcadia = new ArcadIA();
});

// Helper function for demo
function askQuestion(question) {
    const input = document.getElementById('userInput');
    if (input) {
        input.value = question;
        document.getElementById('sendBtn').click();
    }
}
