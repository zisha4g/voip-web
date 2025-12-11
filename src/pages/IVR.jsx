import { useState } from 'react'
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Tabs,
  Tab,
  Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PhoneIcon from '@mui/icons-material/Phone'

function IVR() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [ivrs, setIvrs] = useState([
    { id: 1, name: 'Main Menu', language: 'English', timeout: '5s', status: 'Active', routes: 5 },
    { id: 2, name: 'After Hours', language: 'English', timeout: '3s', status: 'Active', routes: 2 },
    { id: 3, name: 'Sales Department', language: 'English', timeout: '5s', status: 'Inactive', routes: 4 },
  ])

  const [routingOptions, setRoutingOptions] = useState([
    { digit: '1', action: 'Forward to Extension', destination: '101 - Sales' },
    { digit: '2', action: 'Forward to Extension', destination: '102 - Support' },
    { digit: '3', action: 'Sub-IVR', destination: 'Billing Menu' },
    { digit: '0', action: 'Forward to Extension', destination: '100 - Operator' },
  ])

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            IVR Management
          </Typography>
          <Typography color="text.secondary">
            Create and manage your interactive voice response menus
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ 
            backgroundColor: '#3b82f6',
            '&:hover': { backgroundColor: '#2563eb' },
            px: 3,
            py: 1.5
          }}
        >
          Create New IVR
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: '#eff6ff', 
                  borderRadius: 2, 
                  p: 1.5,
                  display: 'flex'
                }}>
                  <PhoneIcon sx={{ color: '#3b82f6', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="700">3</Typography>
                  <Typography color="text.secondary" variant="body2">Total IVRs</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: '#ecfdf5', 
                  borderRadius: 2, 
                  p: 1.5,
                  display: 'flex'
                }}>
                  <PhoneIcon sx={{ color: '#10b981', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="700">2</Typography>
                  <Typography color="text.secondary" variant="body2">Active</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: '#fef2f2', 
                  borderRadius: 2, 
                  p: 1.5,
                  display: 'flex'
                }}>
                  <PhoneIcon sx={{ color: '#ef4444', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="700">1</Typography>
                  <Typography color="text.secondary" variant="body2">Inactive</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* IVR List Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
            <Typography variant="h6" fontWeight="600">Your IVRs</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>IVR Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Language</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Timeout</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Routes</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ivrs.map((ivr) => (
                  <TableRow key={ivr.id} hover>
                    <TableCell>
                      <Typography fontWeight="600">{ivr.name}</Typography>
                    </TableCell>
                    <TableCell>{ivr.language}</TableCell>
                    <TableCell>{ivr.timeout}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${ivr.routes} options`} 
                        size="small"
                        sx={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ivr.status}
                        size="small"
                        sx={{ 
                          backgroundColor: ivr.status === 'Active' ? '#ecfdf5' : '#fef2f2',
                          color: ivr.status === 'Active' ? '#10b981' : '#ef4444',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => setOpenDialog(true)}
                        sx={{ color: '#3b82f6', mr: 1 }}
                      >
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

      {/* Create/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" fontWeight="600">Create New IVR</Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ mb: 3 }}>
            <Tab label="IVR Details" />
            <Tab label="Routing Options" />
            <Tab label="Settings" />
          </Tabs>

          {/* Tab 0: IVR Details */}
          {selectedTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IVR Name"
                  placeholder="e.g., Main Menu"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select defaultValue="english" label="Language">
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Timeout (seconds)</InputLabel>
                  <Select defaultValue="5" label="Timeout (seconds)">
                    <MenuItem value="3">3 seconds</MenuItem>
                    <MenuItem value="5">5 seconds</MenuItem>
                    <MenuItem value="10">10 seconds</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Greeting Recording</InputLabel>
                  <Select defaultValue="" label="Greeting Recording">
                    <MenuItem value="recording1">Welcome Message 1</MenuItem>
                    <MenuItem value="recording2">Welcome Message 2</MenuItem>
                    <MenuItem value="tts">Text-to-Speech</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {/* Tab 1: Routing Options */}
          {selectedTab === 1 && (
            <Box>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
              >
                Add Routing Option
              </Button>
              {routingOptions.map((route, index) => (
                <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={2}>
                        <TextField
                          fullWidth
                          label="Digit"
                          value={route.digit}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Action</InputLabel>
                          <Select value={route.action} label="Action">
                            <MenuItem value="Forward to Extension">Forward to Extension</MenuItem>
                            <MenuItem value="Sub-IVR">Sub-IVR</MenuItem>
                            <MenuItem value="Voicemail">Voicemail</MenuItem>
                            <MenuItem value="Ring Group">Ring Group</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Destination"
                          value={route.destination}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Tab 2: Settings */}
          {selectedTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Invalid Input Action</InputLabel>
                  <Select defaultValue="repeat" label="Invalid Input Action">
                    <MenuItem value="repeat">Repeat Menu</MenuItem>
                    <MenuItem value="voicemail">Send to Voicemail</MenuItem>
                    <MenuItem value="operator">Transfer to Operator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Timeout Action</InputLabel>
                  <Select defaultValue="repeat" label="Timeout Action">
                    <MenuItem value="repeat">Repeat Menu</MenuItem>
                    <MenuItem value="voicemail">Send to Voicemail</MenuItem>
                    <MenuItem value="hangup">Hang Up</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Max Retries"
                  defaultValue="3"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select defaultValue="active" label="Status">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            sx={{ 
              backgroundColor: '#3b82f6',
              '&:hover': { backgroundColor: '#2563eb' }
            }}
          >
            Save IVR
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default IVR