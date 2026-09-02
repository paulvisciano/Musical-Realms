import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import './Index.css';
import TibetanRealm from './tibetan/Tibetan';
import AthmospheresDawdioRealm from './athmospheresDawdio/AthmospheresDawdio';
import SoulRealm from './soul/SoulRealm';
import NativeAmericanRealm from './nativeAmerican/NativeAmerican';

const Realms: React.FC = () => {
  return (<>
    <Swiper
      className='workspace-swiper'
      direction={'vertical'}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={{ forceToAxis: true, thresholdDelta: 50 }}
      pagination={{
        clickable: true,
      }}
      modules={[Mousewheel, Pagination]}
      onSwiper={(swiper: SwiperType) => {
        console.log('Force refresh');
        setTimeout(() => {
          swiper.update();
        });
      }}
    >

      <SwiperSlide>
        <SoulRealm />
      </SwiperSlide>

      <SwiperSlide>
        <TibetanRealm />
      </SwiperSlide>

      <SwiperSlide>
        <AthmospheresDawdioRealm />
      </SwiperSlide>

      <SwiperSlide>
        <NativeAmericanRealm />
      </SwiperSlide>


      {/* <SwiperSlide>
        <OptimizedForPhone />
      </SwiperSlide> */}
    </Swiper>
  </>)
}

export default Realms;