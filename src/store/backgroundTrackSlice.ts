import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Meta = {
  sound: any;
}

type BackgroundTrack = {
  soundKey: string;
  volume: number;
}

type StopPayload = {
  soundKey: string;
}

export type BackgroundTrackState = {
  tracks: BackgroundTrack[];
}

export const backgroundTrackSlice = createSlice({
  name: 'backgroundTrack',
  initialState: {
    tracks: [] as BackgroundTrack[]
  },
  reducers: {
    addTrack: {
      reducer: (state: BackgroundTrackState, action: PayloadAction<BackgroundTrack /*payload*/, string /*type*/, Meta/*meta*/>) => {
        state.tracks.push(action.payload);

        return state;
      },
      prepare: (payload: BackgroundTrack, meta: Meta) => ({ payload, meta })
    },
    play: {
      reducer: (state: BackgroundTrackState, action: PayloadAction<BackgroundTrack /*payload*/, string /*type*/, Meta/*meta*/>) => state,
      prepare: (payload: any, meta: Meta) => ({ payload, meta })
    },
    stop: {
      reducer: (state: BackgroundTrackState, action: PayloadAction<StopPayload /*payload*/, string /*type*/, Meta/*meta*/>) => {
        state.tracks = state.tracks.filter(track => track.soundKey !== action.payload.soundKey);

        return state;
      },
      prepare: (payload: StopPayload, meta: Meta) => ({ payload, meta })
    },
    changeVolume: {
      reducer: (state: BackgroundTrackState, action: PayloadAction<BackgroundTrack /*payload*/, string /*type*/, Meta/*meta*/>) => {
        let newTracks = state.tracks.map(track => {
          if (track.soundKey === action.payload.soundKey) {
            let newTrack = { ...track, volume: action.payload.volume };

            return newTrack;
          }

          return track;
        });

        state.tracks = newTracks;

        return state;
      },
      prepare: (payload: BackgroundTrack, meta: Meta) => ({ payload, meta })
    }
  }
});

export const { addTrack, play, stop, changeVolume } = backgroundTrackSlice.actions;