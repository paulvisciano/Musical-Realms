import { configureStore } from '@reduxjs/toolkit';
import soundsMiddleware from 'redux-sounds';
import instrumentReducer from './instrumentSlice';
import trackReducer, { TrackState } from 'components/musicalCube/TrackSlice';
import { MetalSingingBowl } from 'instruments/MetalSingingBowl';

const soundsData: any = {};

const registerInstumentSounds = (soundsData: any) => {
  let singingBowl = new MetalSingingBowl();

  singingBowl.registerSounds(soundsData);
}

registerInstumentSounds(soundsData);

const loadedSoundsMiddleware = soundsMiddleware(soundsData);

export type AppState = {
  instrument: any;
  track: TrackState;
};

const store = configureStore({
  reducer: {
    instrument: instrumentReducer,
    track: trackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(loadedSoundsMiddleware),
});

// Expose store to window for testing in browser console
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  (window as any).__REDUX_STORE__ = store;
}

// Export named export for use in components
export { store };
export default store;