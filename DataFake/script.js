// Global variables
let currentView = '';
let currentPage = 1;
const itemsPerPage = 10;
let allData = [];

// DOM elements
const dataContainer = document.getElementById('dataContainer');
const globalSearch = document.getElementById('globalSearch');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    globalSearch.addEventListener('input', handleGlobalSearch);
});

// Helper for type labels
function typeInfo(type) {
    const map = {
        user: { label: 'usuario' , labelCap: 'Usuario' },
        post: { label: 'publicación', labelCap: 'Publicación' },
        comment: { label: 'comentario', labelCap: 'Comentario' }
    };
    return map[type] || { label: type, labelCap: type.charAt(0).toUpperCase() + type.slice(1) };
}

// API functions
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
}

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await response.json();
}

async function fetchComments() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    return await response.json();
}

async function fetchPostsByUserId(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await response.json();
}

async function fetchCommentsByPostId(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return await response.json();
}

// View functions
async function loadUsers() {
    currentView = 'users';
    currentPage = 1;
    allData = await fetchUsers();
    renderData();
}

async function loadAllPosts() {
    currentView = 'posts';
    currentPage = 1;
    allData = await fetchPosts();
    renderData();
}

async function loadAllComments() {
    currentView = 'comments';
    currentPage = 1;
    allData = await fetchComments();
    renderData();
}

async function loadPostsByUser(userId) {
    currentView = 'userPosts';
    currentPage = 1;
    allData = await fetchPostsByUserId(userId);
    renderData();
}

async function loadCommentsByPost(postId) {
    currentView = 'postComments';
    currentPage = 1;
    allData = await fetchCommentsByPostId(postId);
    renderData();
}

