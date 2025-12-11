import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar, AvatarGroup } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import GroupIcon from '@mui/icons-material/Group'

function RingGroups() {
  const ringGroups = [
    { id: 1, name: 'Sales Team', members: 5, strategy: 'Ring All', timeout: '30s', status: 'active' },
    { id: 2, name: 'Support Team', members: 3, strategy: 'Sequential', timeout: '20s', status: 'active' },
    { id: 3, name: 'Management', members: 2, strategy: 'Ring All', timeout: '45s', status: 'inactive' },
    { id: 4, name: 'Emergency', members: 4, strategy: 'Ring All', timeout: '15s', status: 'active' },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Ring Groups
          </Typography>
          <Typography color="text.secondary">
            Ring multiple phones simultaneously
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#3b82f6' }}
        >
          Create Ring Group
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Group Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Members</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Strategy</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Timeout</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ringGroups.map((group) => (
                  <TableRow key={group.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#3b82f6' }}>
                          <GroupIcon />
                        </Avatar>
                        <Typography fontWeight="600">{group.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${group.members} members`} 
                        size="small"
                        sx={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}
                      />
                    </TableCell>
                    <TableCell>{group.strategy}</TableCell>
                    <TableCell>{group.timeout}</TableCell>
                    <TableCell>
                      <Chip 
                        label={group.status.charAt(0).toUpperCase() + group.status.slice(1)} 
                        size="small"
                        sx={{ 
                          backgroundColor: group.status === 'active' ? '#ecfdf5' : '#fef2f2',
                          color: group.status === 'active' ? '#10b981' : '#ef4444',
                          fontWeight: 500
                        }}
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

export default RingGroups
