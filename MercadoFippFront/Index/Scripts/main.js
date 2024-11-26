// URL da API para buscar os anúncios mais recentes
const apiUrl = 'http://localhost:8080/apis/ad/latest'; 

// Função para buscar anúncios da API
async function fetchAds() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar anúncios: ${response.status}`);
        }

        const ads = await response.json(); // Espera um array de objetos JSON
        displayAds(ads);
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível carregar os anúncios. Tente novamente mais tarde.');
    }
}

// Função para exibir anúncios no contêiner
function displayAds(ads) {
    const adsContainer = document.getElementById('ads-container');
    adsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos anúncios

    // Itera sobre cada anúncio recebido e cria elementos HTML
    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.classList.add('ad');

        adElement.innerHTML = `
            <img src="${ad.image}" alt="${ad.title}">
            <p>${ad.title} - R$ ${ad.price.toFixed(2)}</p>
        `;

        // Torna cada anúncio clicável
        adElement.addEventListener('click', () => {
            window.location.href = `ad-details.html?id=${ad.id}`;
        });

        adsContainer.appendChild(adElement);
    });
}

// Função para verificar se o usuário está logado e se é administrador
function checkLoginStatus() {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    const loginButton = document.getElementById('login-button'); // Obtém o botão de login
    const logoutButton = document.getElementById('logout-button'); // Obtém o botão de logout
    const settingsButton = document.getElementById('settings-button'); // Obtém o botão de configurações

    if (token) {
        // Se o token existir, oculta o botão de login e exibe o botão de logout
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';

        // Verifica se o usuário é administrador
        const userRole = getUser RoleFromToken(token); // Função para obter o papel do usuário do token
        if (userRole === 'admin') {
            settingsButton.style.display = 'block'; // Exibe o botão de configurações
        } else {
            settingsButton.style.display = 'none'; // Oculta o botão de configurações
        }
    } else {
        // Se não houver token, exibe o botão de login e oculta o botão de logout e configurações
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        settingsButton.style.display = 'none';
    }
}


// Função para redirecionar para a página de configurações
function goToSettings() {
    window.location.href = 'interfaceadmin.html'; // Redireciona para a página de configurações
}

// Chama a função para verificar o status de login ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

// Função para fazer logout
function logout() {
    localStorage.removeItem('authToken'); // Remove o token do localStorage
    alert('Você foi desconectado.'); // Mensagem de confirmação
    checkLoginStatus(); // Atualiza a interface
    window.location.href = 'login.html'; // Redireciona para a página de login
}

// Chama a função para verificar o status de login ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    fetchAds(); // Chama a função para buscar anúncios
});