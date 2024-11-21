

document.addEventListener("DOMContentLoaded", () => {
    loadQuestionsAndAnswers();
});

async function loadQuestionsAndAnswers() {
    try {document.addEventListener("DOMContentLoaded", () => {
        loadQuestionsAndAnswers();
    });
    
    async function loadQuestionsAndAnswers() {
        try {
            const response = await fetch('http://localhost:8080/apis/question/get-many');
            const data = await response.json();
    
            const chatBox = document.getElementById('chat-box');
            chatBox.innerHTML = ''; // Limpa o chat antes de carregar
    
            // Insere perguntas e respostas no chat
            data.forEach(item => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', item.tipo === 'pergunta' ? 'question' : 'answer');
                messageDiv.textContent = item.mensagem;
                chatBox.appendChild(messageDiv);
            });
        } catch (error) {
            console.error("Erro ao carregar perguntas e respostas:", error);
        }
    }
    
    // Adiciona uma nova pergunta
    document.getElementById('question-form').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const questionInput = document.getElementById('question-input');
        const question = questionInput.value.trim();
        if (!question) return;
    
        try {
            const response = await fetch('http://localhost:8080/apis/question/add-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mensagem: question, tipo: 'pergunta' })
            });
    
            if (response.ok) {
                // Exibe a nova pergunta no chat e limpa o campo de entrada
                const chatBox = document.getElementById('chat-box');
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', 'question');
                messageDiv.textContent = question;
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para o final
                questionInput.value = '';
            } else {
                console.error("Erro ao enviar pergunta.");
            }
        } catch (error) {
            console.error("Erro de rede ao enviar pergunta:", error);
        }
    });
    
        const response = await fetch('http://localhost:8080/apis/question/add-response');
        const data = await response.json();

        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = ''; // Limpa o chat antes de carregar

        // Insere perguntas e respostas no chat
        data.forEach(item => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', item.tipo === 'pergunta' ? 'question' : 'answer');
            messageDiv.textContent = item.mensagem;
            chatBox.appendChild(messageDiv);
        });
    } catch (error) {
        console.error("Erro ao carregar perguntas e respostas:", error);
    }
}
