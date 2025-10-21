class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1a202c;
          color: white;
          padding: 2rem 1rem;
          text-align: center;
          margin-top: 2rem;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .footer-links a {
          color: #a0aec0;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .footer-links a:hover {
          color: white;
        }
        .footer-links i {
          margin-right: 0.5rem;
        }
        .copyright {
          color: #718096;
          font-size: 0.875rem;
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-links">
            <a href="https://jsonplaceholder.typicode.com/" target="_blank">
              <i data-feather="external-link"></i> API JSONPlaceholder
            </a>
            <a href="https://github.com/public-apis/public-apis" target="_blank">
              <i data-feather="github"></i> APIs Públicas
            </a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} Panel de JSONPlaceholder. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);