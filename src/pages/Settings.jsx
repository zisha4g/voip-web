import { useState } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Switch, FormControlLabel, Divider, Alert, CircularProgress } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

function Settings() {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  // Change password states
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    // Validation
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match')
      return
    }

    setPasswordLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/auth/change-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          old_password: oldPassword, 
          new_password: newPassword 
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setPasswordSuccess('Password changed successfully!')
        // Clear fields
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else if (response.status === 401) {
        setPasswordError('Current password is incorrect')
      } else {
        setPasswordError(data.error || 'Failed to change password')
      }
    } catch (err) {
      setPasswordError('Connection error. Make sure backend is running')
      console.error('Change password error:', err)
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Settings
        </Typography>
        <Typography color="text.secondary">
          Manage your account and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Profile Information
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={user.company || ''}
                    disabled
                    helperText="From VoIP.ms account"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={user.email || ''}
                    disabled
                    helperText="From VoIP.ms account"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue=""
                    placeholder="Enter your full name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    defaultValue=""
                    placeholder="+1 (555) 123-4567"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    fullWidth
                    sx={{ backgroundColor: '#3b82f6' }}
                  >
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Change Password
              </Typography>
              
              {/* Success Alert */}
              {passwordSuccess && (
                <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                  {passwordSuccess}
                </Alert>
              )}

              {/* Error Alert */}
              {passwordError && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  {passwordError}
                </Alert>
              )}

              <form onSubmit={handleChangePassword}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                      disabled={passwordLoading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={passwordLoading}
                      helperText="Minimum 6 characters"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={passwordLoading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      startIcon={passwordLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                      fullWidth
                      disabled={passwordLoading}
                      sx={{ backgroundColor: '#3b82f6' }}
                    >
                      {passwordLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Notifications
              </Typography>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email notifications for new voicemails"
              />
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="SMS notifications for missed calls"
              />
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Switch />}
                label="Weekly usage reports"
              />
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Low balance alerts"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Settings