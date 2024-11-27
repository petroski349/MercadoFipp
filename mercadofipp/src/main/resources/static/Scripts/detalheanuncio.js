// Função para obter o ID do anúncio da URL
function getAdIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Retorna o ID do anúncio
}

// Função para buscar os detalhes do anúncio
async function fetchAdDetails(adId) {
    try {
        const response = await fetch(`apis/ad/get-one?id=${adId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os detalhes do anúncio');
        }
        const adDetails = await response.json();
        displayAdDetails(adDetails);
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar os detalhes do anúncio. Tente novamente mais tarde.');
    }
}

// Função para exibir os detalhes do anúncio na página
function displayAdDetails(ad) {
    document.getElementById('ad-title').innerText = ad.titulo;
    document.getElementById('ad-description').innerText = ad.descricao;
    document.getElementById('ad-category').innerText = ad.categoria;
    document.getElementById('ad-date').innerText = new Date(ad.data).toLocaleDateString('pt-BR');
    document.getElementById('ad-value').innerText = ad.valor.toFixed(2);

    // Exibir imagens
    const adImagesDiv = document.getElementById('ad-images');
    ad.fotos.forEach(foto => {
        const img = document.createElement('img');
        img.src = foto; // Supondo que 'foto' seja a URL da imagem
        img.alt = ad.titulo;
        img.classList.add('ad-image'); // Adicione uma classe para estilização, se necessário
        adImagesDiv.appendChild(img);
    });

    // Atualiza o link para a página de perguntas e respostas
    const qnaLink = document.getElementById('qna-link');
    qnaLink.href = `perguntasrespostas.html?id=${ad.id}`; // Supondo que 'ad.id' seja o ID do anúncio
}

// Função principal que será chamada ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const adId = getAdIdFromUrl(); // Obtém o ID do anúncio da URL
    if (adId) {
        fetchAdDetails(adId); // Busca os detalhes do anúncio
    } else {
        alert('ID do anúncio não encontrado na URL.');
    }
});