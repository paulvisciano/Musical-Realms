---
name: Fix Cube Synchronization Bug
overview: "Fix synchronization issues where samples across cube sides and between different cubes are not properly syncing. The current implementation has multiple problems: active cube sides aren't tracked, multiple timers conflict, reactive syncing is missing, and cube state updates aren't properly dispatched."
todos:
  - id: track-active-index-redux
    content: Add updateCubeActiveIndex reducer action to TrackSlice and implement activeIndex tracking in Redux state
    status: completed
  - id: dispatch-active-index
    content: Implement activeIndex dispatch in MusicalCube.tsx onSlideChangeTransitionEnd when cube is flipped
    status: completed
    dependencies:
      - track-active-index-redux
  - id: centralize-timer
    content: Refactor TrackCubes.tsx to use singleton timer pattern - only one master timer, prevent duplicate intervals
    status: completed
  - id: add-master-timer-state
    content: Add isMasterTimerActive flag to TrackSlice to track timer state and prevent conflicts
    status: completed
    dependencies:
      - centralize-timer
  - id: reactive-sync-effect
    content: Add useEffect in WaveSurferInstance that watches sharedTrackTime and continuously syncs playing cubes
    status: completed
    dependencies:
      - centralize-timer
  - id: read-active-index-cubside
    content: Modify CubeSide.tsx to read activeIndex from Redux state instead of hardcoding, pass isActiveSide prop
    status: completed
    dependencies:
      - track-active-index-redux
  - id: handle-active-side-sync
    content: Update WaveSurferInstance to only sync when isActiveSide is true, sync immediately when side becomes active
    status: completed
    dependencies:
      - read-active-index-cubside
      - reactive-sync-effect
  - id: global-play-state
    content: Add isPlaying boolean to TrackSlice for global play/pause state, update all cubes to respect this state
    status: completed
  - id: fix-duration-sync
    content: Implement modulo-based sync for different track durations and proper looping synchronization
    status: completed
    dependencies:
      - reactive-sync-effect
  - id: test-sync-scenarios
    content: "Test all sync scenarios: single cube sides, multi-cube sync, play/pause, cube flips during play, different durations"
    status: completed
    dependencies:
      - handle-active-side-sync
      - global-play-state
      - fix-duration-sync
---

# Fix Cube Synchronization Bug

## Problem Analysis

After reviewing the codebase, several synchronization issues have been identified:

### Current Issues

1. **Active Index Not Tracked**: 

   - `CubeSide.tsx` hardcodes `activeIndex = 0` (line 23)
   - `MusicalCube.tsx` logs the real index in `onSlideChangeTransitionEnd` but never dispatches it to Redux
   - Cube sides don't know which side is currently active, so they all think they're active

2. **Multiple Conflicting Timers**:

   - Each cube can call `startGlobalTimeTracker`, creating multiple intervals
   - `TrackCubes.tsx` creates a callback that's passed to both cubes, but each cube independently calls it
   - No mechanism to prevent duplicate timers or ensure only one master timer exists

3. **No Reactive Synchronization**:

   - `WaveSurferInstance` reads `sharedTrackTime` from Redux but doesn't react to changes
   - Sync only happens on click (`triggerSync()`), not continuously
   - Playing cubes don't stay in sync as time progresses

4. **Percentage-Based Sync Issues**:

   - `triggerSync()` uses `sharedTrackTime / trackDuration` which works for same-duration tracks
   - Different cube sides may have different durations, causing drift
   - No handling for tracks that have already finished or reset

5. **Cube State Not Updated**:

   - When a cube is flipped, the `activeIndex` in Redux state never updates
   - Newly visible sides don't know about current playback state
   - Commented out code suggests this was planned but never implemented (line 70 in `MusicalCube.tsx`)

## Solution Overview

Implement a centralized synchronization system with:

- Single master timer that all cubes sync to
- Active index tracking in Redux state
- Reactive sync that continuously keeps playing cubes aligned
- Proper handling of cube side changes
- Duration-aware syncing for different track lengths

## Implementation Plan

### Phase 1: Track Active Cube Sides in Redux

**Files to modify:**

- `src/components/musicalCube/TrackSlice.ts`

**Changes:**

1. Add reducer action `updateCubeActiveIndex` to update the active side index when cube is flipped
2. Ensure cube state is properly initialized with activeIndex = 0
3. Add action to mark which cube side is currently visible/active

**Files to modify:**

- `src/components/musicalCube/musicalCube/MusicalCube.tsx`

**Changes:**

1. Dispatch `updateCubeActiveIndex` in `onSlideChangeTransitionEnd` callback
2. Update Redux state when cube is flipped to track current active side
3. Remove commented-out code and implement the activeIndex update

### Phase 2: Centralize Timer Management

**Files to modify:**

- `src/components/musicalCube/TrackSlice.ts`

**Changes:**

