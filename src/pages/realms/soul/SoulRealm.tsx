import { Chakra, ChakraEnum, ChakraInterface } from "components/Chakra";
import ChakraPlayer from "components/chakraPlayer/ChakraPlayer";
import SoundPlayer, { AvailableVocals, IconPosition, InstrumentIcons } from "components/soundPlayer/SoundPlayer";
import { PositionEnum } from "positions/PositionsEnum";
import { EffectCube, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperType } from 'swiper/types';
import "./SoulRealm.css";
import { SoulVocals } from "./vocals/SoulVocals";
import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";

const R2_SOUL = "https://pub-7236cb2f994c4bdeba84ae4920d69b30.r2.dev/sounds/instruments/soul";
const flute = `${R2_SOUL}/130_flute_Dmin.wav`;
const glockenSpiel = `${R2_SOUL}/130_glockenspiel_Dmin.wav`;
const sax = `${R2_SOUL}/130_sax_stabs_Dmin.wav`;
const cleanGuitar = `${R2_SOUL}/130_guitar_clean.wav`;
const distortedGuitar = `${R2_SOUL}/130_guitar_distorted_Dmin.wav`;
const leadGuitar = `${R2_SOUL}/130_guitar_lead_Dmin.wav`;

const SoulRealm: React.FC = () => {
  let crownChakra = new Chakra(ChakraEnum.Crown);

  crownChakra.position = PositionEnum.None;

  let topSoundPlayersProps = {  iconPosition: IconPosition.Bottom, chakraName: crownChakra.name };
  let bottomSoundPlayersProps = { icon: InstrumentIcons.Guitar, iconPosition: IconPosition.Top, chakraName: crownChakra.name };

  return (<>
    <Swiper
      className='soul-swiper'
      loop={true}
      navigation={true}

      pagination={{
        clickable: true,

      }}
      onSwiper={(swiper: SwiperType) => {
        console.log('Force refresh');
        setTimeout(() => {
          swiper.update();
        });
      }}
      modules={[EffectCube, Navigation, Pagination]}
    >

      <SwiperSlide className="throat-slide">

        <IonGrid className="header-vocal-player">
          <IonRow>
            <IonCol>
              <SoundPlayer props={{src : sax, icon: InstrumentIcons.Sax, ...topSoundPlayersProps}} />
            </IonCol>
            <IonCol>
              <SoundPlayer props={{ src : flute, icon : InstrumentIcons.Flute, ...topSoundPlayersProps }} />
            </IonCol>
            <IonCol>
              <SoundPlayer props={{ src: glockenSpiel, icon : InstrumentIcons.GlockenSpiel, ...topSoundPlayersProps }} />
            </IonCol>
          </IonRow>
        </IonGrid>

        <ChakraPlayer key={`${crownChakra.name}_${crownChakra.note}`} vocals={SoulVocals.SouldDm} chakra={crownChakra} />

        <IonGrid className="footer-vocal-player">
          <IonRow>
            <IonCol>
              <SoundPlayer props={{ src: cleanGuitar, ...bottomSoundPlayersProps }} />
            </IonCol>
            <IonCol>
              <SoundPlayer props={{ src: distortedGuitar, ...bottomSoundPlayersProps }} />
            </IonCol>
            <IonCol>
              <SoundPlayer props={{ src: leadGuitar, ...bottomSoundPlayersProps }} />
            </IonCol>

          </IonRow>
        </IonGrid>
      </SwiperSlide>
    </Swiper>

  </>)
}

export default SoulRealm;