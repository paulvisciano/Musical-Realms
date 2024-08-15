import { useCallback, useEffect, useRef, useState } from "react";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { Size } from "../interfaces/Size";

import InstumentIcon from "../InstrumentIcon/InstrumentIcon";

import "./WaveSurferInstance.css";

const WaveSurferInstance: React.FC<{ id: string, className: string, size: Size, sound: any, enableSync?: boolean, showInstrument: boolean, loop: boolean, setLoading: (val: boolean) => void, setShowToolbar: (val: boolean) => void, getSharedTrackTime: () => number, startGlobalTimeTracker: (getTrackTime: () => number) => void }> = ({ id, className, size, sound, enableSync, showInstrument, loop, setLoading, setShowToolbar, getSharedTrackTime, startGlobalTimeTracker }) => {
    //Each waveform needs to have a unique id
    const waveFormUniqueId = `waveform-${id}`;
    const wavesurferRef: any = useRef();

    let [isPlaying, setIsPlaying] = useState(false);

    const handleWSMount = useCallback(
        (waveSurfer: any) => {
            wavesurferRef.current = waveSurfer;
            wavesurferRef.current?.load(`${process.env.PUBLIC_URL}${sound}`);
        }, [sound]);

    const onClick = (playing: boolean) => {
        setShowToolbar(true);

        if (!enableSync)
            playFromBeginning();
        else if (playing) {
            playPause();
        }
        else {
            triggerSync();
        }
    }

    useEffect(() => {
        if (!wavesurferRef || !wavesurferRef.current)
            return;

        const unsubReady = wavesurferRef.current.on("ready", () => {
            setTimeout(() => {
                setLoading(false)
            }, 5000)
        }
        );

        const unsubClick = wavesurferRef.current.on("click", () => onClick(isPlaying));

        const unsubFinish = wavesurferRef.current.on("finish", () => {
            if (loop) {
                wavesurferRef.current.seekTo(0);
                wavesurferRef.current.play();
                setIsPlaying(true);
                return;
            }

            setIsPlaying(false);
        });

        return () => {
            unsubClick();
            unsubFinish();
            unsubReady();
        };
    }, [loop, isPlaying])

    const playPause = () => {
        wavesurferRef?.current?.playPause();

        setIsPlaying(wavesurferRef?.current?.isPlaying());
    }

    const triggerSync = () => {
        const sharedTrackTime = getSharedTrackTime();

        if (sharedTrackTime) {
            wavesurferRef.current.setTime(sharedTrackTime);
            wavesurferRef.current.play();
            setIsPlaying(true);
        }
        else {
            wavesurferRef.current.seekTo(0);

            startGlobalTimeTracker(() => wavesurferRef.current.getCurrentTime());

            wavesurferRef.current.play();

            setIsPlaying(true);
        }
    }

    const playFromBeginning = () => {
        wavesurferRef.current.seekTo(0);
        wavesurferRef.current.play();

        setIsPlaying(true);
    }

    return (
        <div>
            <div className={`wavesurfer-custom-wrapper ${className}`} onClick={() => onClick(isPlaying)}>
                <WaveSurfer
                    height={size.height - 4}
                    width={size.width - 4}
                    barWidth={0.5}
                    interact={false}
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
            </div>

            {showInstrument && <InstumentIcon sound={sound} onClick={() => onClick(isPlaying)} />}
        </div>
    )
}

export default WaveSurferInstance;