import { Box, Typography, Card, CardContent } from '@mui/material'

function CDR() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Call Detail Records</Typography>
      
      <Card>
        <CardContent>
          <Typography>Call logs will appear here</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CDR