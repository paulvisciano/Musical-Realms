import { IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import CubeSideToolbar from '../toolbar/Toolbar';
import "./CubeSide.css";
import { Size } from '../interfaces/Size';
import InstumentIcon from '../InstrumentIcon/InstrumentIcon';

interface SideOptions {
    id: string;
    size: Size;
    sound?: any,
    enableLoop?: boolean;
    enableSync?: boolean;
    setSharedTrackTime: any;
    getSharedTrackTime: any;
};

export const CubeSide: React.FC<SideOptions> = ({ id, size, enableLoop = true, enableSync = true, sound, ...props }) => {
    //Each waveform needs to have a unique id
    const waveFormUniqueId = `waveform-${id}`;
    const wavesurferRef: any = useRef();

    let [loop, setLoop] = useState(enableLoop);
    let [showToolbar, setShowToolbar] = useState(false);
    let [isPlaying, setIsPlaying] = useState(false);

    const handleWSMount = useCallback(
        (waveSurfer: any) => {
            wavesurferRef.current = waveSurfer;
            wavesurferRef.current?.load(`${process.env.PUBLIC_URL}${sound}`);
        }, [sound]);

    const onClick = () => {
        setShowToolbar(true);

        enableSync ? triggerSync() : playFromBeginning();
    }

    useEffect(() => {
        const unsubClick = wavesurferRef.current.on("click", onClick);

        const unsubFinish = wavesurferRef.current.on("finish", () => {
            if (loop) {
                wavesurferRef.current.seekTo(0);
                wavesurferRef.current.play();
                setIsPlaying(true);
            }
        });

        return () => {
            unsubClick();
            unsubFinish();
        };
    }, [loop])

    const playPause = () => {
        wavesurferRef?.current?.playPause();

        setIsPlaying(wavesurferRef?.current?.isPlaying());
    }

    const triggerSync = () => {
        console.log('Triggering sync for', sound);
        const sharedPosition = props.getSharedTrackTime();

        if (sharedPosition) {
            wavesurferRef.current.setTime(sharedPosition);
            wavesurferRef.current.play();
            setIsPlaying(true);
        }
        else {
            wavesurferRef.current.seekTo(0);

            setInterval(() => {
                const trackPosition = wavesurferRef.current.getCurrentTime();

                props.setSharedTrackTime(trackPosition);
            }, 10);

            wavesurferRef.current.play();
            setIsPlaying(true);
        }
    }

    const playFromBeginning = () => {
        console.log('Playing ', sound);
        wavesurferRef.current.seekTo(0);
        wavesurferRef.current.play();
        setIsPlaying(true);
    }

    return (
        <div className={`cube-side`}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div className='wavesurfer-custom-wrapper'>
                            {sound &&
                                <WaveSurfer
                                    height={size.height - 4}
                                    width={size.width - 4}
                                    barWidth={0.5}

                                    //TODO: Get these colors from colors.css
                                    //TODO : Pass them in as params
                                    waveColor={[
                                        "#1976d2",
                                        "#2196f3",
                                        "#1976d2",
                                    ]}
                                    progressColor={[
                                        "#0d47a1",
                                    ]}
                                    dragToSeek={false}
                                    onMount={handleWSMount}
                                    container={`#${waveFormUniqueId}`}
                                >
                                    <WaveForm id={waveFormUniqueId} />
                                </WaveSurfer>
                            }

                            <InstumentIcon sound={sound} onClick={onClick} />
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>

            {showToolbar && <CubeSideToolbar isPlaying={isPlaying} playPause={playPause} loop={loop} setLoop={setLoop} enableLoop={enableLoop} triggerSync={triggerSync} />}
        </div>
    );
};
