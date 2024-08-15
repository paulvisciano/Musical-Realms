import { IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
import React, {
    useState
} from "react";
import CubeSideToolbar from '../toolbar/Toolbar';
import "./CubeSide.css";
import { Size } from '../interfaces/Size';
import WaveSurferInstance from '../waveSurferInstance/WaveSurferInstance';

interface SideOptions {
    id: string;
    size: Size;
    isActive: boolean;
    sound: string,
    enableLoop?: boolean;
    enableSync?: boolean;
    startGlobalTimeTracker: any;
    getSharedTrackTime: any;
};

export const CubeSide: React.FC<SideOptions> = ({ size, isActive, enableLoop = true, ...props }) => {
    let [loop, setLoop] = useState(enableLoop);
    let [loading, setLoading] = useState(true);
    let [showToolbar, setShowToolbar] = useState(false);

    return (
        <div className={`cube-side ${isActive ? 'active' : ''}`}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div style={{ height: size.height, width: size.width }}>
                            {loading && isActive && <IonSpinner className='loading-spinner' name={"lines-sharp-small"} duration={1800} />}

                            <WaveSurferInstance className={`${loading ? 'hide' : ''}`} showInstrument={isActive} size={size} loop={loop} setLoading={setLoading} setShowToolbar={setShowToolbar} {...props} />

                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>

            {showToolbar && <CubeSideToolbar loop={loop} setLoop={setLoop} enableLoop={enableLoop} />}
        </div>
    );
};
