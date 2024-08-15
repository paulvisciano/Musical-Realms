import { useRef } from "react";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { GroupProps, useFrame } from "@react-three/fiber";
import { MeshMatcapMaterialProps } from "@react-three/fiber";
import { Center, Instance, Instances, useTexture, View } from "@react-three/drei";

import { forwardRef } from "react";
import { MeshMatcapMaterial } from "three";

import cubeLoadJpeg from './sphere.jpeg'
import "./CoinLoadingIndicator.css";

const radius = 4;
const count = 15;

const Texture = forwardRef<
    MeshMatcapMaterial,
    MeshMatcapMaterialProps
>((props, ref) => {
    const texture = useTexture(cubeLoadJpeg);

    return (
        <meshMatcapMaterial
            {...props}
            ref={ref}
            matcap={texture}
        ></meshMatcapMaterial>
    );
});

const Coin = (props: GroupProps) => {
    const ref = useRef<THREE.Group>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
            ref.current.rotation.z += 0.01;
        }
    });

    return (
        <group {...props}>
            <group ref={ref} rotation={[0, Math.PI / count, Math.PI / 2]}>
                <Instance />
            </group>
        </group>
    );
}

const Coins = () => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.z -= 0.01;
        }
    });

    return (
        <Center>
            <group>
                <group scale={0.6} ref={groupRef}>
                    <Instances>
                        <cylinderGeometry args={[1, 1, 0.1, 64]}></cylinderGeometry>

                        <Texture />

                        {Array.from({ length: 8 }).map((_, index) => {
                            return (
                                <Coin
                                    position={[
                                        radius *
                                        Math.cos((index * 2 * Math.PI) / count + Math.PI / 4),
                                        radius *
                                        Math.sin((index * 2 * Math.PI) / count + Math.PI / 4),
                                        0,
                                    ]}
                                    rotation={[0, 0, (index * 2 * Math.PI) / count]}
                                    key={index}
                                ></Coin>
                            );
                        })}
                    </Instances>
                </group>
            </group>
        </Center>
    );
};

export const CoinLoadingIndicator: React.FC = ({ }) => {
    const canvasWrapperRef = useRef(null!);

    return (
        <div className="coin-loading-indicator">
            <View className="view"  >
                <Coins />
            </View>

            <div ref={canvasWrapperRef} className="canvas-wrapper">
                <Canvas
                    style={{ position: "fixed", top: 0, left: 0 }}
                    camera={{
                        zoom: 0.4,
                    }}
                    eventSource={canvasWrapperRef}
                >
                    <View.Port />
                </Canvas>
            </div>
        </div>


    );
};

