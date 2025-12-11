import { Box, Typography, Card, CardContent, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import MicIcon from '@mui/icons-material/Mic'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CallMadeIcon from '@mui/icons-material/CallMade'
import CallReceivedIcon from '@mui/icons-material/CallReceived'
import CallMissedIcon from '@mui/icons-material/CallMissed'

function CallHistory() {
  const calls = [
    { id: 1, type: 'outbound', number: '+1 (555) 123-4567', date: 'Dec 10, 2025', time: '2:30 PM', duration: '5:23', status: 'completed', recorded: true },
    { id: 2, type: 'inbound', number: '+1 (555) 987-6543', date: 'Dec 10, 2025', time: '11:15 AM', duration: '3:45', status: 'completed', recorded: false },
    { id: 3, type: 'missed', number: '+1 (555) 246-8135', date: 'Dec 9, 2025', time: '4:22 PM', duration: '0:00', status: 'missed', recorded: false },
    { id: 4, type: 'outbound', number: '+1 (555) 369-2580', date: 'Dec 9, 2025', time: '10:05 AM', duration: '12:10', status: 'completed', recorded: true },
    { id: 5, type: 'inbound', number: '+1 (555) 147-2589', date: 'Dec 8, 2025', time: '3:30 PM', duration: '2:15', status: 'completed', recorded: true },
  ]

  const getCallIcon = (type) => {
    switch (type) {
      case 'outbound':
        return <CallMadeIcon sx={{ color: '#10b981' }} />
      case 'inbound':
        return <CallReceivedIcon sx={{ color: '#3b82f6' }} />
      case 'missed':
        return <CallMissedIcon sx={{ color: '#ef4444' }} />
      default:
        return null
    }
  }

  const getStatusChip = (status) => {
    const colors = {
      'completed': { bg: '#ecfdf5', color: '#10b981' },
      'missed': { bg: '#fef2f2', color: '#ef4444' }
    }
    const color = colors[status] || { bg: '#f3f4f6', color: '#6b7280' }
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        size="small"
        sx={{ 
          backgroundColor: color.bg,
          color: color.color,
          fontWeight: 500
        }}
      />
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Call History
          </Typography>
          <Typography color="text.secondary">
            View call detail records and recordings
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<MicIcon />}
          >
            Recordings
          </Button>
          <Button 
            variant="contained" 
            startIcon={<DownloadIcon />}
            sx={{ backgroundColor: '#3b82f6' }}
          >
            Export CDR
          </Button>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Number</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Recording</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calls.map((call) => (
                  <TableRow key={call.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getCallIcon(call.type)}
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {call.type}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="600">{call.number}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{call.date}</Typography>
                      <Typography variant="caption" color="text.secondary">{call.time}</Typography>
                    </TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>{getStatusChip(call.status)}</TableCell>
                    <TableCell>
                      {call.recorded ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#3b82f6' }}>
                            <PlayArrowIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#6b7280' }}>
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">-</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CallHistory
