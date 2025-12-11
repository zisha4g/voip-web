import { Box, Typography, Card, CardContent, TextField, Button, Grid, Switch, FormControlLabel, Divider } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

function Settings() {
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
                    label="Full Name"
                    defaultValue="John Doe"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    defaultValue="john@example.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    defaultValue="+1 (555) 123-4567"
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
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    fullWidth
                    sx={{ backgroundColor: '#3b82f6' }}
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
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