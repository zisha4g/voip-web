import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Switch } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function Hours() {
  const timeRules = [
    { id: 1, name: 'Business Hours', time: 'Mon-Fri, 9:00 AM - 6:00 PM', action: 'Route to IVR', status: 'active' },
    { id: 2, name: 'After Hours', time: 'Mon-Fri, 6:00 PM - 9:00 AM', action: 'Send to Voicemail', status: 'active' },
    { id: 3, name: 'Weekend', time: 'Sat-Sun, All Day', action: 'Send to Voicemail', status: 'active' },
    { id: 4, name: 'Lunch Break', time: 'Mon-Fri, 12:00 PM - 1:00 PM', action: 'Play Message', status: 'inactive' },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Hours
          </Typography>
          <Typography color="text.secondary">
            Set up time-based call routing rules
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#3b82f6' }}
        >
          Create Time Rule
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Rule Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Time Period</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeRules.map((rule) => (
                  <TableRow key={rule.id} hover>
                    <TableCell>
                      <Typography fontWeight="600">{rule.name}</Typography>
                    </TableCell>
                    <TableCell>{rule.time}</TableCell>
                    <TableCell>{rule.action}</TableCell>
                    <TableCell>
                      <Switch 
                        checked={rule.status === 'active'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: '#3b82f6' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#ef4444' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
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

export default Hours