// Render functions
function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allData.slice(startIndex, endIndex);

    let html = '';
    let tableHeaders = '';
    let tableRows = '';

    switch (currentView) {
        case 'users':
            tableHeaders = `
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            `;

            tableRows = paginatedData.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="viewUserPosts(${user.id})" class="action-btn bg-blue-100 text-blue-800">
                            <i data-feather="file-text" class="w-4 h-4"></i> Publicaciones
                        </button>
                        <button onclick="editItem('user', ${user.id})" class="action-btn bg-yellow-100 text-yellow-800">
                            <i data-feather="edit" class="w-4 h-4"></i> Editar
                        </button>
                        <button onclick="deleteItem('user', ${user.id})" class="action-btn bg-red-100 text-red-800">
                            <i data-feather="trash-2" class="w-4 h-4"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');

            html = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="px-6 py-4 border-b flex justify-between items-center">
                        <h2 class="text-xl font-semibold">Usuarios</h2>
                        <button onclick="showAddModal('user')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                            <i data-feather="plus" class="mr-2"></i> Agregar Usuario
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>${tableHeaders}</thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                    ${renderPagination()}
                </div>
            `;
            break;

        case 'posts':
            tableHeaders = `
                <tr>
                    <th>ID</th>
                    <th>ID Usuario</th>
                    <th>Título</th>
                    <th>Acciones</th>
                </tr>
            `;

            tableRows = paginatedData.map(post => `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.userId}</td>
                    <td>${post.title}</td>
                    <td>
                        <button onclick="viewPostComments(${post.id})" class="action-btn bg-purple-100 text-purple-800">
                            <i data-feather="message-square" class="w-4 h-4"></i> Comentarios
                        </button>
                        <button onclick="editItem('post', ${post.id})" class="action-btn bg-yellow-100 text-yellow-800">
                            <i data-feather="edit" class="w-4 h-4"></i> Editar
                        </button>
                        <button onclick="deleteItem('post', ${post.id})" class="action-btn bg-red-100 text-red-800">
                            <i data-feather="trash-2" class="w-4 h-4"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');

            html = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="px-6 py-4 border-b flex justify-between items-center">
                        <h2 class="text-xl font-semibold">Todas las Publicaciones</h2>
                        <button onclick="showAddModal('post')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                            <i data-feather="plus" class="mr-2"></i> Agregar Publicación
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>${tableHeaders}</thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                    ${renderPagination()}
                </div>
            `;
            break;

        case 'comments':
            tableHeaders = `
                <tr>
                    <th>ID</th>
                    <th>ID Publicación</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            `;

            tableRows = paginatedData.map(comment => `
                <tr>
                    <td>${comment.id}</td>
                    <td>${comment.postId}</td>
                    <td>${comment.name}</td>
                    <td>${comment.email}</td>
                    <td>
                        <button onclick="editItem('comment', ${comment.id})" class="action-btn bg-yellow-100 text-yellow-800">
                            <i data-feather="edit" class="w-4 h-4"></i> Editar
                        </button>
                        <button onclick="deleteItem('comment', ${comment.id})" class="action-btn bg-red-100 text-red-800">
                            <i data-feather="trash-2" class="w-4 h-4"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');

            html = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="px-6 py-4 border-b flex justify-between items-center">
                        <h2 class="text-xl font-semibold">Todos los Comentarios</h2>
                        <button onclick="showAddModal('comment')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                            <i data-feather="plus" class="mr-2"></i> Agregar Comentario
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>${tableHeaders}</thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                    ${renderPagination()}
                </div>
            `;
            break;

        case 'userPosts':
            tableHeaders = `
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Contenido</th>
                    <th>Acciones</th>
                </tr>
            `;

            tableRows = paginatedData.map(post => `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body.substring(0, 50)}...</td>
                    <td>
                        <button onclick="viewPostComments(${post.id})" class="action-btn bg-purple-100 text-purple-800">
                            <i data-feather="message-square" class="w-4 h-4"></i> Comentarios
                        </button>
                        <button onclick="editItem('post', ${post.id})" class="action-btn bg-yellow-100 text-yellow-800">
                            <i data-feather="edit" class="w-4 h-4"></i> Editar
                        </button>
                        <button onclick="deleteItem('post', ${post.id})" class="action-btn bg-red-100 text-red-800">
                            <i data-feather="trash-2" class="w-4 h-4"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');

            html = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="px-6 py-4 border-b flex justify-between items-center">
                        <h2 class="text-xl font-semibold">Publicaciones del Usuario</h2>
                        <div>
                            <button onclick="loadUsers()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center mr-2">
                                <i data-feather="arrow-left" class="mr-2"></i> Volver a Usuarios
                            </button>
                            <button onclick="showAddModal('post')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                                <i data-feather="plus" class="mr-2"></i> Agregar Publicación
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>${tableHeaders}</thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                    ${renderPagination()}
                </div>
            `;
            break;

        case 'postComments':
            tableHeaders = `
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Comentario</th>
                    <th>Acciones</th>
                </tr>
            `;

            tableRows = paginatedData.map(comment => `
                <tr>
                    <td>${comment.id}</td>
                    <td>${comment.name}</td>
                    <td>${comment.email}</td>
                    <td>${comment.body.substring(0, 50)}...</td>
                    <td>
                        <button onclick="editItem('comment', ${comment.id})" class="action-btn bg-yellow-100 text-yellow-800">
                            <i data-feather="edit" class="w-4 h-4"></i> Editar
                        </button>
                        <button onclick="deleteItem('comment', ${comment.id})" class="action-btn bg-red-100 text-red-800">
                            <i data-feather="trash-2" class="w-4 h-4"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');

            html = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="px-6 py-4 border-b flex justify-between items-center">
                        <h2 class="text-xl font-semibold">Comentarios de la Publicación</h2>
                        <div>
                            <button onclick="loadAllPosts()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center mr-2">
                                <i data-feather="arrow-left" class="mr-2"></i> Volver a Publicaciones
                            </button>
                            <button onclick="showAddModal('comment')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                                <i data-feather="plus" class="mr-2"></i> Agregar Comentario
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>${tableHeaders}</thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                    ${renderPagination()}
                </div>
            `;
            break;
    }

    dataContainer.innerHTML = html;
    feather.replace();
}

function renderPagination() {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    if (totalPages <= 1) return '';

    let paginationHtml = '<div class="pagination mt-4">';
    
    // Previous button
    paginationHtml += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="pagination-btn ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
            <i data-feather="chevron-left" class="w-4 h-4"></i>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button onclick="changePage(${i})" class="pagination-btn ${i === currentPage ? 'active' : ''}">
                ${i}
            </button>
        `;
    }

    // Next button
    paginationHtml += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="pagination-btn ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
            <i data-feather="chevron-right" class="w-4 h-4"></i>
        </button>
    `;

    paginationHtml += '</div>';
    return paginationHtml;
}

function changePage(page) {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderData();
}

// CRUD operations
function showAddModal(type) {
    const info = typeInfo(type);
    let modalHtml = `
        <div id="addModal" class="modal">
            <div class="modal-content">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Agregar nuevo ${info.labelCap}</h3>
                    <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                        <i data-feather="x"></i>
                    </button>
                </div>
                <form id="addForm" onsubmit="handleAddSubmit(event, '${type}')">
                    <div class="space-y-4">
    `;

    switch (type) {
        case 'user':
            modalHtml += `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" name="name" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                    <input type="text" name="username" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                    <input type="email" name="email" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input type="text" name="phone" class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
                    <input type="text" name="website" class="w-full px-3 py-2 border rounded-lg">
                </div>
            `;
            break;

        case 'post':
            modalHtml += `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">ID Usuario</label>
                    <input type="number" name="userId" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input type="text" name="title" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <textarea name="body" required class="w-full px-3 py-2 border rounded-lg"></textarea>
                </div>
            `;
            break;

        case 'comment':
            modalHtml += `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">ID Publicación</label>
                    <input type="number" name="postId" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" name="name" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                    <input type="email" name="email" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                    <textarea name="body" required class="w-full px-3 py-2 border rounded-lg"></textarea>
                </div>
            `;
            break;
    }

    modalHtml += `
                    </div>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button type="button" onclick="closeModal()" class="px-4 py-2 border rounded-lg">Cancelar</button>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('addModal').style.display = 'flex';
    feather.replace();
}

