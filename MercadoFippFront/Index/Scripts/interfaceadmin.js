let token = '';

// Função para realizar login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de requisição ao servidor
    const response = await fetch('https://localhost:8080/apis/access/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        token = data.token; // Armazena o token
        alert('Login realizado com sucesso!');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('categories-section').style.display = 'block';
        loadCategories(); // Carrega as categorias
    } else {
        alert('Erro no login! Verifique suas credenciais.');
    }
}

// Função para carregar categorias
async function loadCategories() {
    const response = await fetch('https://localhost:8080/apis/category/get-many', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
        const categories = await response.json();
        const tableBody = document.getElementById('categories-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Limpa a tabela

        categories.forEach(category => {
            const row = `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.nome}</td>
                    <td>
                        <button onclick="deleteCategory(${category.id})">Excluir</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } else {
        alert('Erro ao carregar categorias!');
    }
}

// Função para adicionar uma nova categoria
async function addCategory() {
    const newCategory = document.getElementById('new-category').value;

    const response = await fetch('https://localhost:8080/apis/category/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome: newCategory })
    });

    if (response.ok) {
        alert('Categoria adicionada com sucesso!');
        loadCategories(); // Atualiza a lista
    } else {
        alert('Erro ao adicionar categoria!');
    }
}

// Função para excluir uma categoria
async function deleteCategory(id) {
    const response = await fetch(`https://localhost:8080/apis/category/delete${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
        alert('Categoria excluída com sucesso!');
        loadCategories(); // Atualiza a lista
    } else {
        alert('Erro ao excluir categoria!');
    }
}