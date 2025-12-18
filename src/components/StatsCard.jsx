import { Card, CardContent, Typography } from '@mui/material'

function StatsCard({ value, label, color = '#3b82f6' }) {
  return (
    <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Typography variant="h3" fontWeight="700" sx={{ color }}>
          {value}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatsCard
