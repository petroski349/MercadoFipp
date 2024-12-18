// Evento de envio do formulário de recuperação de senha
document.getElementById("recovery-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;

    try {
        const response = await fetch("http://localhost:8080/access/recuperar-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        });

        if (response.ok) {
            alert("Um link para redefinir sua senha foi enviado para seu e-mail.");
        } else {
            alert("Nome de usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao tentar recuperar a senha.");
    }
});

// Evento para exibir o formulário de redefinição de senha
document.getElementById("show-reset").addEventListener("click", () => {
    document.getElementById("reset-password").style.display = "block";
});

// Evento para enviar a nova senha e atualizar
document.getElementById("submit-new-password").addEventListener("click", async () => {
    const newPassword = document.getElementById("new-password").value;

    if (newPassword.length < 6) {
        alert("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }

    const username = document.getElementById("username").value;

    try {
        const response = await fetch("http://localhost:8080/atualizar-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, senha: newPassword })
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
