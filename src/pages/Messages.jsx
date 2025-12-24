import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  Card, 
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

const API_BASE_URL = 'http://localhost:8000'

function Messages() {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [isComposingNew, setIsComposingNew] = useState(false)
  const [newContact, setNewContact] = useState('')
  const [messageText, setMessageText] = useState('')
  const [selectedDID, setSelectedDID] = useState('')
  const [availableDIDs, setAvailableDIDs] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [mediaUrl, setMediaUrl] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const toErrorMessage = (value) => {
    if (!value) return 'Something went wrong'
    if (typeof value === 'string') return value
    if (typeof value?.error === 'string') return value.error
    if (typeof value?.message === 'string') return value.message
    try {
      return JSON.stringify(value)
    } catch {
      return 'Something went wrong'
    }
  }

  useEffect(() => {
    fetchAllMessages({ populateDids: true })
  }, [])

  useEffect(() => {
    if (!selectedDID) return
    fetchAllMessages({ did: selectedDID })
  }, [selectedDID])

  const requireToken = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Please log in to view messages')
      return null
    }
    return token
  }

  const handleUnauthorized = () => {
    setError('Session expired. Please log in again.')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const extractArrayFromResponse = (data, preferredKey) => {
    if (Array.isArray(data)) return data
    if (data?.success && data?.data) {
      const container = data.data
      if (preferredKey && Array.isArray(container?.[preferredKey])) return container[preferredKey]
      if (Array.isArray(container?.sms)) return container.sms
      if (Array.isArray(container?.mms)) return container.mms
    }
    if (Array.isArray(data?.data)) return data.data
    return []
  }

  const fetchAllMessages = async ({ did, populateDids = false } = {}) => {
    try {
      const token = requireToken()
      if (!token) {
        setLoading(false)
        return
      }

      const params = new URLSearchParams()
      if (did) params.set('did', did)
      params.set('limit', '200')
      const query = params.toString()

      const [smsResponse, mmsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/sms${query ? `?${query}` : ''}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/sms/mms${query ? `?${query}` : ''}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      if (smsResponse.status === 401 || mmsResponse.status === 401) {
        handleUnauthorized()
        return
      }

      if (!smsResponse.ok) {
        setError('Failed to load SMS messages')
        return
      }

      const smsData = await smsResponse.json()
      const mmsData = mmsResponse.ok ? await mmsResponse.json() : null

      const smsArray = extractArrayFromResponse(smsData, 'sms').map(m => ({ ...m, kind: 'sms' }))
      const mmsArray = mmsData ? extractArrayFromResponse(mmsData, 'mms').map(m => ({ ...m, kind: 'mms' })) : []

      const combined = [...smsArray, ...mmsArray]

      const grouped = groupMessagesByContact(combined)
      setConversations(grouped)

      if (populateDids) {
        const dids = [...new Set(combined.map(msg => msg.did))].filter(Boolean)
        setAvailableDIDs(dids)
        if (dids.length > 0 && !selectedDID) {
          setSelectedDID(dids[0])
        }
      }

      setError('')
    } catch (err) {
      setError('Connection error. Make sure backend is running')
      console.error('Fetch SMS error:', err)
    } finally {
      setLoading(false)
    }
  }

  const groupMessagesByContact = (messages) => {
    const groups = {}
    
    messages.forEach(msg => {
      // type: "0" = outgoing (you sent), "1" = incoming (they sent)
      const contact = msg.contact || msg.dst || msg.src
      if (!contact) return
      if (!groups[contact]) {
        groups[contact] = {
          contact,
          messages: []
        }
      }
      groups[contact].messages.push(msg)
    })

    return Object.values(groups).map(group => {
      const sorted = group.messages.sort((a, b) => new Date(a.date) - new Date(b.date))
      return {
        contact: group.contact,
        lastMessage: sorted[sorted.length - 1]?.message || '',
        time: formatTime(sorted[sorted.length - 1]?.date),
        messageCount: sorted.length,
        messages: sorted
      }
    }).sort((a, b) => new Date(b.messages[b.messages.length - 1]?.date) - new Date(a.messages[a.messages.length - 1]?.date))
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    
    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    } else if (diff < 604800000) {
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const formatPhoneNumber = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    if (cleaned.length === 11) {
      return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    }
    return phone
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() && !imageFile && !mediaUrl.trim()) return
    const contactToSend = isComposingNew ? newContact.trim() : selectedContact
    if (!contactToSend) {
      setError('Please select or enter a contact number')
      return
    }
    if (!selectedDID) {
      setError('Please select a From Number')
      return
    }

    setSending(true)
    try {
      const token = requireToken()
      if (!token) return

      const normalizedMediaUrl = mediaUrl.trim()
      const wantsMms = Boolean(imageFile) || Boolean(normalizedMediaUrl)

      if (wantsMms) {
        let finalMediaUrl = normalizedMediaUrl

        if (!finalMediaUrl && imageFile) {
          setUploadingMedia(true)
          try {
            const formData = new FormData()
            formData.append('file', imageFile)

            const uploadResponse = await fetch(`${API_BASE_URL}/api/uploads`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: formData
            })

            if (uploadResponse.status === 401) {
              handleUnauthorized()
              return
            }

            const uploadData = await uploadResponse.json().catch(() => null)
            if (!uploadResponse.ok || !uploadData?.success) {
              if (uploadResponse.status === 404) {
                setError('Upload endpoint not found (404). Make sure your backend is updated and restarted, and that POST /api/uploads is mounted in server.js.')
                return
              }

              const fallbackText = uploadData?.error
                ? uploadData.error
                : `Upload failed (${uploadResponse.status}).`
              setError(toErrorMessage(fallbackText))
              return
            }

            const returnedUrl = uploadData?.data?.url
            if (!returnedUrl) {
              setError('Upload succeeded but no URL was returned')
              return
            }

            finalMediaUrl = returnedUrl.startsWith('/') ? `${API_BASE_URL}${returnedUrl}` : returnedUrl
            setMediaUrl(finalMediaUrl)
          } finally {
            setUploadingMedia(false)
          }
        }

        if (!finalMediaUrl) {
          setError('Please attach an image or paste an image URL')
          return
        }

        const response = await fetch(`${API_BASE_URL}/api/sms/mms`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            did: selectedDID,
            dst: contactToSend,
            message: messageText,
            media1: finalMediaUrl
          })
        })

        if (response.status === 401) {
          handleUnauthorized()
          return
        }

        if (response.ok) {
          setMessageText('')
          setImageFile(null)
          setMediaUrl('')
          setIsComposingNew(false)
          setNewContact('')
          setSelectedContact(contactToSend)
          fetchAllMessages({ did: selectedDID })
        } else {
          const data = await response.json().catch(() => null)
          setError(toErrorMessage(data?.error || data || 'Failed to send MMS'))
        }
        return
      }

      {
        const response = await fetch(`${API_BASE_URL}/api/sms`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            did: selectedDID,
            dst: contactToSend,
            message: messageText
          })
        })

        if (response.status === 401) {
          handleUnauthorized()
          return
        }

        if (response.ok) {
          setMessageText('')
          setIsComposingNew(false)
          setNewContact('')
          setSelectedContact(contactToSend)
          fetchAllMessages({ did: selectedDID })
        } else {
          const data = await response.json().catch(() => null)
          setError(toErrorMessage(data?.error || data || 'Failed to send SMS'))
        }
      }
    } catch (err) {
      setError(toErrorMessage(err))
      console.error('Send message error:', err)
    } finally {
      setSending(false)
    }
  }

  const handleDeleteMessage = (messageId) => {
    setDeleteTarget({ kind: 'message', id: messageId })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConversation = () => {
    if (!selectedContact) return
    setDeleteTarget({ kind: 'conversation', contact: selectedContact })
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      const token = requireToken()
      if (!token) return

      if (deleteTarget.kind === 'message') {
        const response = await fetch(`${API_BASE_URL}/api/sms/${deleteTarget.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          setError(toErrorMessage(data?.error || data || 'Failed to delete message'))
          return
        }
      }

      if (deleteTarget.kind === 'conversation') {
        const convo = conversations.find(c => c.contact === deleteTarget.contact)
        const ids = (convo?.messages || []).map(m => m.id).filter(Boolean)
        await Promise.allSettled(
          ids.map(id =>
            fetch(`${API_BASE_URL}/api/sms/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            })
          )
        )
        setSelectedContact(null)
      }

      setDeleteDialogOpen(false)
      setDeleteTarget(null)
      fetchAllMessages({ did: selectedDID })
    } catch (err) {
      setError(toErrorMessage(err))
      console.error('Delete message error:', err)
    }
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setDeleteTarget(null)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      // Keep mediaUrl if user already pasted one; otherwise we'll upload on send.
    }
  }

  const filteredConversations = conversations
    .filter(conv => {
      // Keep it simple: apply search filter only
      return conv.contact?.includes(searchQuery) || 
        conv.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
    })

  const currentConversation = conversations.find(c => c.contact === selectedContact)
  const currentMessages = currentConversation?.messages || []

  const getAvatarColor = (contact) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']
    const hash = contact?.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0) || 0
    return colors[hash % colors.length]
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsComposingNew(true)
            setNewContact('')
            setSelectedContact(null)
            setMessageText('')
            setImageFile(null)
          }}
          sx={{
            backgroundColor: '#3b82f6',
            '&:hover': { backgroundColor: '#2563eb' },
            borderRadius: 3,
            px: 3
          }}
        >
          New Message
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {toErrorMessage(error)}
        </Alert>
      )}

      <Card sx={{ borderRadius: 3, flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ 
          width: 360, 
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fafafa'
        }}>
          <Box sx={{ p: 2.5, backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
            {availableDIDs.length > 0 ? (
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>From Number</InputLabel>
                <Select 
                  value={selectedDID} 
                  onChange={(e) => setSelectedDID(e.target.value)}
                  label="From Number"
                  sx={{ borderRadius: 2 }}
                >
                  {availableDIDs.map(did => (
                    <MenuItem key={did} value={did}>
                      {formatPhoneNumber(did)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                size="small"
                label="From Number"
                value={selectedDID}
                onChange={(e) => setSelectedDID(e.target.value)}
                placeholder="Enter your DID"
                sx={{ mb: 2 }}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            )}

            <TextField
              fullWidth
              size="small"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
          </Box>

          <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredConversations.length === 0 ? (
              <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>
                No messages
              </Typography>
            ) : (
              filteredConversations.map((conv) => (
                <ListItem key={conv.contact} disablePadding sx={{ borderBottom: '1px solid #e5e7eb' }}>
                  <ListItemButton
                    selected={selectedContact === conv.contact}
                    onClick={() => {
                      setSelectedContact(conv.contact)
                      setIsComposingNew(false)
                      setNewContact('')
                    }}
                    sx={{
                      backgroundColor: selectedContact === conv.contact ? '#eff6ff' : 'white',
                      '&:hover': { backgroundColor: '#f3f4f6' },
                      py: 2
                    }}
                  >
                    <Avatar sx={{ bgcolor: getAvatarColor(conv.contact), mr: 2 }}>
                      <PersonIcon />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography fontWeight="600">
                            {formatPhoneNumber(conv.contact)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {conv.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {conv.lastMessage}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
          {(selectedContact || isComposingNew) ? (
            <>
              <Box sx={{ 
                p: 2.5, 
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: getAvatarColor(selectedContact || newContact), mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    {isComposingNew ? (
                      <TextField
                        size="small"
                        value={newContact}
                        onChange={(e) => setNewContact(e.target.value)}
                        placeholder="Enter phone number"
                        sx={{ width: 260 }}
                      />
                    ) : (
                      <>
                        <Typography fontWeight="600">
                          {formatPhoneNumber(selectedContact)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {currentMessages.length} messages
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                {!isComposingNew && (
                  <IconButton onClick={handleDeleteConversation} sx={{ color: '#ef4444' }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', p: 3, backgroundColor: '#f9fafb' }}>
                {currentMessages.map((msg, index) => {
                  // type: "0" = you sent it, "1" = they sent it
                  const isFromMe = msg.type === "0"
                  return (
                    <Box
                      key={msg.id || index}
                      sx={{
                        display: 'flex',
                        justifyContent: isFromMe ? 'flex-end' : 'flex-start',
                        mb: 2
                      }}
                    >
                      <Paper
                        sx={{
                          maxWidth: '70%',
                          p: 1.5,
                          backgroundColor: isFromMe ? '#3b82f6' : 'white',
                          color: isFromMe ? 'white' : 'text.primary',
                          borderRadius: 2,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {msg.kind === 'mms' && (
                            <Chip size="small" label="MMS" sx={{ height: 18, fontSize: 10 }} />
                          )}
                          <Typography variant="body2">{msg.message || (msg.kind === 'mms' ? '[Media]' : '')}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                            {formatTime(msg.date)}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteMessage(msg.id)}
                            sx={{
                              ml: 1,
                              color: isFromMe ? 'white' : '#6b7280',
                              opacity: 0.8
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Box>
                  )
                })}
              </Box>

              <Box sx={{ p: 2.5, borderTop: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                {imageFile && (
                  <Chip
                    icon={<ImageIcon />}
                    label={uploadingMedia ? `Uploading: ${imageFile.name}` : imageFile.name}
                    onDelete={() => setImageFile(null)}
                    sx={{ mb: 1 }}
                  />
                )}

                {(imageFile || mediaUrl) && (
                  <TextField
                    fullWidth
                    size="small"
                    label="Image URL (public https://...)"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://..."
                    sx={{ mb: 1 }}
                  />
                )}

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    onChange={handleImageSelect}
                  />
                  <label htmlFor="image-upload">
                    <IconButton component="span" sx={{ color: '#6b7280' }}>
                      <AttachFileIcon />
                    </IconButton>
                  </label>

                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    multiline
                    maxRows={3}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  />

                  <IconButton 
                    onClick={handleSendMessage}
                    disabled={(!messageText.trim() && !imageFile && !mediaUrl.trim()) || sending || uploadingMedia}
                    sx={{ 
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      '&:hover': { backgroundColor: '#2563eb' },
                      '&:disabled': { backgroundColor: '#e5e7eb' }
                    }}
                  >
                    {(sending || uploadingMedia) ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  </IconButton>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'text.secondary'
            }}>
              <Typography>Select a conversation to start messaging</Typography>
            </Box>
          )}
        </Box>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={deleteTarget?.kind === 'conversation' ? 'Delete Conversation' : 'Delete Message'}
        message={deleteTarget?.kind === 'conversation'
          ? 'Delete this entire conversation? This will remove all messages in it.'
          : 'Are you sure you want to delete this message? This action cannot be undone.'}
      />
    </Box>
  )
}

export default Messages
