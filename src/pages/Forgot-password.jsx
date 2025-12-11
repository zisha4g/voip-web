import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Mock - show success message
      alert('Password reset link sent to ' + email)
      navigate('/login')
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
            Forgot Password
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Enter your email and we'll send you a reset link.
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              sx={{ mb: 3 }}
              required
            />

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
              Send Reset Link
            </Button>
          </form>

          {/* Back to Login */}
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Remember your password?{' '}
            <Box 
              component="span" 
              onClick={() => navigate('/login')}
              sx={{ 
                color: '#1976d2', 
                cursor: 'pointer', 
                fontWeight: '500',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Sign in
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default ForgotPassword