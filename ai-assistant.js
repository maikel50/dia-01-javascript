class AIAssistant {
    constructor() {
        if (!localStorage.getItem('openai_api_key')) {
            apikey = prompt('Indicame la api key que te dio yunior');
            if (apikey) {
                localStorage.setItem('openai_api_key', apikey);
            }
        }
        this.API_KEY = localStorage.getItem('openai_api_key');
        this.ENDPOINT = 'https://api.openai.com/v1/chat/completions';
        this.context = this.initializeContext();
        this.setupUI();
    }

    initializeContext() {
        // Recopilamos el código de todos los ejercicios
        const exerciseFiles = {};
        for (let i = 1; i <= 10; i++) {
            const scriptElement = document.querySelector(`script[src*="ejercicio${i}.js"]`);
            if (scriptElement) {
                exerciseFiles[`ejercicio${i}`] = scriptElement.textContent;
            }
        }

        return {
            exercises: exerciseFiles,
            systemPrompt: `
                Eres un asistente especializado en ayudar a estudiantes que están aprendiendo JavaScript por primera vez.
                Contexto actual:
                - Los estudiantes están realizando ejercicios básicos de JavaScript
                - Están aprendiendo sobre funciones y switch
                - Es su segunda clase de JavaScript
                
                Reglas importantes:
                1. NUNCA des la solución completa a los ejercicios
                2. Guía al estudiante con preguntas y pistas
                3. Si detectas errores básicos de sintaxis, explícalos de manera didáctica
                4. Usa analogías y ejemplos simples
                5. Si el estudiante parece frustrado, ofrece ánimo y divide el problema en pasos más pequeños
                6. Usa Markdown para formatear tus respuestas:
                   - Código en bloques con \`\`\`javascript
                   - Listas con - o números
                   - **Negrita** para énfasis
                   - > Para citas o notas importantes
                7. El estudiante tiene que resolver los ejercicios por su cuenta, no debes dar la solución completa ni tampoco paso a paso como para que puedan resolverlo copiando tus respuestas.
                
                Ejercicios actuales:
                ${JSON.stringify(exercises, null, 2)}
                
                Código actual del estudiante:
                ${JSON.stringify(exerciseFiles, null, 2)}
            `
        };
    }

    setupUI() {
        // Crear botón flotante de ayuda
        const helpButton = document.createElement('button');
        helpButton.innerHTML = '<i class="fas fa-robot"></i> Asistente IA';
        helpButton.className = 'fixed bottom-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-lg';

        // Crear modal del chat con mejor diseño
        const chatModal = document.createElement('div');
        chatModal.className = 'fixed bottom-20 right-4 w-[400px] h-[700px] bg-white rounded-lg shadow-2xl hidden flex flex-col border border-gray-200'; // Aumentar ancho y alto
        chatModal.innerHTML = `
            <div class="p-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-t-lg flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <i class="fas fa-robot text-xl"></i>
                    <div>
                        <h3 class="font-semibold">Asistente JavaScript</h3>
                        <p class="text-xs text-indigo-200">Powered by AI</p>
                    </div>
                </div>
                <button class="text-white hover:text-indigo-200 transition-colors text-xl" id="close-chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="flex-1 p-4 overflow-auto bg-gray-50" id="chat-messages">
                <div class="chat-message assistant">
                    <div class="message-content">
                        ¡Hola! Soy tu asistente de JavaScript. ¿En qué puedo ayudarte?
                    </div>
                </div>
            </div>
            <div class="p-4 border-t bg-white">
                <form id="chat-form" class="flex gap-2">
                    <input type="text" 
                           placeholder="Escribe tu pregunta..." 
                           class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                    <button type="submit" 
                            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <span>Enviar</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        `;

        // Estilos para los mensajes
        const style = document.createElement('style');
        style.textContent = `
            .chat-message {
                margin-bottom: 1rem;
                max-width: 85%;
            }
            .chat-message.user {
                margin-left: auto;
            }
            .message-content {
                padding: 0.75rem 1rem;
                border-radius: 1rem;
                line-height: 1.5;
            }
            .chat-message.assistant .message-content {
                background: white;
                border: 1px solid #e5e7eb;
                border-bottom-left-radius: 0.25rem;
            }
            .chat-message.user .message-content {
                background: #4f46e5;
                color: white;
                border-bottom-right-radius: 0.25rem;
            }
            .message-content pre {
                background: #1a1a1a;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                margin: 0.5rem 0;
            }
            .message-content code {
                background: #f3f4f6;
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-family: monospace;
            }
            .message-content p {
                margin: 0.5rem 0;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(helpButton);
        document.body.appendChild(chatModal);

        // Event Listeners
        helpButton.onclick = () => chatModal.classList.toggle('hidden');
        document.getElementById('close-chat').onclick = () => chatModal.classList.add('hidden');
        document.getElementById('chat-form').onsubmit = (e) => this.handleQuestion(e);
    }

    async handleQuestion(e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const question = input.value;
        input.value = '';

        const messagesDiv = document.getElementById('chat-messages');

        // Agregar mensaje del usuario
        this.addMessage(messagesDiv, question, 'user');

        try {
            const response = await this.getAIResponse(question);
            this.addMessage(messagesDiv, response, 'assistant');
        } catch (error) {
            this.addMessage(messagesDiv, 'Lo siento, hubo un error. Por favor, intenta de nuevo.', 'error');
        }
    }

    async getAIResponse(question) {
        const response = await fetch(this.ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: this.context.systemPrompt },
                    { role: "user", content: question }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }

    addMessage(container, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-content';

        // Usar marked para renderizar Markdown
        bubble.innerHTML = marked.parse(message, {
            breaks: true,
            gfm: true,
            highlight: function (code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return code;
            }
        });

        messageDiv.appendChild(bubble);
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    // Método para analizar código y detectar errores comunes
    analyzeCode() {
        const commonErrors = {
            missingBraces: /\b(if|for|while|function)\s*\([^{]*$/m,
            missingSemicolons: /[^;{}\s]\s*$/m,
            undefinedVariables: /\b(var|let|const)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*(?!=)/g
        };

        Object.entries(this.context.exercises).forEach(([file, code]) => {
            // Análisis básico de errores
            const errors = [];

            if (commonErrors.missingBraces.test(code)) {
                errors.push(`Posible falta de llaves {} en ${file}`);
            }

            // Más análisis según necesidades...

            if (errors.length > 0) {
                console.warn(`Errores detectados en ${file}:`, errors);
                // Podríamos usar esta información para dar consejos proactivos
            }
        });
    }
}

// Inicializar el asistente
const aiAssistant = new AIAssistant();