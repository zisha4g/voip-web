import { Box, Typography, Card, CardContent, Grid, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import DownloadIcon from '@mui/icons-material/Download'

function Billing() {
  const transactions = [
    { id: 1, date: 'Dec 10, 2025', description: 'Monthly Service', amount: '-$25.00', balance: '$125.50' },
    { id: 2, date: 'Dec 5, 2025', description: 'Added Funds', amount: '+$100.00', balance: '$150.50' },
    { id: 3, date: 'Nov 10, 2025', description: 'Monthly Service', amount: '-$25.00', balance: '$50.50' },
  ]

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Balance & Billing
        </Typography>
        <Typography color="text.secondary">
          Manage your account balance and payment history
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, backgroundColor: '#eff6ff', border: '2px solid #3b82f6' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: '#3b82f6', 
                  borderRadius: 2, 
                  p: 1.5,
                  display: 'flex'
                }}>
                  <AccountBalanceWalletIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Current Balance</Typography>
                  <Typography variant="h4" fontWeight="700" color="#3b82f6">
                    $125.50
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>Add Funds</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  label="Amount"
                  type="number"
                  placeholder="50.00"
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ 
                    backgroundColor: '#10b981',
                    '&:hover': { backgroundColor: '#059669' },
                    px: 4
                  }}
                >
                  Add Funds
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="600">Transaction History</Typography>
            <Button startIcon={<DownloadIcon />} variant="outlined">
              Export
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} hover>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>
                      <Typography 
                        fontWeight="600"
                        color={tx.amount.startsWith('+') ? '#10b981' : '#ef4444'}
                      >
                        {tx.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.balance}</TableCell>
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

export default Billing