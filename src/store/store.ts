import { configureStore } from '@reduxjs/toolkit';
import trackSlice from 'components/musicalCube/TrackSlice';

const soundsData: any = {};

export type AppState = {
  trackCubes: [];
};


export default configureStore({
  reducer: {
    track: trackSlice,
  }
});