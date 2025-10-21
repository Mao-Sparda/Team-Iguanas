class CustomSidebar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        aside {
          background: white;
          width: 250px;
          min-height: calc(100vh - 60px);
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          padding: 1rem 0;
        }
        .sidebar-item {
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sidebar-item:hover {
          background: #ebf4ff;
          color: #667eea;
        }
        .sidebar-item.active {
          background: #ebf4ff;
          color: #667eea;
          border-right: 3px solid #667eea;
        }
        .sidebar-item i {
          margin-right: 0.75rem;
          width: 20px;
          text-align: center;
        }
        .sidebar-header {
          padding: 0.5rem 1.5rem;
          font-weight: 600;
          color: #718096;
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          aside {
            width: 100%;
            min-height: auto;
          }
        }
      </style>
      <aside>
        <div class="sidebar-header">GESTIÓN DE DATOS</div>
        <div class="sidebar-item" onclick="loadUsers()">
          <i data-feather="users"></i>
          <span>Usuarios</span>
        </div>
        <div class="sidebar-item" onclick="loadAllPosts()">
          <i data-feather="file-text"></i>
          <span>Publicaciones</span>
        </div>
        <div class="sidebar-item" onclick="loadAllComments()">
          <i data-feather="message-square"></i>
          <span>Comentarios</span>
        </div>
        
        <div class="sidebar-header">ACCIONES</div>
        <div class="sidebar-item" onclick="showAddModal('user')">
          <i data-feather="user-plus"></i>
          <span>Agregar Usuario</span>
        </div>
        <div class="sidebar-item" onclick="showAddModal('post')">
          <i data-feather="plus-square"></i>
          <span>Agregar Publicación</span>
        </div>
        <div class="sidebar-item" onclick="showAddModal('comment')">
          <i data-feather="plus-circle"></i>
          <span>Agregar Comentario</span>
        </div>
      </aside>
    `;
  }
}
customElements.define('custom-sidebar', CustomSidebar);