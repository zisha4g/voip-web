import { Box, Grid, Card, CardContent, Typography, Button, Avatar } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import PhoneIcon from '@mui/icons-material/Phone'
import VoicemailIcon from '@mui/icons-material/Voicemail'
import MessageIcon from '@mui/icons-material/Message'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'

function Dashboard() {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  // Mock data
  const stats = [
    { title: 'Account Balance', value: '$125.50', icon: <AccountBalanceWalletIcon />, color: '#10b981' },
    { title: 'Total IVRs', value: '8', icon: <PhoneIcon />, color: '#3b82f6' },
    { title: 'New Voicemails', value: '3', icon: <VoicemailIcon />, color: '#f59e0b' },
    { title: 'Unread Messages', value: '12', icon: <MessageIcon />, color: '#8b5cf6' },
  ]

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Welcome Back, {user.company || user.email || 'User'}!
        </Typography>
        <Typography color="text.secondary">
          Here's what's happening with your account today.
        </Typography>
      </Box>

      {/* User Info Card */}
      <Card sx={{ mb: 3, borderRadius: 3, backgroundColor: '#eff6ff', border: '1px solid #3b82f6' }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ 
                width: 64, 
                height: 64, 
                backgroundColor: '#3b82f6',
                fontSize: '1.5rem',
                fontWeight: 700
              }}>
                {user.company ? user.company.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" fontWeight="600">
                {user.company || 'Company Name'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <EmailIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.email || 'email@example.com'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <BusinessIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  Role: {user.role || 'Client'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: stat.color, 
                    borderRadius: '50%', 
                    p: 1.5,
                    display: 'flex',
                    color: 'white'
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained">Create IVR</Button>
          <Button variant="outlined">Send Message</Button>
          <Button variant="outlined">Add Funds</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard