// Função para login e obtenção do token
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:8080/access/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: email, pass: password }),
    });

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("jwtToken", token);
      alert("Login realizado com sucesso!");
      // Redirecione ou atualize a página
    } else {
      const error = await response.text();
      alert(`Erro: ${error}`);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

// Função para acessar recursos protegidos usando o token
async function fetchProtectedResource(url) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    alert("Você precisa estar logado.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Dados recebidos:", data);
      return data;
    } else {
      console.error("Erro ao acessar o recurso protegido:", response.status);
      alert("Falha ao acessar o recurso protegido.");
    }
  } catch (error) {
    console.error(error);
  }
}

// Evento de login
document.getElementById("login-form").addEventListener("submit", login);

// Exemplo de chamada protegida
// fetchProtectedResource("http://localhost:8080/recurso-protegido");
