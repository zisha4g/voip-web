import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import PhoneIcon from '@mui/icons-material/Phone'
import VoicemailIcon from '@mui/icons-material/Voicemail'
import MessageIcon from '@mui/icons-material/Message'

function Dashboard() {
  // Mock data
  const stats = [
    { title: 'Account Balance', value: '$125.50', icon: <AccountBalanceWalletIcon />, color: '#10b981' },
    { title: 'Total IVRs', value: '8', icon: <PhoneIcon />, color: '#3b82f6' },
    { title: 'New Voicemails', value: '3', icon: <VoicemailIcon />, color: '#f59e0b' },
    { title: 'Unread Messages', value: '12', icon: <MessageIcon />, color: '#8b5cf6' },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome Back!
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your account today.
      </Typography>

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