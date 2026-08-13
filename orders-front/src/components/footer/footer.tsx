import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="footer-top-nav">
        <Link to="/">Início</Link>
        <Link to="/">Produtos</Link>
        <Link to="/cart">Carrinho</Link>
        <a
          href="https://github.com/thomaz-bueno"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>

      <div className="footer-columns">
        <div className="footer-column">
          <h4>Explorar</h4>
          <Link to="/">Produtos</Link>
          <Link to="/favorites">Favoritos</Link>
          <Link to="/">Início</Link>
        </div>

        <div className="footer-column">
          <h4>Conta</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Cadastro</Link>
          <Link to="/cart">Carrinho</Link>
        </div>

        <div className="footer-column">
          <h4>Projeto</h4>
          <a
            href="https://github.com/thomaz-bueno"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link to="/">Sobre</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
