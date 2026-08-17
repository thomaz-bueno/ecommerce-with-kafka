import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../contexts/CartContext'
import './header.css'

function Header() {
  const { user } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleLogout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      setDropdownOpen(false)
      navigate('/login')
      window.location.reload()
    })
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>

      <div className="header-right">

        {user ? (
          <div className="header-user" ref={dropdownRef}>
            <button
              className="header-user-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="header-user-name">{user.name}</span>
              <svg
                className={`header-user-arrow ${dropdownOpen ? 'open' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="header-dropdown">
                <button className="header-dropdown-item-1 orders" onClick={() => { setDropdownOpen(false); navigate('/orders') }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  PEDIDOS
                </button>
                <button className="header-dropdown-item" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="header-login-btn">
            FAZER LOGIN
          </Link>
        )}
        <Link to="/favorites">
          <button className="header-favorites" aria-label="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </Link>
        <Link to="/cart">
          <button className="header-cart" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {items.length > 0 && <span className="cart-badge" />}
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
