(async () => {
    // Função para buscar os anúncios
    async function searchAds(query) {
        try {
            const response = await fetch(`http://localhost:8080/apis/ad/search?query=${query}`);
            if (response.ok) {
                const ads = await response.json();

                if (ads && ads.length > 0) {
                    const adsContainer = document.getElementById('adsContainer');
                    adsContainer.innerHTML = ''; // Limpa os anúncios antigos
                    ads.forEach(ad => {
                        const adElement = document.createElement('div');
                        adElement.classList.add('ad-item');
                        adElement.innerHTML = `
                            <h3>${ad.title}</h3>
                            <p>${ad.description}</p>
                            <p><strong>Preço:</strong> R$ ${ad.price}</p>
                            <p><strong>Localização:</strong> ${ad.location}</p>
                            <a href="ad-detail.html?id=${ad.id}" class="view-details">Ver detalhes</a>
                        `;
                        adsContainer.appendChild(adElement);
                    });
                } else {
                    const adsContainer = document.getElementById('adsContainer');
                    adsContainer.innerHTML = '<p>Nenhum anúncio encontrado.</p>';
                }
            } else {
                console.error('Erro na resposta:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar anúncios:', error);
        }
    }

    // Evento de envio do formulário de pesquisa
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            searchAds(query); // Chama a função de busca
        } else {
            alert('Por favor, insira um termo de pesquisa.');
        }
    });

    // Caso haja algum parâmetro na URL, pode-se buscar anúncios diretamente ao carregar a página
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    if (queryParam) {
        document.getElementById('searchInput').value = queryParam; // Preenche o campo de pesquisa
        searchAds(queryParam); // Realiza a busca automaticamente
    }
})();
