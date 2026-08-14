import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao fazer login')
        return res.json()
      })
      .then((data) => {
        if (data.status === 'success') {
          localStorage.setItem('userId', data.user.id)
          localStorage.setItem('userName', data.user.name)
          navigate('/')
          window.location.reload()
        }
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />

        <h1 className="login-title">
          YOUR ACCOUNT FOR<br />EVERYTHING NIKE
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <p className="login-terms">
            By logging in, you agree to Nike's{' '}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>.
          </p>

          <button type="submit" className="login-btn login-btn-primary">
            LOG IN
          </button>
          <Link to="/register">
            <button type="button" className="login-btn login-btn-secondary">
              JOIN NOW
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
