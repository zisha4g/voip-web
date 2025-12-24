import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { API_BASE_URL } from '../config/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isAuthenticated', 'true')
        navigate('/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError(`Connection error. Make sure backend is running on ${API_BASE_URL}`)
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#f5f5f5' 
    }}>
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ p: 5, borderRadius: 4 }}>
          {/* Icon */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 2 
          }}>
            <Box sx={{ 
              backgroundColor: '#f0f0f0', 
              borderRadius: '50%', 
              p: 2,
              display: 'flex'
            }}>
              <PhoneIcon sx={{ fontSize: 40, color: '#333' }} />
            </Box>
          </Box>

          {/* Title */}
          <Typography variant="h5" align="center" fontWeight="600" gutterBottom>
            Welcome to VoIP Portal
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            The Key to Smarter Communication.
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              sx={{ mb: 2.5 }}
              required
              disabled={loading}
            />

            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              sx={{ mb: 1 }}
              required
              disabled={loading}
            />

            {/* Forgot Password */}
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Typography 
                variant="body2" 
                onClick={() => navigate('/forgot-password')}
                sx={{ 
                  color: '#1976d2', 
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ 
                backgroundColor: '#1e293b',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: '500',
                '&:hover': {
                  backgroundColor: '#334155'
                },
                mb: 2
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            {/* Create Password Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                First time here?{' '}
                <Typography 
                  component="span"
                  variant="body2" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    color: '#1976d2', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Create Password
                </Typography>
              </Typography>
            </Box>
          </form>

        </Paper>
      </Container>
    </Box>
  )
}

export default Login