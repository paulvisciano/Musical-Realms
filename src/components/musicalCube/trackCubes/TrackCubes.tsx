import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { Track } from "pages/realms/musicalCubes/tracks";

import MusicalCube, { CubeType } from "../musicalCube/MusicalCube";

import { useDispatch } from "react-redux";
import { trackSlice } from "../TrackSlice";
import { useCallback } from "react";

import "./TrackCubes.css";

const TrackCubes: React.FC<{ track: Track }> = ({ track }) => {
    const dispatch = useDispatch();

    let existingInterval: any = null;
    let oneShotSounds = track.sounds.filter((path: string) => path.indexOf('\/one_shots') != -1);
    let melodySounds = track.sounds.filter((path: string) => path.indexOf('\/melody') != -1);

    let setGlobalTimer = (time: number) => trackSlice.actions.setSharedTrackTime({ time });

    const startGlobalTimeTracker = useCallback((getCurrentTrackTime: () => number) => {
        existingInterval = setInterval(() => {
            const newTrackTime = getCurrentTrackTime();

            if (newTrackTime !== 0) {
                dispatch(setGlobalTimer(newTrackTime));
            }

            //This stops the interval when you switch tracks
            if (newTrackTime == 0)
                clearInterval(existingInterval)
        }, 500);
    }, []);

    return (
        <IonGrid key={track.name}>
            {oneShotSounds.length > 0 && (
                <IonRow className="one-shot-cube-container">
                    <IonCol>
                        <MusicalCube id="vocalsCube" type={CubeType.Vocals} size={{ height: 200, width: 200 }} sounds={oneShotSounds} startGlobalTimeTracker={startGlobalTimeTracker} />
                    </IonCol>
                </IonRow>)}

            {melodySounds.length > 0 && (
                <IonRow className={`ion-align-items-center melody-cube-container ${oneShotSounds.length == 0 ? 'only-melody-cube' : ''}`}>
                    <IonCol>
                        <MusicalCube id="melodyCube" type={CubeType.Melody} size={{ height: 280, width: 280 }} sounds={melodySounds} startGlobalTimeTracker={startGlobalTimeTracker} />
                    </IonCol>
                </IonRow>
            )}
        </IonGrid>
    )
}

export default TrackCubes;