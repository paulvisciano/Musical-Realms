import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type SoundCube = {
    id: string;
    activeIndex: number;
    sounds: string[]
};

type AddSoundCubePayload = {
    vocalCube: SoundCube;
}

type TrackState = {
    vocalCubes: SoundCube[];
    melodyCubes: SoundCube[]
}

export const trackSlice = createSlice({
    name: 'track',
    initialState: {
        vocalCubes: [],
        melodyCubes: []
    } as TrackState,
    reducers: {
        addVocalCube: (state: TrackState, action: PayloadAction<AddSoundCubePayload>): TrackState =>
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

export const { addVocalCube } = trackSlice.actions;

export default trackSlice.reducer;