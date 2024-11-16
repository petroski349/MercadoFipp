document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        userType: document.getElementById("user-type").value
    };

    try {
        const response = await fetch("https://api.example.com/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("Erro ao cadastrar usuário.");
        }
    } catch (error) {
        console.error("Erro:", error);
    }
});
