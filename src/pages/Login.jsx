import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/dashboard')
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
              placeholder="your.email@example.com"
              sx={{ mb: 2.5 }}
              required
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
              sx={{ 
                backgroundColor: '#1e293b',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: '500',
                '&:hover': {
                  backgroundColor: '#334155'
                }
              }}
            >
              Sign In
            </Button>
          </form>

        </Paper>
      </Container>
    </Box>
  )
}

export default Login