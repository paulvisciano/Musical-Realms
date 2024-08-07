import { configureStore } from '@reduxjs/toolkit';
import soundsMiddleware from 'redux-sounds';
import instrumentReducer from './instrumentSlice';
import backgroundTrackReducer, { BackgroundTrackState } from './backgroundTrackSlice';
import { MetalSingingBowl } from 'instruments/MetalSingingBowl';

const soundsData: any = {};

export type AppState = {
  sheetMusic: any;
  backgroundTrack: BackgroundTrackState;
};

const registerInstumentSounds = (soundsData: any) => {
  let singingBowl = new MetalSingingBowl();

  singingBowl.registerSounds(soundsData);
}

//TODO: Add back when adding the other realms
// registerInstumentSounds(soundsData);

const loadedSoundsMiddleware = soundsMiddleware(soundsData);

export default configureStore({
  reducer: {
    instrument: instrumentReducer,
    backgroundTrack: backgroundTrackReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(loadedSoundsMiddleware),
});