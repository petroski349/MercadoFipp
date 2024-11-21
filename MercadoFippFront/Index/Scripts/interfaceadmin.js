// Dados de exemplo para inicialização
const categories = [{ id: 1, name: "Eletrônicos" }, { id: 2, name: "Veículos" }];
const ads = [{ id: 1, title: "Celular", category: "Eletrônicos", price: "R$ 500" }];
const users = [{ id: 1, name: "João Silva", email: "joao@teste.com", type: "Comprador" }];

// Carregar tabelas ao iniciar a página
function loadTables() {
    loadCategories();
    loadAds();
    loadUsers();
}

// Funções para carregar as tabelas
function loadCategories() {
    const categoriesTable = document.getElementById("categories-table").querySelector("tbody");
    categoriesTable.innerHTML = categories.map(category => `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>
                <button onclick="editCategory(${category.id})">Editar</button>
                <button onclick="deleteCategory(${category.id})">Excluir</button>
            </td>
        </tr>
    `).join("");
}

function loadAds() {
    const adsTable = document.getElementById("ads-table").querySelector("tbody");
    adsTable.innerHTML = ads.map(ad => `
        <tr>
            <td>${ad.id}</td>
            <td>${ad.title}</td>
            <td>${ad.category}</td>
            <td>${ad.price}</td>
            <td>
                <button onclick="editAd(${ad.id})">Editar</button>
                <button onclick="deleteAd(${ad.id})">Excluir</button>
            </td>
        </tr>
    `).join("");
}

function loadUsers() {
    const usersTable = document.getElementById("users-table").querySelector("tbody");
    usersTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.type}</td>
            <td>
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Excluir</button>
            </td>
        </tr>
    `).join("");
}

// CRUD para Categorias
function addCategory() {
    const name = prompt("Nome da categoria:");
    if (name) {
        categories.push({ id: categories.length + 1, name });
        loadCategories();
    }
}

function editCategory(id) {
    const category = categories.find(c => c.id === id);
    const newName = prompt("Novo nome da categoria:", category.name);
    if (newName) {
        category.name = newName;
        loadCategories();
    }
}

function deleteCategory(id) {
    const index = categories.findIndex(c => c.id === id);
    categories.splice(index, 1);
    loadCategories();
}

// CRUD para Anúncios
function addAd() {
    const title = prompt("Título do anúncio:");
    const category = prompt("Categoria do anúncio:");
    const price = prompt("Preço do anúncio:");
    if (title && category && price) {
        ads.push({ id: ads.length + 1, title, category, price });
        loadAds();
    }
}

function editAd(id) {
    const ad = ads.find(a => a.id === id);
    const newTitle = prompt("Novo título do anúncio:", ad.title);
    const newCategory = prompt("Nova categoria do anúncio:", ad.category);
    const newPrice = prompt("Novo preço do anúncio:", ad.price);
    if (newTitle && newCategory && newPrice) {
        ad.title = newTitle;
        ad.category = newCategory;
        ad.price = newPrice;
        loadAds();
    }
}

function deleteAd(id) {
    const index = ads.findIndex(a => a.id === id);
    ads.splice(index, 1);
    loadAds();
}

// CRUD para Usuários
function addUser() {
    const name = prompt("Nome do usuário:");
    const email = prompt("Email do usuário:");
    const type = prompt("Tipo de usuário (Comprador/Vendedor):");
    if (name && email && type) {
        users.push({ id: users.length + 1, name, email, type });
        loadUsers();
    }
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    const newName = prompt("Novo nome do usuário:", user.name);
    const newEmail = prompt("Novo email do usuário:", user.email);
    const newType = prompt("Novo tipo de usuário:", user.type);
    if (newName && newEmail && newType) {
        user.name = newName;
        user.email = newEmail;
        user.type = newType;
        loadUsers();
    }
}

function deleteUser(id) {
    const index = users.findIndex(u => u.id === id);
    users.splice(index, 1);
    loadUsers();
}

// Funções de Busca
function searchTable(inputId, tableId, column) {
    const input = document.getElementById(inputId).value.toLowerCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const cell = rows[i].getElementsByTagName("td")[column];
        if (cell) {
            const textValue = cell.textContent || cell.innerText;
            rows[i].style.display = textValue.toLowerCase().indexOf(input) > -1 ? "" : "none";
        }
    }
}

// Listeners para busca
document.getElementById("search-categories").addEventListener("input", () => searchTable("search-categories", "categories-table", 1));
document.getElementById("search-ads").addEventListener("input", () => searchTable("search-ads", "ads-table", 1));
document.getElementById("search-users").addEventListener("input", () => searchTable("search-users", "users-table", 1));

// Carregar os dados ao abrir a página
document.addEventListener("DOMContentLoaded", loadTables);
