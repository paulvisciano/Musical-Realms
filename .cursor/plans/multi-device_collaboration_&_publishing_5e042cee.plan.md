---
name: Multi-Device Collaboration & Publishing
overview: Transform Musical Cubes from a single-device experience to a collaborative, multi-device platform where users can sync cubes across devices on a local network, record their own samples, and publish/share samples and entire cubes with others.
todos:
  - id: network-sync-layer
    content: Create WebSocket communication layer (SyncServer.ts, SyncProtocol.ts, SyncService.ts) for real-time synchronization
    status: pending
  - id: network-redux-slice
    content: Create networkSlice.ts Redux slice for managing connection state, session ID, and participant list
    status: pending
  - id: enhance-track-sync
    content: Modify WaveSurferInstance and TrackSlice to broadcast and receive network sync events (play/pause/seek/cube-flip)
    status: pending
    dependencies:
      - network-sync-layer
      - network-redux-slice
  - id: host-service
    content: Create HostService for starting local HTTP/WebSocket server, generating session IDs and QR codes
    status: pending
    dependencies:
      - network-sync-layer
  - id: qr-code-ui
    content: Build HostPanel and JoinPanel components with QR code generation and scanning functionality
    status: pending
    dependencies:
      - host-service
  - id: audio-recorder
    content: Implement AudioRecorder service using MediaRecorder API with WAV export and preview capabilities
    status: pending
  - id: recording-ui
    content: Create RecordingPanel component with record controls, waveform preview, and save functionality
    status: pending
    dependencies:
      - audio-recorder
  - id: audio-storage
    content: Implement AudioStorage service using IndexedDB for storing recorded samples locally
    status: pending
    dependencies:
      - audio-recorder
  - id: sample-publisher
    content: Create SamplePublisher service to package samples with metadata and enable sharing
    status: pending
    dependencies:
      - audio-storage
  - id: cube-publisher
    content: Create CubePublisher service to export/import cube packages (JSON manifest + audio files)
    status: pending
    dependencies:
      - sample-publisher
  - id: library-slice
    content: Create librarySlice.ts Redux slice for managing user sample library and published cubes
    status: pending
  - id: library-ui
    content: Build LibraryPanel and SamplePicker components for browsing and selecting samples/cubes
    status: pending
    dependencies:
      - library-slice
      - cube-publisher
  - id: cube-builder
    content: Create CubeBuilder component to allow users to create custom cubes from library samples
    status: pending
    dependencies:
      - library-ui
  - id: collaboration-indicators
    content: Add UI indicators showing which participant controls which cube and remote action feedback
    status: pending
    dependencies:
      - enhance-track-sync
  - id: audio-file-serving
    content: Implement audio file serving/proxy for host to serve audio files to connected clients
    status: pending
    dependencies:
      - host-service
---

# Multi-Device Collaboration & Publishing System

## Current State Analysis

The app currently supports:

- 3D musical cubes with swipable sides (using Swiper with EffectCube)
- Local synchronization via Redux `sharedTrackTime` (cubes sync on same device)
- Pre-defined tracks with samples stored in `public/assets/sounds/musicalCube/tracks/`
- WaveSurfer for audio playback visualization
- Two cube types: Melody (looping) and Vocals/One-shots

## Architecture Overview

The plan assumes a **hybrid approach** starting with a local server architecture:

- **Phase 1**: Host-based local server (one device hosts, others connect)
- **Phase 2**: Expand to peer-to-peer (WebRTC) for more flexibility
- Recording: Client-side with optional upload to server/library
- Publishing: Start with local network sharing, expand to cloud library

## Implementation Plan

### Phase 1: Multi-Device Synchronization Infrastructure

#### 1.1 Network Communication Layer

- Create WebSocket server for real-time sync (Node.js + Socket.io or ws)
- Implement client WebSocket service in React
- Create sync message protocol for:
  - Play/pause events
  - Cube rotation (active side changes)
  - Time synchronization
  - Session join/leave
- Store: `src/services/network/` directory

**Files to create:**

- `src/services/network/SyncServer.ts` - WebSocket server wrapper/client
- `src/services/network/SyncProtocol.ts` - Message types and serialization
- `src/services/network/SyncService.ts` - High-level sync API

#### 1.2 Redux Integration for Network State

- Extend `src/store/store.ts` with network slice
- Create `src/store/networkSlice.ts`:
  - Connection state (hosting/connected/disconnected)
  - Session ID and participant list
  - Network synchronization actions
- Integrate with existing `trackSlice` for syncing cube states

#### 1.3 Enhanced Track Synchronization

- Modify `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx`:
  - Listen to network sync events
  - Broadcast play/pause/seek events
  - Sync playback time across devices
- Update `src/components/musicalCube/TrackSlice.ts`:
  - Add network-aware actions
  - Handle remote state updates

### Phase 2: Local Network Discovery & QR Code Joining

#### 2.1 Host Mode

- Create host service that:
  - Starts local HTTP server (for serving audio files)
  - Starts WebSocket server on same port
  - Generates session ID and QR code
  - Manages participant connections
- Store: `src/services/host/` directory

**Files to create:**

- `src/services/host/HostService.ts` - Host mode management
- `src/services/host/QrCodeGenerator.ts` - QR code generation (use `qrcode.react` or similar)
- UI component: `src/components/network/HostPanel.tsx` - Host controls and QR display

#### 2.2 Client/Join Mode

- Create join service that:
  - Scans QR code (using camera API)
  - Connects to host's WebSocket server
  - Downloads session metadata (available tracks, cubes)
- UI component: `src/components/network/JoinPanel.tsx` - QR scanner and connection UI

#### 2.3 Network Status UI

