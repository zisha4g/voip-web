import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Registration successful! Redirecting to login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(data.error || 'Registration failed. Email may not exist in VoIP.ms system.')
      }
    } catch (err) {
      setError('Connection error. Make sure backend is running on http://localhost:8000')
      console.error('Registration error:', err)
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
            Create Your Password
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Register using your VoIP.ms email address
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleRegister}>
            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              VoIP.ms Email Address
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your VoIP.ms email"
              sx={{ mb: 2.5 }}
              required
              disabled={loading}
            />

            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Create Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              sx={{ mb: 2.5 }}
              required
              disabled={loading}
            />

            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              sx={{ mb: 3 }}
              required
              disabled={loading}
            />

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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            {/* Back to Login */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have a password?{' '}
                <Typography 
                  component="span"
                  variant="body2" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    color: '#1976d2', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </form>

        </Paper>
      </Container>
    </Box>
  )
}

export default Register