1. Add `isMasterTimerActive` flag to track if timer is running
2. Ensure only one timer instance exists globally
3. Add action to start/stop master timer

**Files to modify:**

- `src/components/musicalCube/trackCubes/TrackCubes.tsx`

**Changes:**

1. Refactor `startGlobalTimeTracker` to be a singleton - only start if not already running
2. Store timer reference at module level or in a ref to prevent duplicates
3. Clean up timer when component unmounts or track changes
4. Use the master cube (first playing cube) as the time source

**Files to modify:**

- `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx`

**Changes:**

1. Only the first playing cube should call `startGlobalTimeTracker`
2. Other cubes should just listen to `sharedTrackTime` updates

### Phase 3: Implement Reactive Synchronization

**Files to modify:**

- `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx`

**Changes:**

1. Add `useEffect` that watches `sharedTrackTime` and `isPlaying` state
2. When `sharedTrackTime` changes and cube is playing, update WaveSurfer seek position
3. Handle edge cases:

   - Track has finished (reset or loop)
   - Track duration is different from master
   - User manually pauses (shouldn't override)

4. Use requestAnimationFrame or a small interval for smoother sync updates

**Key implementation:**

```typescript
useEffect(() => {
  if (!wavesurferRef.current || !isPlaying) return;
  
  const currentTime = wavesurferRef.current.getCurrentTime();
  const duration = wavesurferRef.current.getDuration();
  const expectedTime = sharedTrackTime % duration; // Handle looping
  
  // Only sync if difference is significant (>100ms) to avoid jitter
  if (Math.abs(currentTime - expectedTime) > 0.1) {
    wavesurferRef.current.seekTo(expectedTime / duration);
  }
}, [sharedTrackTime, isPlaying]);
```

### Phase 4: Handle Cube Side Changes

**Files to modify:**

- `src/components/musicalCube/cubeSide/CubeSide.tsx`

**Changes:**

1. Get active index from Redux state instead of hardcoding
2. Use `useSelector` to read the cube's current activeIndex
3. Only show as active if `index === activeIndex` from Redux
4. Pass active state to WaveSurferInstance so inactive sides don't sync

**Files to modify:**

- `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx`

**Changes:**

1. Accept `isActiveSide` prop to know if this side is currently visible
2. Only sync if `isActiveSide === true`
3. When side becomes active, sync to current `sharedTrackTime` if cube is playing

### Phase 5: Fix Initial Sync and Play State

**Files to modify:**

- `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx`

**Changes:**

1. When `triggerSync()` is called, also update Redux with playing state
2. Ensure all cubes start at the same time when first played
3. Handle the case where a cube is flipped while another is playing - new side should sync immediately
4. Store playing state in Redux so all cubes know the global play/pause state

**Files to modify:**

- `src/components/musicalCube/TrackSlice.ts`

**Changes:**

1. Add `isPlaying` boolean to track global play state
2. Add actions `setGlobalPlayState` and `setGlobalPauseState`
3. All cubes should respect this global state

### Phase 6: Handle Different Track Durations

**Files to modify:**

- `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx`

**Changes:**

1. Store track duration in component state
2. When syncing, use modulo operation to handle looping: `sharedTrackTime % duration`
3. For different durations, use beat/time position rather than percentage
4. Consider using BPM or beat position if tracks have different lengths but same tempo

## Testing Strategy

1. **Single Cube Sync**: Verify all sides of one cube stay in sync when flipped
2. **Multi-Cube Sync**: Verify melody and vocals cubes sync together
3. **Play/Pause Sync**: All cubes should play/pause together
4. **Cube Flip During Play**: Flipping cube while playing should sync new side immediately
5. **Different Durations**: Test with tracks of different lengths to ensure they loop in sync
6. **Edge Cases**: Handle rapid clicks, multiple rapid flips, and component unmounting

## Key Files to Modify

1. `src/components/musicalCube/TrackSlice.ts` - Add activeIndex updates, master timer state, global play state
2. `src/components/musicalCube/musicalCube/MusicalCube.tsx` - Dispatch activeIndex updates on flip
3. `src/components/musicalCube/cubeSide/CubeSide.tsx` - Read activeIndex from Redux
4. `src/components/musicalCube/waveSurferInstance/WaveSurferInstance.tsx` - Add reactive sync, handle active side prop
5. `src/components/musicalCube/trackCubes/TrackCubes.tsx` - Centralize timer management

## Implementation Order

1. **Phase 1** - Track active indices (foundation)
2. **Phase 2** - Centralize timer (prevent conflicts)
3. **Phase 3** - Reactive sync (core fix)
4. **Phase 4** - Handle side changes (complete the flow)
5. **Phase 5** - Global play state (polish)
6. **Phase 6** - Duration handling (edge cases)

This plan fixes the core synchronization bugs while maintaining backward compatibility with the existing architecture.