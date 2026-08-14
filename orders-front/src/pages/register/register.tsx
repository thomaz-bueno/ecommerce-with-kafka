import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './register.css'

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao criar conta')
        return res.json()
      })
      .then((data) => {
        if (data.status === 'created') {
          localStorage.setItem('userId', data.user.id)
          localStorage.setItem('userName', data.user.name)
          navigate('/login')
        }
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <img src={logo} alt="Logo" className="register-logo" />

        <h1 className="register-title">
          YOUR ACCOUNT FOR<br />EVERYTHING NIKE
        </h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            className="register-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="register-error">{error}</p>}

          <p className="register-terms">
            By logging in, you agree to Nike's{' '}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>.
          </p>

          <button type="submit" className="register-btn register-btn-primary">
            REGISTER
          </button>

          <Link to="/login" className="register-already">
            Do you already have an account?
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Register
