(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    if (!adId) {
        console.log("Nenhum ID de anúncio fornecido.");
        return; // Não faz nada se não houver ID na URL
    }

    try {
        const response = await fetch(`http://localhost:8080/apis/ad/get-one?id=${adId}`);
        if (response.ok) {
            const ad = await response.json();

            if (ad) {
                document.getElementById('adTitle').innerText = ad.title || "Título não disponível";
                document.getElementById('adDescription').innerText = ad.description || "Descrição não disponível";
                document.getElementById('adPrice').innerText = ad.price ? `R$ ${ad.price}` : "Preço não disponível";
                document.getElementById('adLocation').innerText = ad.location || "Localização não disponível";
            } else {
                console.log("Anúncio não encontrado.");
            }
        } else {
            console.error('Erro na resposta:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Erro ao carregar o anúncio:', error);
    }
})();

// Função para verificar se o usuário está logado
function isLoggedIn() {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    return token !== null; // Retorna true se o token existir, caso contrário false
}

// Adiciona um evento de clique ao botão "Criar Anúncio"
document.getElementById('createAdButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    if (isLoggedIn()) {
        // Se o usuário estiver logado, redireciona para a página de criação de anúncio
        window.location.href = 'cadanuncio.html';
    } else {
        // Se o usuário não estiver logado, redireciona para a página de login
        alert('Você precisa estar logado para criar um anúncio.');
        window.location.href = 'login.html';
    }
});