import { Box, Typography, Slider, Select, MenuItem, IconButton } from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import CloseIcon from '@mui/icons-material/Close'

function AudioPlayer({ 
  currentTime, 
  duration, 
  volume, 
  playbackRate,
  onSeek,
  onVolumeChange,
  onPlaybackRateChange,
  onClose
}) {
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e5e7eb', position: 'relative' }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: -8,
          right: -8,
          color: '#6b7280',
          '&:hover': { color: '#ef4444' },
          zIndex: 1
        }}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Typography variant="caption" sx={{ minWidth: 35 }}>
          {formatTime(currentTime)}
        </Typography>
        <Slider
          value={currentTime}
          max={duration || 100}
          onChange={onSeek}
          sx={{
            flex: 1,
            color: '#3b82f6',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
          }}
        />
        <Typography variant="caption" sx={{ minWidth: 35 }}>
          {formatTime(duration)}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VolumeUpIcon sx={{ color: '#6b7280', fontSize: 18 }} />
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.1}
            onChange={onVolumeChange}
            sx={{
              width: 80,
              color: '#6b7280',
              height: 3,
              '& .MuiSlider-thumb': {
                width: 10,
                height: 10,
              },
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: 12 }}>
            Speed:
          </Typography>
          <Select
            value={playbackRate}
            onChange={onPlaybackRateChange}
            size="small"
            sx={{
              fontSize: 12,
              height: 24,
              '& .MuiSelect-select': { py: 0, pr: 3 }
            }}
          >
            <MenuItem value={0.5}>0.5x</MenuItem>
            <MenuItem value={0.75}>0.75x</MenuItem>
            <MenuItem value={1}>1x</MenuItem>
            <MenuItem value={1.25}>1.25x</MenuItem>
            <MenuItem value={1.5}>1.5x</MenuItem>
            <MenuItem value={2}>2x</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  )
}

export default AudioPlayer
