document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const container = document.getElementById('container');
    let token = ''; // Variável para armazenar o token JWT

    // Evento de envio do formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = loginForm['Name'].value; // Corrige a obtenção do valor
        const password = loginForm['password'].value;
        const userType = loginForm['user-type'].value; // Obtém o tipo de usuário
        const isAdmin = userType === 'admin'; // Retorna true se for admin, caso contrário false

        try {
            const response = await fetch('http://localhost:8080/access/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    pass: password,
                    isAdm: level,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                token = data.token; // Salva o token retornado na variável
                localStorage.setItem('authToken', token); // Armazena o token no localStorage
                alert('Login bem-sucedido! Redirecionando...');
                window.location.href = '/paginainicial.html';
            } else {
                const error = await response.json();
                alert(`Erro no login: ${error.message}`);
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            alert('Erro de conexão. Tente novamente mais tarde.');
        }
    });

    // Evento de envio do formulário de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = registerForm['name'].value; // Corrige a obtenção do valor
        const password = registerForm['password'].value;
        const userType = registerForm['user-type'].value; // Obtém o tipo de usuário
        const isAdmin = userType === 'admin'; // Retorna true se for admin, caso contrário false

        try {
            const response = await fetch('http://localhost:8080/access/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    pass: password,
                    isAdm: level,
                }),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso! Faça login para continuar.');
                container.classList.remove('right-panel-active'); // Alterna para o formulário de login
            } else {
                const error = await response.json();
                alert(`Erro no cadastro: ${error.message}`);
            }
        } catch (err) {
            console.error('Erro ao fazer cadastro:', err);
            alert('Erro de conexão. Tente novamente mais tarde.');
        }
    });
});
