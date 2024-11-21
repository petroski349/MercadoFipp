// URL da API para buscar os anúncios mais recentes
const apiUrl = 'https://localhost:8080/apis/ad/latest'; 

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