function closeModal() {
    const modal = document.getElementById('addModal') || document.getElementById('editModal');
    if (modal) {
        modal.remove();
    }
}

function handleAddSubmit(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newItem = {};
    
    for (let [key, value] of formData.entries()) {
        newItem[key] = value;
    }

    // En este ejemplo solo mostramos lo que se enviaría
    alert(`Normalmente se enviarían estos datos a la API: ${JSON.stringify(newItem)}`);
    closeModal();
    // Reload the data
    switch (type) {
        case 'user': loadUsers(); break;
        case 'post': loadAllPosts(); break;
        case 'comment': loadAllComments(); break;
    }
}

function editItem(type, id) {
    const item = allData.find(item => item.id === id);
    if (!item) return;

    const info = typeInfo(type);
    let modalHtml = `
        <div id="editModal" class="modal">
            <div class="modal-content">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Editar ${info.labelCap}</h3>
                    <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                        <i data-feather="x"></i>
                    </button>
                </div>
                <form id="editForm" onsubmit="handleEditSubmit(event, '${type}', ${id})">
                    <div class="space-y-4">
    `;

    switch (type) {
        case 'user':
            modalHtml += `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" name="name" value="${item.name}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                    <input type="text" name="username" value="${item.username}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                    <input type="email" name="email" value="${item.email}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input type="text" name="phone" value="${item.phone}" class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
                    <input type="text" name="website" value="${item.website}" class="w-full px-3 py-2 border rounded-lg">
                </div>
            `;
            break;

        case 'post':
            modalHtml += `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">ID Usuario</label>
                    <input type="number" name="userId" value="${item.userId}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input type="text" name="title" value="${item.title}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <textarea name="body" required class="w-full px-3 py-2 border rounded-lg">${item.body}</textarea>
                </div>
            `;
            break;

        case 'comment':
            modalHtml += `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">ID Publicación</label>
                    <input type="number" name="postId" value="${item.postId}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" name="name" value="${item.name}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                    <input type="email" name="email" value="${item.email}" required class="w-full px-3 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                    <textarea name="body" required class="w-full px-3 py-2 border rounded-lg">${item.body}</textarea>
                </div>
            `;
            break;
    }

    modalHtml += `
                    </div>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button type="button" onclick="closeModal()" class="px-4 py-2 border rounded-lg">Cancelar</button>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('editModal').style.display = 'flex';
    feather.replace();
}

function handleEditSubmit(event, type, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedItem = {};
    
    for (let [key, value] of formData.entries()) {
        updatedItem[key] = value;
    }

    // En este ejemplo solo mostramos lo que se enviarían
    alert(`Normalmente se enviaría esta actualización a la API para ID ${id}: ${JSON.stringify(updatedItem)}`);
    
    closeModal();
    // Reload the data
    switch (currentView) {
        case 'users':
        case 'userPosts': loadUsers(); break;
        case 'posts': loadAllPosts(); break;
        case 'comments':
        case 'postComments': loadAllComments(); break;
    }
}

function deleteItem(type, id) {
    const info = typeInfo(type);
    if (!confirm(`¿Estás seguro de que deseas eliminar este ${info.label}?`)) return;
    
    // En este ejemplo solo mostramos lo que se eliminaría
    alert(`Normalmente se eliminaría ${info.label} con ID ${id} de la API`);
    // Reload the data
    switch (currentView) {
        case 'users':
        case 'userPosts': loadUsers(); break;
        case 'posts': loadAllPosts(); break;
        case 'comments':
        case 'postComments': loadAllComments(); break;
    }
}

// Navigation functions
function viewUserPosts(userId) {
    loadPostsByUser(userId);
}

function viewPostComments(postId) {
    loadCommentsByPost(postId);
}

// Search function
function handleGlobalSearch() {
    const searchTerm = globalSearch.value.toLowerCase();
    if (searchTerm === '') {
        switch (currentView) {
            case 'users':
            case 'userPosts': loadUsers(); break;
            case 'posts': loadAllPosts(); break;
            case 'comments':
            case 'postComments': loadAllComments(); break;
            default: break;
        }
        return;
    }

    let filteredData = [];

    switch (currentView) {
        case 'users':
        case 'userPosts':
            filteredData = allData.filter(user => 
                (user.name && user.name.toLowerCase().includes(searchTerm)) ||
                (user.username && user.username.toLowerCase().includes(searchTerm)) ||
                (user.email && user.email.toLowerCase().includes(searchTerm))
            );
            break;
        case 'posts':
            filteredData = allData.filter(post => 
                (post.title && post.title.toLowerCase().includes(searchTerm)) ||
                (post.body && post.body.toLowerCase().includes(searchTerm))
            );
            break;
        case 'comments':
        case 'postComments':
            filteredData = allData.filter(comment => 
                (comment.name && comment.name.toLowerCase().includes(searchTerm)) ||
                (comment.email && comment.email.toLowerCase().includes(searchTerm)) ||
                (comment.body && comment.body.toLowerCase().includes(searchTerm))
            );
            break;
    }

    allData = filteredData;
    currentPage = 1;
    renderData();
}