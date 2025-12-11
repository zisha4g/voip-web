import { Box, Typography, Card, CardContent, Grid, Button, TextField } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

function Phone() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Phone
        </Typography>
        <Typography color="text.secondary">
          Make calls directly from the portal
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Make a Call
              </Typography>
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                sx={{ my: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<PhoneIcon />}
                sx={{ 
                  backgroundColor: '#10b981',
                  '&:hover': { backgroundColor: '#059669' },
                  py: 1.5
                }}
              >
                Start Call
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Recent Calls
              </Typography>
              <Typography color="text.secondary">
                Your recent outbound calls will appear here
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Phone
