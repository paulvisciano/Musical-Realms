import './MusicalCube.css';
import './SwiperOverrides.css';
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperType } from 'swiper/types';
import { EffectCube, Navigation } from 'swiper/modules';

import React, { useEffect, useState } from "react";
import { nanoid } from '@reduxjs/toolkit';
import { Size } from '../interfaces/Size';
import { CubeSide } from '../cubeSide/CubeSide';
import { useDispatch } from 'react-redux';
import { SoundCube, trackSlice } from '../TrackSlice';

export enum CubeType {
    Vocals,
    Melody
}

interface Options {
    id: string;
    type: CubeType,
    size?: Size;
    sounds: string[];
    enableLoop?: boolean;
    enableSync?: boolean;
    startGlobalTimeTracker: any;
    getSharedTrackTime: () => number;
}

const MusicalCube: React.FC<Options> = ({ id, type, size = { height: 333, width: 333 }, sounds, ...props }) => {
    const dispatch = useDispatch();

    let addVocalCube = (cube: SoundCube) => trackSlice.actions.addVocalsCube({ vocalCube: cube });
    let addMelodyCube = (cube: SoundCube) => trackSlice.actions.addMelodyCube({ vocalCube: cube });
    // let activeIndexChange = (index: number) => musicalCubeSlice.actions.activeIndexChange(index);

    return (
        <div className={`musical-cube`}>
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
                onAfterInit={(swiper: SwiperType) => {
                    console.log('SWIPER', swiper);
                }}
                onInit={(swiper: SwiperType) => {
                    switch (type) {
                        case CubeType.Vocals:
                            dispatch(addVocalCube({ id: id, activeIndex: 0, sounds: sounds }))
                            break;
                        case CubeType.Melody:
                            dispatch(addMelodyCube({ id: id, activeIndex: 0, sounds: sounds }))
                            break;
                        default:
                            dispatch(addMelodyCube({ id: id, activeIndex: 0, sounds: sounds }))
                            break;
                    }

                    //Force update to remove dark background from slide
                    setTimeout(() => {
                        swiper.update();
                    });
                }}
                onSlideChangeTransitionEnd={(swiper: SwiperType) => {
                    console.log("real index", swiper.realIndex)
                    // dispatch(activeIndexChange(swiper.realIndex))
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
                    sounds.map((sound: any, index: any) =>
                        <SwiperSlide key={`cube-slide-${index}`}>
                            <CubeSide id={nanoid()} index={index} sound={sound} size={size} {...props} />
                        </SwiperSlide>
                    )}

            </Swiper>
        </div >
    );
}

export default MusicalCube;