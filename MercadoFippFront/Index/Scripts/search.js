(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    if (!adId) {
        console.log("Nenhum ID de anúncio fornecido.");
        return; // Não faz nada se não houver ID na URL
    }

    try {
        const response = await fetch(`https://localhost:8080/apis/ad/get-one?id=${adId}`);
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
