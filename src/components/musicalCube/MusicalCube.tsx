import './MusicalCube.css';
import './SwiperOverrides.css';
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperType } from 'swiper/types';
import { EffectCube, Navigation } from 'swiper/modules';

import React from "react";
import { CubeSide } from './cubeSide/CubeSide';
import { nanoid } from '@reduxjs/toolkit';
import { Size } from './interfaces/Size';
import { InTheCity } from 'pages/realms/musicalCubes/sounds/CubeSound';
import { IonLabel } from '@ionic/react';

interface Options {
    label?: string;
    size?: Size;
    sounds: Array<InTheCity>;
    enableLoop?: boolean;
    enableSync?: boolean;
    setSharedTrackTime: (newTrackTime: number) => void;
    getSharedTrackTime: () => number;
}

const MusicalCube: React.FC<Options> = ({ label: label, size = { height: 333, width: 333 }, sounds, ...props }) => {
    return (
        <div className={`musical-cube`}>
            {label && <IonLabel className='musical-cube-label'>{label}</IonLabel>}

            <Swiper
                className={`musical-cube-swiper`}
                style={{ height: size.height, width: size.width }}
                effect={'cube'}
                loop={true}
                navigation={true}
                cubeEffect={{
                    shadow: true,
                    shadowOffset: 30,
                    shadowScale: 0.85,
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
                modules={[EffectCube, Navigation]}
            >
                {
                    sounds.map((sound, index) =>
                        <SwiperSlide key={`cube-slide-${index}`}>
                            <div className='cube-slide-title'>{Object.keys(InTheCity)[Object.values(InTheCity).indexOf(sound)].replaceAll('_', ' ')}</div>
                            
                            <CubeSide id={nanoid()} size={size} sound={sound} {...props} />
                        </SwiperSlide>
                    )}

            </Swiper>
        </div>
    );
}

export default MusicalCube;