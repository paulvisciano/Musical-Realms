import { Chakra, ChakraEnum, ChakraInterface } from "components/Chakra";
import ChakraPlayer from "components/chakraPlayer/ChakraPlayer";
import SoundPlayer, { AvailableVocals } from "components/soundPlayer/SoundPlayer";
import { PositionEnum } from "positions/PositionsEnum";
import { EffectCube, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperType } from 'swiper/types';
import "./AthmospheresDawdio.css";
import { AthmosphereVocals } from "./vocals/AthmosphereVocals";
import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";

const R2_ATHM = "https://pub-7236cb2f994c4bdeba84ae4920d69b30.r2.dev/sounds/instruments/athmospheresDawdio";
const celloLowGm = `${R2_ATHM}/Cello_Low_Gm.wav`;
const cello_Mid_High_Gm = `${R2_ATHM}/Cello_Mid_High_Gm.wav`;
const cello_Full_Gm = `${R2_ATHM}/Cello_Full_Gm.wav`;
const cello_Ensemble_Gm = `${R2_ATHM}/Cello_Ensemble_Gm.wav`;

const violinGm = `${R2_ATHM}/Violin_Gmin.wav`;

const piano_Peace_Gm = `${R2_ATHM}/Piano_Peace_Gm.wav`;
const piano_Uplifting_Gm = `${R2_ATHM}/Piano_Uplifting_Gm.wav`;
const piano_Main_Gm = `${R2_ATHM}/Piano_Main_Gm.wav`;

const AthmospheresDawdioRealm: React.FC = () => {

  let heartChakra = new Chakra(ChakraEnum.Heart);
  heartChakra.position = PositionEnum.None;

  let solarChakra = new Chakra(ChakraEnum.Solar);
  solarChakra.position = PositionEnum.None;

  let thirdEyeChakra = new Chakra(ChakraEnum.ThirdEye);
  thirdEyeChakra.position = PositionEnum.None;

  let throatChakra = new Chakra(ChakraEnum.Throat);
  throatChakra.position = PositionEnum.None;


  return (<>
    <Swiper
      className='athmosphere-swiper'
      effect={'cube'}
      grabCursor={true}
      loop={true}
      navigation={true}
      cubeEffect={{
        shadow: true,
        shadowOffset: 150,
        shadowScale: 0.6,
      }}
      pagination={{
        clickable: true,
      }}
      onInit={(swiper: SwiperType) => {
        //Force update to remove dark background from slide
        setTimeout(() => {
          swiper.update();
        });
      }}
      onSwiper={(swiper: SwiperType) => {
        //Force update to remove dark background from slide
        setTimeout(() => {
          swiper.update();
        });
      }}
      modules={[EffectCube, Navigation, Pagination]}
    >
      <SwiperSlide className="throat-slide">
        <IonGrid >
          <IonRow class="ion-align-items-center text-center">
            <IonCol size="3">
              <IonLabel >Strings</IonLabel>
              <SoundPlayer props={{ src: violinGm, chakraName: throatChakra.name }} />

              <SoundPlayer props={{ src: celloLowGm, chakraName: throatChakra.name }} />
              <SoundPlayer props={{ src: cello_Mid_High_Gm, chakraName: throatChakra.name }} />
              <SoundPlayer props={{ src: cello_Full_Gm, chakraName: throatChakra.name }} />
              <SoundPlayer props={{ src: cello_Ensemble_Gm, chakraName: throatChakra.name }} />
            </IonCol>

            <IonCol size="6">
              <ChakraPlayer key={`${throatChakra.name}_${throatChakra.note}`} vocals={AthmosphereVocals.HeavenlyGm} chakra={throatChakra} />
            </IonCol>

            <IonCol size="3">

              <IonLabel>Piano</IonLabel>

              <SoundPlayer props={{ src: piano_Peace_Gm, chakraName: throatChakra.name }} />
              <SoundPlayer props={{ src: piano_Uplifting_Gm, chakraName: throatChakra.name }} />
              <SoundPlayer props={{ src: piano_Main_Gm, chakraName: throatChakra.name }} />

            </IonCol>
          </IonRow>
        </IonGrid>
      </SwiperSlide>

      <SwiperSlide className="heart-slide">
        <ChakraPlayer key={`${heartChakra.name}_${heartChakra.note}`} vocals={AthmosphereVocals.FreeFSharpm} chakra={heartChakra} />
      </SwiperSlide>

      <SwiperSlide className="solar-slide">
        <ChakraPlayer key={`${solarChakra.name}_${solarChakra.note}`} vocals={AthmosphereVocals.AltEm} chakra={solarChakra} />
      </SwiperSlide>

      <SwiperSlide className="thirdeye-slide">
        <ChakraPlayer key={`${thirdEyeChakra.name}_${thirdEyeChakra.note}`} vocals={AthmosphereVocals.DeepAm} chakra={thirdEyeChakra} />
      </SwiperSlide>

    </Swiper>

  </>)
}

export default AthmospheresDawdioRealm;