import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, IconButton, Chip } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'

function Voicemail() {
  const voicemails = [
    { id: 1, from: '+1 (555) 123-4567', date: 'Dec 10, 2025 2:30 PM', duration: '1:23', status: 'new' },
    { id: 2, from: '+1 (555) 987-6543', date: 'Dec 9, 2025 4:15 PM', duration: '0:45', status: 'read' },
    { id: 3, from: '+1 (555) 246-8135', date: 'Dec 8, 2025 11:22 AM', duration: '2:10', status: 'read' },
  ]

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Voicemail
        </Typography>
        <Typography color="text.secondary">
          Listen to and manage your voicemail messages
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="700" color="#3b82f6">3</Typography>
              <Typography variant="body2" color="text.secondary">New Messages</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="700">8</Typography>
              <Typography variant="body2" color="text.secondary">Total Messages</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="600" gutterBottom>Voicemail Inbox</Typography>
          <List>
            {voicemails.map((vm) => (
              <ListItem
                key={vm.id}
                sx={{ 
                  borderBottom: '1px solid #e5e7eb',
                  '&:last-child': { borderBottom: 'none' }
                }}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton edge="end" sx={{ color: '#3b82f6' }}>
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton edge="end" sx={{ color: '#6b7280' }}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton edge="end" sx={{ color: '#ef4444' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography fontWeight="600">{vm.from}</Typography>
                      {vm.status === 'new' && (
                        <Chip label="New" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {vm.date} • Duration: {vm.duration}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Voicemail