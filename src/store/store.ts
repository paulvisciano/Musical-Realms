import { configureStore } from '@reduxjs/toolkit';
import trackSlice, { TrackState } from 'components/musicalCube/TrackSlice';

export type AppState = {
  track: TrackState;
};

export default configureStore({
  reducer: {
    track: trackSlice,
  }
});