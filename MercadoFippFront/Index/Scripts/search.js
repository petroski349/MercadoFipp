(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    try {
        const response = await fetch(`https://api.exemplo.com/anuncios/${adId}`);
        const ad = await response.json();

        if (ad) {
            document.getElementById('adTitle').innerText = ad.title;
            document.getElementById('adDescription').innerText = ad.description;
            document.getElementById('adPrice').innerText = ad.price;
            document.getElementById('adLocation').innerText = ad.location;
        } else {
            document.body.innerHTML = "<p>Anúncio não encontrado.</p>";
        }
    } catch (error) {
        console.error('Erro ao carregar o anúncio:', error);
        document.body.innerHTML = "<p>Erro ao carregar os detalhes do anúncio.</p>";
    }
})();
