// Função para enviar o formulário de cadastro de anúncio
async function submitAdForm(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Captura os dados do formulário
  const formData = new FormData(event.target); // 'event.target' é o formulário

  // Obtém o token de autenticação do localStorage
  const token = localStorage.getItem('authToken');

  try {
      // Envia os dados para o backend
      const response = await fetch('apis/ad/add', {
          method: 'POST',
          headers: {
              'Authorization': token, // Adiciona o token no cabeçalho
          },
          body: formData // Envia os dados do formulário
      });

      // Verifica a resposta do servidor
      if (response.ok) {
          const result = await response.json();
          alert('Anúncio cadastrado com sucesso!'); // Mensagem de sucesso
          console.log(result); // Exibe o resultado no console
          // Redirecionar ou limpar o formulário, se necessário
          event.target.reset(); // Limpa o formulário
      } else {
          const error = await response.text();
          alert('Erro ao cadastrar o anúncio: ' + error); // Mensagem de erro
      }
  } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário. Tente novamente mais tarde.'); // Mensagem de erro
  }
}

// Adiciona o evento de envio ao formulário
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form'); // Seleciona o formulário
  form.addEventListener('submit', submitAdForm); // Adiciona o evento de envio
});