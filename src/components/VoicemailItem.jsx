import { ListItem, ListItemText, IconButton, Chip, Box, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'

function VoicemailItem({ 
  voicemail, 
  isPlaying, 
  isPaused,
  onPlay, 
  onDownload, 
  onDelete,
  children // For the audio player component
}) {
  const formatPhoneNumber = (callerid) => {
    const match = callerid.match(/(\d{10})/)
    if (match) {
      const number = match[1]
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
    }
    return callerid
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <ListItem
      sx={{ 
        borderBottom: '1px solid #e5e7eb',
        '&:last-child': { borderBottom: 'none' },
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography fontWeight="600">
                {formatPhoneNumber(voicemail.callerid)}
              </Typography>
              {voicemail.urgent === 'yes' && (
                <Chip label="Urgent" size="small" color="error" />
              )}
              {voicemail.listened === 'no' && (
                <Chip label="New" size="small" color="primary" />
              )}
            </Box>
          }
          secondary={
            <span style={{ color: '#6b7280' }}>
              {formatDate(voicemail.date)} • Duration: {voicemail.duration}
            </span>
          }
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            edge="end" 
            sx={{ color: isPlaying ? '#ef4444' : '#3b82f6' }}
            onClick={onPlay}
          >
            {isPlaying && !isPaused ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton 
            edge="end" 
            sx={{ color: '#6b7280' }}
            onClick={onDownload}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton 
            edge="end" 
            sx={{ color: '#ef4444' }}
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      
      {children}
    </ListItem>
  )
}

export default VoicemailItem
