import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PhoneIcon from '@mui/icons-material/Phone'
import MessageIcon from '@mui/icons-material/Message'

function Contacts() {
  const contacts = [
    { id: 1, name: 'John Smith', phone: '+1 (555) 123-4567', email: 'john@example.com', group: 'Sales', avatar: 'J' },
    { id: 2, name: 'Sarah Johnson', phone: '+1 (555) 987-6543', email: 'sarah@example.com', group: 'Support', avatar: 'S' },
    { id: 3, name: 'Mike Wilson', phone: '+1 (555) 246-8135', email: 'mike@example.com', group: 'Sales', avatar: 'M' },
    { id: 4, name: 'Emily Davis', phone: '+1 (555) 369-2580', email: 'emily@example.com', group: 'Management', avatar: 'E' },
    { id: 5, name: 'Robert Brown', phone: '+1 (555) 147-2589', email: 'robert@example.com', group: 'Support', avatar: 'R' },
  ]

  const getGroupColor = (group) => {
    const colors = {
      'Sales': '#3b82f6',
      'Support': '#10b981',
      'Management': '#8b5cf6'
    }
    return colors[group] || '#6b7280'
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Contacts
          </Typography>
          <Typography color="text.secondary">
            Manage your phonebook contacts
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#3b82f6' }}
        >
          Add Contact
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: getGroupColor(contact.group) }}>
                          {contact.avatar}
                        </Avatar>
                        <Typography fontWeight="600">{contact.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={contact.group} 
                        size="small"
                        sx={{ 
                          backgroundColor: `${getGroupColor(contact.group)}20`,
                          color: getGroupColor(contact.group),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: '#10b981' }}>
                        <PhoneIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#3b82f6' }}>
                        <MessageIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#6b7280' }}>
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

export default Contacts
