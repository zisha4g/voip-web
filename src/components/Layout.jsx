import { useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Divider,
  Menu,
  MenuItem
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PhoneIcon from '@mui/icons-material/Phone'
import VoicemailIcon from '@mui/icons-material/Voicemail'
import MessageIcon from '@mui/icons-material/Message'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import ContactsIcon from '@mui/icons-material/Contacts'
import GroupIcon from '@mui/icons-material/Group'
import ScheduleIcon from '@mui/icons-material/Schedule'

const drawerWidth = 260
const collapsedDrawerWidth = 76

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userInitial = user.company ? user.company.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSettingsClick = () => {
    handleMenuClose()
    navigate('/settings')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Phone', icon: <PhoneInTalkIcon />, path: '/phone' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'Voicemail', icon: <VoicemailIcon />, path: '/voicemail' },
    { text: 'Call History', icon: <AssessmentIcon />, path: '/call-history' },
    { text: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
    { text: 'IVR Menus', icon: <PhoneIcon />, path: '/ivr' },
    { text: 'Hours', icon: <ScheduleIcon />, path: '/hours' },
    { text: 'Ring Groups', icon: <GroupIcon />, path: '/ring-groups' },
    { text: 'Balance & Billing', icon: <AccountBalanceWalletIcon />, path: '/billing' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

  const handleMenuClick = (path) => {
    navigate(path)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev)
  }

  const currentDrawerWidth = sidebarCollapsed ? collapsedDrawerWidth : drawerWidth

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: currentDrawerWidth,
          '& .MuiDrawer-paper': {
            width: currentDrawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e5e7eb',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
        }}>
          <Box
            onClick={toggleSidebar}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            sx={{ 
            backgroundColor: '#3b82f6', 
            borderRadius: '8px', 
            p: 1,
            display: 'flex'
          }}>
            <PhoneIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          {!sidebarCollapsed && (
            <Typography variant="h6" fontWeight="700" color="#1f2937">
              VoIP Portal
            </Typography>
          )}
        </Box>

        {/* Menu Items */}
        <List sx={{ mt: 2, px: sidebarCollapsed ? 1 : 2, flexGrow: 1, overflow: 'auto' }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleMenuClick(item.path)}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    backgroundColor: '#eff6ff',
                    color: '#3b82f6',
                    '& .MuiListItemIcon-root': {
                      color: '#3b82f6',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                  },
                  py: 1.2,
                }}
              >
                <ListItemIcon sx={{ color: '#6b7280', minWidth: sidebarCollapsed ? 0 : 40, justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                {!sidebarCollapsed && (
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === item.path ? 600 : 500
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Logout */}
        <Box sx={{ p: sidebarCollapsed ? 1 : 2, borderTop: '1px solid #e5e7eb' }}>
          <ListItemButton 
            onClick={handleLogout}
            sx={{
              borderRadius: '8px',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              '&:hover': {
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                '& .MuiListItemIcon-root': {
                  color: '#dc2626',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: '#6b7280', minWidth: sidebarCollapsed ? 0 : 40, justifyContent: 'center' }}>
              <LogoutIcon />
            </ListItemIcon>
            {!sidebarCollapsed && (
              <ListItemText 
                primary="Logout"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            backgroundColor: 'white', 
            color: '#1f2937',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
            
            <Avatar 
              sx={{ 
                bgcolor: '#3b82f6', 
                cursor: 'pointer',
                fontWeight: 700,
                '&:hover': { bgcolor: '#2563eb' }
              }}
              onClick={handleMenuOpen}
            >
              {userInitial}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 1 }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
                <Typography variant="body2" fontWeight="600">
                  {user.company || 'User'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email || 'email@example.com'}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleSettingsClick}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Layout