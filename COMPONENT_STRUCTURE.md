# VoIP Portal - Component Structure

## Overview
This project follows React best practices by breaking down large components into smaller, reusable pieces. This makes the code more maintainable, testable, and allows components to be reused across the application.

## Reusable Components

### 1. `DeleteConfirmDialog.jsx`
**Location:** `src/components/DeleteConfirmDialog.jsx`  
**Purpose:** Material-UI dialog for confirming delete operations  
**Props:**
- `open` (boolean): Controls dialog visibility
- `onClose` (function): Called when cancel or close
- `onConfirm` (function): Called when delete is confirmed
- `title` (string): Dialog title (default: "Confirm Delete")
- `message` (string): Warning message to display

**Usage Example:**
```jsx
<DeleteConfirmDialog
  open={deleteDialogOpen}
  onClose={() => setDeleteDialogOpen(false)}
  onConfirm={handleConfirmDelete}
  title="Delete Voicemail"
  message="Are you sure you want to delete this voicemail? This action cannot be undone."
/>
```

**Can be reused for:**
- Deleting contacts
- Deleting call history entries
- Removing IVR menus
- Any destructive action requiring confirmation

---

### 2. `AudioPlayer.jsx`
**Location:** `src/components/AudioPlayer.jsx`  
**Purpose:** Custom audio player with playback controls  
**Props:**
- `currentTime` (number): Current playback position in seconds
- `duration` (number): Total audio duration in seconds
- `volume` (number): Volume level (0-1)
- `playbackRate` (number): Playback speed (0.5x - 2x)
- `onSeek` (function): Called when user seeks to a position
- `onVolumeChange` (function): Called when volume changes
- `onPlaybackRateChange` (function): Called when speed changes
- `onClose` (function): Called when player is closed

**Features:**
- Progress slider with time display
- Volume control
- Playback speed selector (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
- Close button

**Usage Example:**
```jsx
<AudioPlayer
  currentTime={currentTime}
  duration={duration}
  volume={volume}
  playbackRate={playbackRate}
  onSeek={(e, value) => audioElement.currentTime = value}
  onVolumeChange={(e, value) => audioElement.volume = value}
  onPlaybackRateChange={(e) => audioElement.playbackRate = e.target.value}
  onClose={handleStopPlayback}
/>
```

**Can be reused for:**
- Playing call recordings
- IVR message preview
- Voicemail greetings
- Any audio playback in the app

---

### 3. `VoicemailItem.jsx`
**Location:** `src/components/VoicemailItem.jsx`  
**Purpose:** Display a single voicemail message with actions  
**Props:**
- `voicemail` (object): Voicemail data (callerid, date, duration, urgent, listened, etc.)
- `isPlaying` (boolean): Whether this voicemail is currently playing
- `isPaused` (boolean): Whether playback is paused
- `onPlay` (function): Called when play/pause button clicked
- `onDownload` (function): Called when download button clicked
- `onDelete` (function): Called when delete button clicked
- `children` (ReactNode): Optional children (e.g., audio player)

**Features:**
- Formatted phone number display
- Date/time formatting
- Duration display
- "Urgent" and "New" badges
- Play/pause, download, and delete buttons

**Usage Example:**
```jsx
<VoicemailItem
  voicemail={voicemailData}
  isPlaying={playingId === voicemailData.id}
  isPaused={audio?.paused}
  onPlay={() => handlePlay(voicemailData.id)}
  onDownload={() => handleDownload(voicemailData.id)}
  onDelete={() => handleDelete(voicemailData.id)}
>
  {isPlaying && <AudioPlayer {...playerProps} />}
</VoicemailItem>
```

**Can be adapted for:**
- Call history entries (similar structure)
- SMS message items
- Notification items

---

### 4. `StatsCard.jsx`
**Location:** `src/components/StatsCard.jsx`  
**Purpose:** Display a statistic with label  
**Props:**
- `value` (string|number): The stat value to display
- `label` (string): Description label
- `color` (string): Color for the value (default: '#3b82f6')

**Usage Example:**
```jsx
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <StatsCard value="25" label="New Messages" color="#3b82f6" />
  </Grid>
  <Grid item xs={12} md={6}>
    <StatsCard value="150" label="Total Messages" color="#6b7280" />
  </Grid>
</Grid>
```

**Can be reused for:**
- Dashboard statistics
- Call metrics (total calls, missed calls)
- SMS counts
- Billing summary
- Any numeric metric display

---

## Page Components

### `Voicemail.jsx`
**Location:** `src/pages/Voicemail.jsx`  
**Lines:** 426 (reduced from 640)  
**Purpose:** Main voicemail management page  
**Uses:** DeleteConfirmDialog, AudioPlayer, VoicemailItem, StatsCard

**Key Features:**
- Fetches voicemail boxes and messages from API
- Audio playback with HTML5 Audio API
- Delete with optimistic UI updates
- Auto-refresh after 30 seconds (VoIP.ms delay)
- Latest messages first sorting

---

## Benefits of This Structure

### 1. **Reusability**
Components like `DeleteConfirmDialog` and `AudioPlayer` can be used throughout the app, ensuring consistent UX.

### 2. **Maintainability**
Smaller components are easier to understand, test, and modify. Changes to the audio player only affect one file.

### 3. **Separation of Concerns**
- UI components handle display and user interaction
- Page components handle data fetching and business logic
- Clear responsibility boundaries

### 4. **Testability**
Individual components can be unit tested in isolation with different props.

### 5. **Consistency**
Using the same components everywhere ensures consistent styling and behavior across the app.

---

## Next Steps for Other Pages

Apply the same pattern to other pages:

### Messages Page
- Create `MessageItem.jsx` (similar to VoicemailItem)
- Reuse `DeleteConfirmDialog`
- Possibly create `MessageComposer.jsx` for sending

### Call History Page
- Create `CallHistoryItem.jsx`
- Reuse `AudioPlayer` for recordings
- Reuse `StatsCard` for call statistics
- Reuse `DeleteConfirmDialog`

### IVR Page
- Reuse `AudioPlayer` for menu previews
- Create `IVRMenuBuilder.jsx` component
- Reuse `DeleteConfirmDialog`

### Contacts Page
- Create `ContactCard.jsx`
- Reuse `DeleteConfirmDialog`
- Create `ContactForm.jsx` for add/edit

---

## File Organization

```
src/
├── components/          # Reusable components
│   ├── AudioPlayer.jsx
│   ├── DeleteConfirmDialog.jsx
│   ├── Layout.jsx
│   ├── StatsCard.jsx
│   └── VoicemailItem.jsx
├── pages/              # Page-level components
│   ├── Voicemail.jsx
│   ├── Messages.jsx
│   ├── CallHistory.jsx
│   ├── Contacts.jsx
│   ├── IVR.jsx
│   ├── Settings.jsx
│   └── ...
└── ...
```

---

## Component Design Principles

1. **Single Responsibility:** Each component does one thing well
2. **Props over State:** Accept data via props when possible
3. **Composition:** Use children prop for flexible layouts
4. **Consistent Naming:** Clear, descriptive component names
5. **Prop Validation:** Document expected props and types
6. **Minimal Dependencies:** Import only what you need

---

## Performance Considerations

- Components re-render only when their props change
- Keep components small and focused
- Use React.memo() for expensive components if needed
- Avoid inline function definitions in render (use useCallback)

---

*Last Updated: December 18, 2025*
