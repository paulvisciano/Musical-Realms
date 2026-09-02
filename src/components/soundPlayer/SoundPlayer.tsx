import React, {
  useCallback,
  useRef,
} from "react";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { ChakraEnum } from "components/Chakra";
import "./SoundPlayer.css";

const R2_VOCALS = "https://pub-7236cb2f994c4bdeba84ae4920d69b30.r2.dev/sounds/vocals";
const justADreamVocal = `${R2_VOCALS}/justADream.wav`;
const noTomorrowVocal = `${R2_VOCALS}/noTomorrow.wav`;
const childPlayVocal = `${R2_VOCALS}/childplay_Am.wav`;
const chillVocal = `${R2_VOCALS}/chill_F.wav`;
const iAmHereVocal = `${R2_VOCALS}/iAmHere.wav`;
const iKnowNothing = `${R2_VOCALS}/iKnowNothing.wav`;
const frenchDm = `${R2_VOCALS}/french_Dm.wav`;
const frenchEm = `${R2_VOCALS}/french_Em.wav`;
import { nanoid } from "@reduxjs/toolkit";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

type SoundPlayerProps = {
  src: any,
  chakraName: ChakraEnum,
  icon?: InstrumentIcons,
  iconPosition?: IconPosition
}

export const AvailableVocals = {
  JustADream: justADreamVocal,
  NoTomorrow: noTomorrowVocal,
  ChildPlay: childPlayVocal,
  Chill: chillVocal,
  IAmHere: iAmHereVocal,
  IKnowNothing: iKnowNothing,
  FrenchDm: frenchDm,
  FrenchEm: frenchEm,
} as const;

export enum InstrumentIcons {
  Guitar = "guitar",
  Sax = "sax",
  GlockenSpiel = "glockenSpiel",
  Flute = "flute"
}

export enum IconPosition {
  Top = "top",
  Bottom = "bottom"
}

type PlayerColors = {
  waveColor: string,
  progressColor: string,
  cursorColor: string
}

//This can probably be moved somewhere else
const getColorsBasedOnChakraName = (chakra: ChakraEnum): PlayerColors => {
  switch (chakra) {
    case ChakraEnum.Heart:
      return { waveColor: "#388e3c", progressColor: "#1b5e20", cursorColor: "transparent" }
    case ChakraEnum.Solar:
      return { waveColor: "#fbc02d", progressColor: "#f57f17", cursorColor: "transparent" }
    case ChakraEnum.ThirdEye:
      return { waveColor: "#1976d2", progressColor: "#0d47a1", cursorColor: "transparent" }
    case ChakraEnum.Crown:
      return { waveColor: "#7b1fa2", progressColor: "#4a148c", cursorColor: "transparent" }
    case ChakraEnum.Sacral:
      return { waveColor: "#fb8c00", progressColor: "#e65100", cursorColor: "transparent" }
    case ChakraEnum.Throat:
      return { waveColor: "#1e88e5", progressColor: "#0d47a1", cursorColor: "transparent" }

    default:
      return { waveColor: "red", progressColor: "green", cursorColor: "transparent" }
  }
};

const SoundPlayer: React.FC<{ props: SoundPlayerProps }> = ({ props }) => {
  const wavesurferRef: any = useRef();
  const colors = getColorsBasedOnChakraName(props.chakraName);
  const waveFormUniqueId = `waveform-${nanoid()}`;

  const handleWSMount = useCallback(
    (waveSurfer: any) => {
      wavesurferRef.current = waveSurfer;

      if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(0.2);
        wavesurferRef.current.load(props.src);
        wavesurferRef.current.on("click", () => {
          wavesurferRef.current.play();
        });
      }
    },
    []
  );

  const playPause = () => {
    wavesurferRef?.current?.playPause();
  }

  return (
    <div className={`soundPlayer-container`}>

    <IonGrid>
      {props.icon && props.iconPosition && props.iconPosition === IconPosition.Top &&
        <IonRow>
          <IonCol>
            <div className={`soundPlayer-icon ${props.icon}`} onClick={playPause} />
          </IonCol>
        </IonRow>
        }

      <IonRow>
        <IonCol>
            <WaveSurfer
              height={60}
              width={300}
              barWidth={3}
              onMount={handleWSMount}
              container={`#${waveFormUniqueId}`}
              {...colors}>

              <WaveForm id={waveFormUniqueId} />

            </WaveSurfer>
        </IonCol>
      </IonRow>

      {props.icon && props.iconPosition && props.iconPosition === IconPosition.Bottom &&
        <IonRow>
          <IonCol>
            <div className={`soundPlayer-icon ${props.icon}`} onClick={playPause} />
          </IonCol>
        </IonRow>}
    </IonGrid>
    </div>
  );
}

export default SoundPlayer;