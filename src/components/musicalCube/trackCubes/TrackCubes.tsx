import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { Track } from "pages/realms/musicalCubes/tracks";

import MusicalCube, { CubeType } from "../musicalCube/MusicalCube";

import "./TrackCubes.css";
import { nanoid } from "@reduxjs/toolkit";

const TrackCubes: React.FC<{ track: Track }> = ({ track }) => {
    let sharedTrackTime = 0;
    let existingInterval: any = null;

    let startGlobalTimeTracker = (getCurrentTrackTime: () => number) => {
        existingInterval = setInterval(() => {
            const newTrackTime = getCurrentTrackTime();

            sharedTrackTime = newTrackTime;

            //This stops the interval when you switch tracks
            if (newTrackTime == 0)
                clearInterval(existingInterval)
        }, 100);
    };
    const getSharedTrackTime = () => sharedTrackTime;

    let oneShotSounds = track.sounds.filter((path: string) => path.indexOf('\/one_shots') != -1);
    let melodySounds = track.sounds.filter((path: string) => path.indexOf('\/melody') != -1);

    return (
        <IonGrid key={track.name}>
            {oneShotSounds.length > 0 && (
                <IonRow className="one-shot-cube-container">
                    <IonCol>
                        <MusicalCube id={nanoid()} type={CubeType.Vocals} size={{ height: 200, width: 200 }} sounds={oneShotSounds} startGlobalTimeTracker={startGlobalTimeTracker} getSharedTrackTime={getSharedTrackTime} />
                    </IonCol>
                </IonRow>)}

            {melodySounds.length > 0 && (
                <IonRow className={`ion-align-items-center melody-cube-container ${oneShotSounds.length == 0 ? 'only-melody-cube' : ''}`}>
                    <IonCol>
                        <MusicalCube id={nanoid()} type={CubeType.Melody} size={{ height: 280, width: 280 }} sounds={melodySounds} startGlobalTimeTracker={startGlobalTimeTracker} getSharedTrackTime={getSharedTrackTime} />
                    </IonCol>
                </IonRow>
            )}
        </IonGrid>
    )
}

export default TrackCubes;