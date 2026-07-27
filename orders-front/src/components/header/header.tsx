import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>
      <button className="header-cart" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </button>
    </header>
  )
}

export default Header