- Create `src/components/network/NetworkStatus.tsx`:
  - Display connection status
  - Show participant count
  - Host/join mode toggle
- Integrate into `src/pages/realms/musicalCubes/MusicalCubesRealm.tsx`

### Phase 3: Recording System

#### 3.1 Audio Recording Infrastructure

- Implement browser MediaRecorder API wrapper
- Create `src/services/recording/AudioRecorder.ts`:
  - Start/stop recording
  - Export to WAV format
  - Preview recorded audio
- Handle permissions (microphone access)

#### 3.2 Recording UI

- Create `src/components/recording/RecordButton.tsx` - Record control UI
- Create `src/components/recording/RecordingPanel.tsx`:
  - Record controls (record/pause/stop)
  - Waveform preview
  - Save/name recording
  - Add to cube option
- Integrate into cube side UI or toolbar

#### 3.3 Audio Storage Management

- Extend `src/store/recordingSlice.ts`:
  - Store recorded samples metadata
  - Manage local storage (IndexedDB for audio blobs)
- Create `src/services/storage/AudioStorage.ts`:
  - Save/load audio files
  - Export audio files
  - Manage storage quota

### Phase 4: Sample & Cube Publishing

#### 4.1 Sample Publishing

- Create `src/services/publishing/SamplePublisher.ts`:
  - Package sample with metadata (name, duration, author, tags)
  - Generate shareable format (JSON + audio file)
- Create UI: `src/components/publishing/PublishSampleModal.tsx`:
  - Sample metadata form
  - Preview
  - Publish/share options

#### 4.2 Cube Publishing

- Extend cube data structure to include:
  - Metadata (name, description, author)
  - All sample references
  - Cube configuration (sounds array, cube type)
- Create `src/services/publishing/CubePublisher.ts`:
  - Export cube as package (JSON manifest + audio files)
  - Import cube package
- Create UI: `src/components/publishing/PublishCubeModal.tsx`

#### 4.3 Sharing Mechanisms

- **Local Network Sharing**: Share via WebSocket during active session
- **File Export/Import**: Download/upload cube packages
- **Future: Cloud Library**: REST API for publishing to central library

**Files to create:**

- `src/types/CubePackage.ts` - Cube package format definition
- `src/services/publishing/CubeExporter.ts` - Export cube to package
- `src/services/publishing/CubeImporter.ts` - Import cube from package

### Phase 5: Sample Library & Management

#### 5.1 Library Data Model

- Create `src/store/librarySlice.ts`:
  - User's sample library
  - Published cubes library
  - Favorites/bookmarks
- Create `src/types/LibraryItem.ts` - Library item interfaces

#### 5.2 Library UI

- Create `src/components/library/LibraryPanel.tsx`:
  - Browse samples
  - Browse cubes
  - Search/filter
  - Preview samples
- Create `src/components/library/SamplePicker.tsx`:
  - Select sample to add to cube
  - Filter by type/category
- Update `src/pages/realms/musicalCubes/tracks.ts` to support dynamic tracks

#### 5.3 Cube Builder UI

- Enhance cube creation:
  - Drag-and-drop samples onto cube sides
  - Replace existing cube sides with new samples
  - Create custom cubes from library samples
- Create `src/components/cubeBuilder/CubeBuilder.tsx`

### Phase 6: UI/UX Enhancements

#### 6.1 Collaboration Indicators

- Show which participant is controlling which cube
- Visual indicators for remote actions (cube flips, plays)
- Participant avatars/names

#### 6.2 Audio File Serving

- Host needs to serve audio files to connected clients
- Create audio file proxy/streaming service
- Handle CORS for cross-origin requests

#### 6.3 Offline Support

- Ensure recorded samples work offline
- Cache published cubes locally
- Sync when connection restored

## Technical Considerations

### Dependencies to Add

- `socket.io-client` or `ws` - WebSocket client
- `socket.io` or `ws` - WebSocket server (for host mode, may need separate build)
- `qrcode.react` or `react-qr-code` - QR code generation
- `qrcode-scanner` or `@capacitor/camera` - QR code scanning
- `mediarecorder-polyfill` - For older browser support
- `idb` or `localforage` - IndexedDB wrapper for audio storage

### File Structure

```
src/
  services/
    network/        # Network sync infrastructure
    host/           # Host mode services
    recording/      # Audio recording
    publishing/     # Sample/cube publishing
    storage/        # Audio storage management
  components/
    network/        # Network UI (host/join panels)
    recording/      # Recording UI
    publishing/     # Publishing UI
    library/        # Library browser
    cubeBuilder/    # Cube creation UI
  store/
    networkSlice.ts
    recordingSlice.ts
    librarySlice.ts
  types/
    CubePackage.ts
    LibraryItem.ts
    SyncProtocol.ts
```

### Key Challenges

1. **Audio Synchronization**: Low-latency sync across network (consider NTP-style time sync)
2. **File Transfer**: Efficiently sharing audio files (compression, chunking)
3. **Mobile Permissions**: Camera/microphone permissions on mobile devices
4. **Cross-platform**: Ensure works on iOS, Android, and web browsers
5. **Scalability**: Handle multiple participants without lag

## Implementation Order (Recommended)

1. **Start with Phase 1.1-1.2**: Basic network layer and Redux integration
2. **Phase 2.1-2.2**: Host/join functionality with QR codes
3. **Phase 1.3**: Wire up network sync to existing cubes
4. **Phase 3**: Recording system
5. **Phase 4**: Publishing system
6. **Phase 5**: Library management
7. **Phase 6**: Polish and UX improvements

This plan provides a foundation that can be expanded based on your architectural preferences (P2P, cloud storage, etc.).