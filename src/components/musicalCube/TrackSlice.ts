import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Track } from 'pages/realms/musicalCubes/tracks';
import { useDispatch } from 'react-redux';

export type SoundCube = {
    id: string;
    activeIndex: number;
    sounds: string[]
};

type AddSoundCubePayload = {
    cube: SoundCube;
}

type UpdateGlobalTimer = {
    time: number;
}

let timer: any = null;

export type TrackState = {
    name: string,
    sounds: string[],
    sharedTrackTime: number,
    vocalCubes: SoundCube[];
    melodyCubes: SoundCube[]
}

const initialState = {
    name: "",
    sharedTrackTime: 0,
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
        setSharedTrackTime: (state: TrackState, action: PayloadAction<UpdateGlobalTimer>): TrackState => ({
            ...state,
            sharedTrackTime: action.payload.time
        }),
        addVocalsCube: (state: TrackState, action: PayloadAction<AddSoundCubePayload>): TrackState =>
        ({
            ...state,
            vocalCubes: state.vocalCubes.concat([action.payload.cube])
        }),
        addMelodyCube: (state: TrackState, action: PayloadAction<AddSoundCubePayload>): TrackState =>
        ({
            ...state,
            melodyCubes: state.melodyCubes.concat([action.payload.cube])
        })
    }
});

export default trackSlice.reducer;