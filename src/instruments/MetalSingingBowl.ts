const R2_BASE = "https://pub-7236cb2f994c4bdeba84ae4920d69b30.r2.dev/sounds/bowls";
const bowlAStrike = `${R2_BASE}/Bowl_A_Strike.wav`;
const bowlBStrike = `${R2_BASE}/Bowl_B_Strike.wav`;
const bowlCStrike = `${R2_BASE}/Bowl_C_Strike.wav`;
const bowlDStrike = `${R2_BASE}/Bowl_D_Strike.wav`;
const bowlEStrike = `${R2_BASE}/Bowl_E_Strike.wav`;
const bowlFStrike = `${R2_BASE}/Bowl_F_Strike.wav`;
const bowlGStrike = `${R2_BASE}/Bowl_G_Strike.wav`;
const bowlAGlide = `${R2_BASE}/Bowl_A_Glide.wav`;
const bowlBGlide = `${R2_BASE}/Bowl_B_Glide.wav`;
const bowlCGlide = `${R2_BASE}/Bowl_C_Glide.wav`;
const bowlDGlide = `${R2_BASE}/Bowl_D_Glide.wav`;
const bowlEGlide = `${R2_BASE}/Bowl_E_Glide.wav`;
const bowlFGlide = `${R2_BASE}/Bowl_F_Glide.wav`;
const bowlGGlide = `${R2_BASE}/Bowl_G_Glide.wav`;

import { NoteEnum } from "../sounds/NoteEnum";
import { InstumentInterface } from "./InstrumentInterface";
import { InstrumentName } from "./InstrumentName";
import { instumentSlice } from "store/instrumentSlice";

enum SoundBowlGestureEnum {
    Strike = "strike",
    Glide = "glide"
}

export class MetalSingingBowl implements InstumentInterface {
    name = InstrumentName.TibetanMetalSingingBowl;
    readonly VOLUME = 0.07;

    strike = (note: NoteEnum) => {
        let soundKey = this.getSoundKey(SoundBowlGestureEnum.Strike, note);

        return instumentSlice.actions.play({ instrument: this.name }, { sound: { play: soundKey } })
    }

    glide = (note: NoteEnum) => {
        let soundKey = this.getSoundKey(SoundBowlGestureEnum.Glide, note);

        return instumentSlice.actions.play({ instrument: this.name }, { sound: { play: soundKey } })
    }

    stopGlide = (note : NoteEnum) => {
        let soundKey = this.getSoundKey(SoundBowlGestureEnum.Glide, note);

        return instumentSlice.actions.stop({ instrument: this.name }, { sound: { stop: soundKey } })
    }

    registerSounds = (soundsData: any) => {
        Object.values(SoundBowlGestureEnum).map(gesture => {
            Object.values(NoteEnum).map(note => {
                soundsData[this.getSoundKey(gesture, note)] = { src : [this.getSoundPath(note, gesture)], volume : this.VOLUME };
            });
        })
    };

    private getSoundKey = (gesture: SoundBowlGestureEnum, note: NoteEnum) => `${gesture}${note.toUpperCase()}`;

    private getSoundPath = (note: NoteEnum, gesture: SoundBowlGestureEnum) => {
        let soundPath;

        switch (note) {
            case NoteEnum.A:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlAStrike : bowlAGlide;
                break;
            case NoteEnum.B:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlBStrike : bowlBGlide;
                break;
            case NoteEnum.C:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlCStrike : bowlCGlide;
                break;
            case NoteEnum.D:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlDStrike : bowlDGlide;
                break;
            case NoteEnum.E:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlEStrike : bowlEGlide;
                break;
            case NoteEnum.F:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlFStrike : bowlFGlide;
                break;
            case NoteEnum.G:
                soundPath = gesture === SoundBowlGestureEnum.Strike ? bowlGStrike : bowlGGlide;
                break;
            default:
                soundPath = null;
                break;
        }

        return soundPath;
    };
}