document.getElementById("recovery-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;

    try {
        const response = await fetch("http://localhost:8080/access/recuperar-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            const data = await response.json();
            
            // Exibe a senha com a máscara
            const maskedPassword = "****" + data.senha.slice(-4);
            document.getElementById("masked-password").textContent = maskedPassword;
            document.getElementById("password-display").style.display = "block";
        } else {
            alert("E-mail não encontrado.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao tentar recuperar a senha.");
    }
});

// Evento para mostrar a opção de redefinir senha
document.getElementById("show-reset").addEventListener("click", () => {
    document.getElementById("reset-password").style.display = "block";
});

// Evento para enviar a nova senha para o back-end
document.getElementById("submit-new-password").addEventListener("click", async () => {
    const newPassword = document.getElementById("new-password").value;

    if (newPassword.length < 6) {
        alert("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/atualizar-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: document.getElementById("email").value, senha: newPassword })
        });

        if (response.ok) {
            alert("Senha atualizada com sucesso!");
            document.getElementById("reset-password").style.display = "none";
            document.getElementById("password-display").style.display = "none";
        } else {
            alert("Erro ao atualizar a senha.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao tentar atualizar a senha.");
    }
});
