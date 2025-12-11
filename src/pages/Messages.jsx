import { useState } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Badge,
  InputAdornment,
  Chip,
  Menu,
  ListItemIcon,
  Tooltip,
  Divider
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import ArchiveIcon from '@mui/icons-material/Archive'
import PushPinIcon from '@mui/icons-material/PushPin'
import InfoIcon from '@mui/icons-material/Info'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import DoneIcon from '@mui/icons-material/Done'
import ScheduleIcon from '@mui/icons-material/Schedule'

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [messageText, setMessageText] = useState('')
  const [selectedDID, setSelectedDID] = useState('8452441740')
  const [anchorEl, setAnchorEl] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']
    return colors[name.length % colors.length]
  }

  const conversations = [
    { id: 1, number: '9292221696', name: 'John Doe', lastMessage: 'Hi when are you open', time: 'Dec 6', unread: 2, pinned: true, status: 'delivered' },
    { id: 2, number: '8888781488', name: 'Sarah Smith', lastMessage: 'Your account has been updated', time: 'Dec 7', unread: 0, pinned: false, status: 'read' },
    { id: 3, number: '3478610637', name: 'Mike Johnson', lastMessage: 'Package delivered', time: 'Dec 9', unread: 1, pinned: false, status: 'sent' },
    { id: 4, number: '5162521697', name: 'Lisa Brown', lastMessage: 'Just a test message here', time: '13:15', unread: 0, pinned: false, status: 'read' },
    { id: 5, number: '2125551234', name: 'David Wilson', lastMessage: 'Thanks for the update!', time: 'Yesterday', unread: 0, pinned: false, status: 'read' },
  ]

  const currentMessages = [
    { id: 1, text: 'Hi when are you open', sender: 'them', time: '10:30 AM', status: 'read', date: 'Today' },
    { id: 2, text: 'Hello! We are open Monday-Friday 9AM-6PM. How can I help you today?', sender: 'me', time: '10:35 AM', status: 'read' },
    { id: 3, text: 'Great, thank you!', sender: 'them', time: '10:36 AM', status: 'read' },
    { id: 4, text: 'Do you offer same-day delivery?', sender: 'them', time: '10:37 AM', status: 'read' },
    { id: 5, text: 'Yes, we do! Orders placed before 2 PM are eligible for same-day delivery.', sender: 'me', time: '10:38 AM', status: 'delivered' },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Send message logic here
      setMessageText('')
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <DoneIcon sx={{ fontSize: 14 }} />
      case 'delivered':
        return <DoneAllIcon sx={{ fontSize: 14 }} />
      case 'read':
        return <DoneAllIcon sx={{ fontSize: 14, color: '#3b82f6' }} />
      default:
        return <ScheduleIcon sx={{ fontSize: 14 }} />
    }
  }

  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Messages
          </Typography>
          <Typography color="text.secondary">
            Send and receive SMS/MMS messages
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
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

      <Card sx={{ borderRadius: 3, height: 'calc(100vh - 250px)', display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar - Conversations List */}
        <Box sx={{ 
          width: 380, 
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fafafa'
        }}>
          {/* DID Selector & Search */}
          <Box sx={{ p: 2.5, backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>From Number</InputLabel>
              <Select 
                value={selectedDID} 
                onChange={(e) => setSelectedDID(e.target.value)}
                label="From Number"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="8452441740">
                  <Box>
                    <Typography variant="body2" fontWeight="600">CLINTONDL, NY</Typography>
                    <Typography variant="caption" color="text.secondary">(845) 244-1740</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="9175551234">
                  <Box>
                    <Typography variant="body2" fontWeight="600">NEW YORK, NY</Typography>
                    <Typography variant="caption" color="text.secondary">(917) 555-1234</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              placeholder="Search conversations..."
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#f9fafb'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Conversations List */}
          <List sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
            {sortedConversations.map((conv, index) => (
              <ListItem
                key={conv.id}
                button
                selected={selectedConversation === index}
                onClick={() => setSelectedConversation(index)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  backgroundColor: selectedConversation === index ? '#eff6ff' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedConversation === index ? '#eff6ff' : '#f3f4f6'
                  },
                  py: 1.5,
                  px: 1.5,
                  border: selectedConversation === index ? '2px solid #3b82f6' : '2px solid transparent'
                }}
              >
                <ListItemAvatar>
                  <Badge 
                    badgeContent={conv.unread} 
                    color="error"
                    overlap="circular"
                  >
                    <Avatar 
                      sx={{ 
                        backgroundColor: getAvatarColor(conv.name),
                        width: 48,
                        height: 48,
                        fontWeight: 600
                      }}
                    >
                      {conv.name.charAt(0)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {conv.pinned && <PushPinIcon sx={{ fontSize: 14, color: '#3b82f6' }} />}
                        <Typography fontWeight="700" variant="body1">
                          {conv.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="500">
                        {conv.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.3 }}>
                        {conv.number}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {getStatusIcon(conv.status)}
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: conv.unread > 0 ? 600 : 400
                          }}
                        >
                          {conv.lastMessage}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Panel - Chat Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
          {/* Chat Header */}
          <Box sx={{ 
            p: 2.5, 
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                backgroundColor: getAvatarColor(sortedConversations[selectedConversation].name),
                width: 44,
                height: 44,
                fontWeight: 600
              }}>
                {sortedConversations[selectedConversation].name.charAt(0)}
              </Avatar>
              <Box>
                <Typography fontWeight="700" variant="h6">
                  {sortedConversations[selectedConversation].name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sortedConversations[selectedConversation].number}
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <Tooltip title="Info">
                <IconButton onClick={() => setShowInfo(!showInfo)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PushPinIcon fontSize="small" />
                </ListItemIcon>
                Pin Conversation
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <ArchiveIcon fontSize="small" />
                </ListItemIcon>
                Archive
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose} sx={{ color: '#ef4444' }}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" sx={{ color: '#ef4444' }} />
                </ListItemIcon>
                Delete Conversation
              </MenuItem>
            </Menu>
          </Box>

          {/* Messages Area */}
          <Box sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            p: 3,
            backgroundColor: '#f9fafb',
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}>
            {/* Date Separator */}
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Chip label="Today" size="small" sx={{ backgroundColor: 'white', fontWeight: 600 }} />
            </Box>

            {currentMessages.map((msg) => (
              <Box 
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                  mb: 1.5,
                  alignItems: 'flex-end',
                  gap: 1
                }}
              >
                {msg.sender === 'them' && (
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      backgroundColor: getAvatarColor(sortedConversations[selectedConversation].name),
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    {sortedConversations[selectedConversation].name.charAt(0)}
                  </Avatar>
                )}
                
                <Paper
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    maxWidth: '65%',
                    backgroundColor: msg.sender === 'me' ? '#3b82f6' : 'white',
                    color: msg.sender === 'me' ? 'white' : '#1f2937',
                    borderRadius: msg.sender === 'me' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                  elevation={0}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    {msg.text}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, justifyContent: 'flex-end' }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        opacity: 0.8,
                        fontSize: '0.7rem'
                      }}
                    >
                      {msg.time}
                    </Typography>
                    {msg.sender === 'me' && (
                      <Box sx={{ display: 'flex', opacity: 0.8 }}>
                        {getStatusIcon(msg.status)}
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            ))}

            {/* Typing Indicator */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#6b7280' }}>J</Avatar>
              <Paper sx={{ px: 2.5, py: 1.5, borderRadius: '20px 20px 20px 4px' }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box className="typing-dot"></Box>
                  <Box className="typing-dot"></Box>
                  <Box className="typing-dot"></Box>
                </Box>
              </Paper>
            </Box> */}
          </Box>

          {/* Message Input */}
          <Box sx={{ 
            p: 2.5, 
            borderTop: '1px solid #e5e7eb',
            backgroundColor: 'white'
          }}>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
              <Tooltip title="Attach file">
                <IconButton 
                  size="large"
                  sx={{ 
                    color: '#6b7280',
                    '&:hover': { 
                      backgroundColor: '#f3f4f6',
                      color: '#3b82f6' 
                    }
                  }}
                >
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Emoji">
                <IconButton 
                  size="large"
                  sx={{ 
                    color: '#6b7280',
                    '&:hover': { 
                      backgroundColor: '#f3f4f6',
                      color: '#3b82f6' 
                    }
                  }}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
              
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.95rem'
                  }
                }}
              />
              
              <IconButton 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                size="large"
                sx={{ 
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    backgroundColor: '#2563eb'
                  },
                  '&:disabled': {
                    backgroundColor: '#e5e7eb',
                    color: '#9ca3af'
                  }
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Press Enter to send, Shift+Enter for new line
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {messageText.length}/2048
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Info Panel (Optional) */}
        {showInfo && (
          <Box sx={{ 
            width: 300, 
            borderLeft: '1px solid #e5e7eb',
            p: 3,
            backgroundColor: '#fafafa'
          }}>
            <Typography variant="h6" fontWeight="700" gutterBottom>
              Contact Info
            </Typography>
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                margin: '0 auto',
                backgroundColor: getAvatarColor(sortedConversations[selectedConversation].name),
                fontSize: '2rem',
                fontWeight: 600
              }}>
                {sortedConversations[selectedConversation].name.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight="700" sx={{ mt: 2 }}>
                {sortedConversations[selectedConversation].name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sortedConversations[selectedConversation].number}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Button fullWidth variant="outlined" sx={{ mb: 1, borderRadius: 2 }}>
              Call
            </Button>
            <Button fullWidth variant="outlined" sx={{ mb: 1, borderRadius: 2 }}>
              Video Call
            </Button>
            <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
              View Profile
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  )
}

export default Messages