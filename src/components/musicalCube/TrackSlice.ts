import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Track } from 'pages/realms/musicalCubes/tracks';

export type SoundCube = {
    id: string;
    activeIndex: number;
    sounds: string[]
};

type AddSoundCubePayload = {
    vocalCube: SoundCube;
}

export type TrackState = {
    name: string,
    sounds: string[],
    vocalCubes: SoundCube[];
    melodyCubes: SoundCube[]
}

const initialState = {
    name: "",
    sounds: [],
    vocalCubes: [],
    melodyCubes: []
} as TrackState;

export const trackSlice = createSlice({
    name: 'track',
    initialState: initialState,

    reducers: {
        init: (state: TrackState, action: PayloadAction<Track>): TrackState =>
        ({
            ...state,
            ...action.payload
        }),
        resetState: () => initialState,
        addVocalsCube: (state: TrackState, action: PayloadAction<AddSoundCubePayload>): TrackState =>
        ({
            ...state,
            vocalCubes: state.vocalCubes.concat([action.payload.vocalCube])
        }),
        addMelodyCube: (state: TrackState, action: PayloadAction<AddSoundCubePayload>): TrackState =>
        ({
            ...state,
            melodyCubes: state.melodyCubes.concat([action.payload.vocalCube])
        })
    }
});

// export const { addVocalCube, addMelodyCube } = trackSlice.actions;

export default trackSlice.reducer;