document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');
    const container = document.getElementById('container');

    // Alterna para o formulário de login
    loginButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Alterna para o formulário de registro
    registerButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    // Evento de envio do formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const userType = loginForm['user-type'].value;

        try {
            const response = await fetch('http://hostlocal:8080/access/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userType }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login bem-sucedido! Redirecionando...');
                // Redirecionar após login
                window.location.href = '/dashboard.html';
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

        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const userType = registerForm['user-type'].value;

        try {
            const response = await fetch('http://localhost:8080/apis/access/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, userType }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Cadastro realizado com sucesso! Faça login para continuar.');
                // Alterna para o formulário de login
                container.classList.remove('right-panel-active');
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
