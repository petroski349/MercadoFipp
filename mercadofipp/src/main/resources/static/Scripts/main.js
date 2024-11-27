const apiUrl = 'http://localhost:8080/apis/ad/latest'; 

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

        const ads = await response.json(); 
        displayAds(ads); 
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível carregar os anúncios. Tente novamente mais tarde.');
    }
}

function displayAds(ads) {
    const adsContainer = document.getElementById('ads-container');
    adsContainer.innerHTML = '';

    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.classList.add('ad');

        adElement.innerHTML = `
            <img src="${ad.image}" alt="${ad.title}">
            <p>${ad.title} - R$ ${ad.price.toFixed(2)}</p>
        `;

        adElement.addEventListener('click', () => {
            window.location.href = `ad-details.html?id=${ad.id}`;
        });

        adsContainer.appendChild(adElement);
    });
}

async function checkLoginStatus() {
    const token = localStorage.getItem('authToken'); 
    const loginButton = document.getElementById('login-button'); 
    const logoutButton = document.getElementById('logout-button'); 
    const settingsButton = document.getElementById('settings-button'); 

    if (token) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        const isAdmin = await checkIfAdmin(token); 
        if (isAdmin) {
            settingsButton.style.display = 'block'; 
        } else {
            settingsButton.style.display = 'none'; 
        }
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        settingsButton.style.display = 'none';
    }
}

async function checkIfAdmin(token) {
    try {
        const response = await fetch('http://localhost:8080/api/check-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao verificar o status de administrador');
        }

        const isAdmin = await response.json(); 
        return isAdmin; 
    } catch (error) {
        console.error('Erro:', error);
        return false; 
    }
}

function goToSettings() {
    window.location.href = 'interfaceadmin.html'; 
}

function logout() {
    localStorage.removeItem('authToken'); 
    alert('Você foi desconectado.'); 
    checkLoginStatus(); 
    window.location.href = 'login.html'; 
}

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    fetchAds(); 
});
