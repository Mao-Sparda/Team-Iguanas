class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
        }
        .logo i {
          margin-right: 0.5rem;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }
        a:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }
        a i {
          margin-right: 0.5rem;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            padding: 1rem;
          }
          ul {
            margin-top: 1rem;
            gap: 1rem;
          }
        }
      </style>
      <nav>
        <div class="logo">
          <i data-feather="database"></i>
          <span>Panel de JSONPlaceholder</span>
        </div>
        <ul>
          <li><a href="/"><i data-feather="home"></i> Inicio</a></li>
          <li><a href="#" onclick="loadUsers()"><i data-feather="users"></i> Usuarios</a></li>
          <li><a href="#" onclick="loadAllPosts()"><i data-feather="file-text"></i> Publicaciones</a></li>
          <li><a href="#" onclick="loadAllComments()"><i data-feather="message-square"></i> Comentarios</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);