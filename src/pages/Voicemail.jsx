import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, List, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert, Grid } from '@mui/material'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import AudioPlayer from '../components/AudioPlayer'
import VoicemailItem from '../components/VoicemailItem'
import StatsCard from '../components/StatsCard'

function Voicemail() {
  const [mailboxes, setMailboxes] = useState([])
  const [selectedMailbox, setSelectedMailbox] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [playingId, setPlayingId] = useState(null)
  const [audioElement, setAudioElement] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentlyPlayingMessage, setCurrentlyPlayingMessage] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState(null)

  // Fetch voicemail boxes on component mount
  useEffect(() => {
    fetchMailboxes()
  }, [])

  // Fetch messages when mailbox changes
  useEffect(() => {
    if (selectedMailbox) {
      fetchMessages()
    }
  }, [selectedMailbox])

  const fetchMailboxes = async () => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:8000/api/voicemail', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        
        const mailboxArray = data?.data?.voicemails || []
        setMailboxes(mailboxArray)
        
        if (mailboxArray.length > 0) {
          setSelectedMailbox(mailboxArray[0].mailbox)
        } else {
          setError('No voicemail boxes found')
        }
      } else {
        setError('Failed to load voicemail boxes')
      }
    } catch (err) {
      setError('Connection error. Make sure backend is running')
      console.error('Fetch mailboxes error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (folder = 'INBOX') => {
    if (!selectedMailbox) return
    
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const url = `http://localhost:8000/api/voicemail/messages?mailbox=${selectedMailbox}&folder=${folder}`
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        
        const messagesArray = Array.isArray(data) ? data : (data?.data?.messages || data?.messages || [])
        
        const sortedMessages = messagesArray.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
        
        setMessages(sortedMessages)
        setError('')
      } else {
        setError('Failed to load messages')
      }
    } catch (err) {
      setError('Connection error. Make sure backend is running')
      console.error('Fetch messages error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayPause = async (messageId, folder, messageData = null) => {
    if (playingId === messageId) {
      // Pause/Resume current audio
      if (audioElement) {
        if (audioElement.paused) {
          audioElement.play()
        } else {
          audioElement.pause()
        }
      }
      return
    }

    // Stop any currently playing audio
    if (audioElement) {
      audioElement.pause()
      setCurrentTime(0)
    }

    // Reset playback speed to default for new message
    setPlaybackRate(1)

    // Store the message info
    setCurrentlyPlayingMessage(messageData)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:8000/api/voicemail/messages/${messageId}/file?mailbox=${selectedMailbox}&folder=${folder}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const blob = await response.blob()
        
        const audioUrl = URL.createObjectURL(blob)
        const audio = new Audio(audioUrl)
        audio.volume = volume
        audio.playbackRate = 1 // Always start at 1x for new messages
        
        audio.onloadedmetadata = () => {
          setDuration(audio.duration)
        }
        
        audio.ontimeupdate = () => {
          setCurrentTime(audio.currentTime)
        }
        
        audio.onended = () => {
          setPlayingId(null)
          setAudioElement(null)
          setCurrentTime(0)
          setDuration(0)
          URL.revokeObjectURL(audioUrl)
        }
        
        audio.onerror = (e) => {
          console.error('Audio playback error:', e)
          setError('Failed to play audio. Format may not be supported.')
          setPlayingId(null)
          setAudioElement(null)
          URL.revokeObjectURL(audioUrl)
        }
        
        audio.play().catch(err => {
          console.error('Audio play error:', err)
          setError('Failed to play voicemail')
          URL.revokeObjectURL(audioUrl)
        })
        
        setAudioElement(audio)
        setPlayingId(messageId)
      } else {
        const errorText = await response.text()
        console.error('Failed to load audio:', errorText)
        setError('Failed to load audio file')
      }
    } catch (err) {
      setError('Failed to play voicemail')
      console.error('Play voicemail error:', err)
    }
  }

  const handleSeek = (event, newValue) => {
    if (audioElement) {
      audioElement.currentTime = newValue
      setCurrentTime(newValue)
    }
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue)
    if (audioElement) {
      audioElement.volume = newValue
    }
  }

  const handlePlaybackRateChange = (event) => {
    const rate = parseFloat(event.target.value)
    setPlaybackRate(rate)
    if (audioElement) {
      audioElement.playbackRate = rate
    }
  }
  const handleStopAndClose = () => {
    if (audioElement) {
      audioElement.pause()
      audioElement.currentTime = 0
    }
    setPlayingId(null)
    setAudioElement(null)
    setCurrentlyPlayingMessage(null)
    setCurrentTime(0)
    setDuration(0)
  }

  const handleDownload = async (messageId, folder, callerId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:8000/api/voicemail/messages/${messageId}/file?mailbox=${selectedMailbox}&folder=${folder}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `voicemail_${callerId}_${messageId}.wav`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        setError('Failed to download voicemail')
      }
    } catch (err) {
      setError('Failed to download voicemail')
      console.error('Download voicemail error:', err)
    }
  }

  const handleDelete = (messageId, folder) => {
    setMessageToDelete({ messageId, folder })
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!messageToDelete) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:8000/api/voicemail/messages/${messageToDelete.messageId}?mailbox=${selectedMailbox}&folder=${messageToDelete.folder}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )

      if (response.ok) {
        // Find the deleted message to check if it was "new"
        const deletedMessage = messages.find(m => m.message_num === messageToDelete.messageId)
        const wasNewMessage = deletedMessage?.listened === 'no'
        
        // Immediately update the local state
        // Decrement the message count in mailboxes state
        setMailboxes(prev => prev.map(box => {
          if (box.mailbox === selectedMailbox) {
            return {
              ...box,
              new: wasNewMessage ? Math.max(0, parseInt(box.new) - 1).toString() : box.new
            }
          }
          return box
        }))
        
        // Refresh messages list
        fetchMessages()
        
        // After 30 seconds, re-fetch mailboxes to get accurate counts from server
        setTimeout(() => {
          fetchMailboxes()
        }, 30000)
        
        setDeleteDialogOpen(false)
        setMessageToDelete(null)
      } else {
        setError('Failed to delete voicemail')
        setDeleteDialogOpen(false)
      }
    } catch (err) {
      setError('Failed to delete voicemail')
      console.error('Delete voicemail error:', err)
      setDeleteDialogOpen(false)
    }
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setMessageToDelete(null)
  }

  const selectedMailboxData = mailboxes.find(box => box.mailbox === selectedMailbox)
  const newMessagesCount = selectedMailboxData ? parseInt(selectedMailboxData.new || 0) : 0

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Voicemail
        </Typography>
        <Typography color="text.secondary">
          Listen to and manage your voicemail messages
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Mailbox Selector */}
      {mailboxes.length > 0 && (
        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <FormControl fullWidth>
              <InputLabel>Voicemail Box</InputLabel>
              <Select
                value={selectedMailbox}
                onChange={(e) => setSelectedMailbox(e.target.value)}
                label="Voicemail Box"
              >
                {mailboxes.map((box) => (
                  <MenuItem key={box.mailbox} value={box.mailbox}>
                    {box.name || `Mailbox ${box.mailbox}`} ({box.mailbox})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <StatsCard 
            value={loading ? '...' : newMessagesCount} 
            label="New Messages" 
            color="#3b82f6" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsCard 
            value={loading ? '...' : messages.length} 
            label="Total Messages" 
            color="#6b7280" 
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="600" gutterBottom>Voicemail Inbox</Typography>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && messages.length === 0 && (
            <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              No voicemail messages
            </Typography>
          )}

          {!loading && messages.length > 0 && (
            <List>
              {messages.map((vm) => (
                <VoicemailItem
                  key={`${vm.folder}-${vm.message_num}`}
                  voicemail={vm}
                  isPlaying={playingId === vm.message_num}
                  isPaused={audioElement?.paused}
                  onPlay={() => handlePlayPause(vm.message_num, vm.folder, vm)}
                  onDownload={() => handleDownload(vm.message_num, vm.folder, vm.callerid)}
                  onDelete={() => handleDelete(vm.message_num, vm.folder)}
                >
                  {playingId === vm.message_num && (
                    <AudioPlayer
                      currentTime={currentTime}
                      duration={duration}
                      volume={volume}
                      playbackRate={playbackRate}
                      onSeek={handleSeek}
                      onVolumeChange={handleVolumeChange}
                      onPlaybackRateChange={handlePlaybackRateChange}
                      onClose={handleStopAndClose}
                    />
                  )}
                </VoicemailItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Voicemail"
        message="Are you sure you want to delete this voicemail? This action cannot be undone."
      />
    </Box>
  )
}

export default Voicemail