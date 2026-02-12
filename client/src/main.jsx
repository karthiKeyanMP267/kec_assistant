import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Point auth to the main server. In dev (Vite on 5173) default to the API server on 4001 (matches current dev run output).
const AUTH_URL =
  import.meta.env.VITE_AUTH_URL ||
  (window.location.port === '5173' ? 'http://localhost:4001' : window.location.origin)

function LoginGate() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem('auth-session')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!session) return
    localStorage.setItem('auth-session', JSON.stringify(session))
  }, [session])

  // Attach role to all fetch calls so backend can enforce access control
  useEffect(() => {
    if (!session) return
    const originalFetch = window.fetch
    window.fetch = (input, init = {}) => {
      const headers = new Headers(init.headers || {})
      headers.set('X-Role', session.role)
      if (Array.isArray(session.allowedServers)) {
        headers.set('X-Allowed-Servers', session.allowedServers.join(','))
      }
      return originalFetch(input, { ...init, headers })
    }
    return () => {
      window.fetch = originalFetch
    }
  }, [session])

  const handleLogin = async (e) => {
    e.preventDefault()
    setStatus('Checking credentials...')
    setError('')
    try {
      const res = await fetch(`${AUTH_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok || !data?.ok) {
        setStatus('')
        setError(data?.error || 'Invalid credentials')
        return
      }
      setSession({ email: email.trim(), role: data.role, allowedServers: data.allowedServers })
      setStatus('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setStatus('')
      setError('Unable to reach auth server')
      console.error(err)
    }
  }

  const handleLogout = () => {
    setSession(null)
    setStatus('')
    setError('')
    localStorage.removeItem('auth-session')
  }

  if (!session) {
    return (
      <div className="loginShell">
        <div className="loginCard">
          <div className="loginHero">
            <div className="loginHeroContent">
              <h1>Welcome to KEC Assistant</h1>
              <p>Transform Yourself</p>
            </div>
          </div>

          <div className="loginPanel">
            <img src="/kec-logo.png" alt="KEC logo" className="loginLogo" />
            <h2 className="loginTitle">Welcome</h2>
            

            <form className="loginForm" onSubmit={handleLogin}>
              <div className="loginField">
                <label className="loginLabel">Email</label>
                <input
                  className="loginInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Your Kongu mail"
                />
              </div>

              <div className="loginField">
                <label className="loginLabel">Password</label>
                <input
                  className="loginInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="********"
                />
              </div>

              <div className="loginActions">
                <a className="loginLink" href="#">Forgot your password?</a>
              </div>

              <button type="submit" className="loginButton">Login</button>

            </form>

            {status ? <div className="loginStatus">{status}</div> : null}
            {error ? <div className="loginError">{error}</div> : null}

            <div className="loginFooter">(c) 2026 Kongu Engineering College</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      {/* Floating user chip in top-right, does not add scroll space */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '14px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          background: 'rgba(255,255,255,0.9)',
          color: '#111827',
          borderRadius: '12px',
          border: '1px solid rgba(226,232,240,0.9)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontWeight: 700 }}>{session.email}</span>
          <span style={{ fontSize: '12px', color: '#4b5563' }}>Role: {session.role}</span>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8fafc', color: '#111827', cursor: 'pointer', fontWeight: 600 }}
        >
          Logout
        </button>
      </div>

      <div style={{ height: '100%', overflow: 'hidden' }}>
        <App storagePrefix={`kec-${(session.email || 'anon').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginGate />
  </StrictMode>,
)
