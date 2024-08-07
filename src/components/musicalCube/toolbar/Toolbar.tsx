import { IonGrid, IonIcon, IonRow } from "@ionic/react";

import loopEnabledIcon from 'assets/icons/loop-enabled.svg';
import loopDisabledIcon from 'assets/icons/loop-disabled.svg';

import './Toolbar.css'

const CubeSideToolbar: React.FC<{ enableLoop: boolean, loop: boolean, setLoop: (val: boolean) => void, }> = ({ enableLoop, loop, setLoop }) => {
    return (<div className="cube-side-toolbar">
        <IonGrid>
            {enableLoop &&
                <IonRow>
                    {loop ? <IonIcon className="loop-enabled" icon={loopEnabledIcon} onClick={() => setLoop(false)} /> : <IonIcon icon={loopDisabledIcon} onClick={() => setLoop(true)} />}
                </IonRow>
            }
        </IonGrid>
    </div>);
}

export default CubeSideToolbar;