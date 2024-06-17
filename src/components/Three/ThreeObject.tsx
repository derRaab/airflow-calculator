/* eslint-disable react/no-unknown-property */

import { CalculationObject } from "@/src/calculation";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { Canvas } from "@react-three/fiber";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { THREE } from "expo-three";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// Object size in general
const objectWidth = 1;
const objectHeight = 1;
const objectDepth = 2;
const objectPosition = [0.15, 0.15, 0];

// Duct size
const ductWidth = objectWidth;
const ductWidthHalf = ductWidth / 2;
const ductHeight = objectHeight;
const ductHeightHalf = ductHeight / 2;
// Duct plane geometries
const ductWidthPlaneGeometryArgs = [ductWidth, objectDepth, 1, 1];
const ductHeightPlaneGeometryArgs = [ductHeight, objectDepth, 1, 1];
// Duct plane rotations
const radian90 = THREE.MathUtils.degToRad(90);
const ductWidthPlaneRotation = new THREE.Euler(radian90, 0, 0);
const ductHeightPlaneRotation = new THREE.Euler(radian90, radian90, 0);
// Duct plane positions
const ductTopPlanePosition = [0, ductHeightHalf, 0];
const ductLeftPlanePosition = [-ductWidthHalf, 0, 0];
const ductRightPlanePosition = [ductWidthHalf, 0, 0];
const ductBottomPlanePosition = [0, -ductHeightHalf, 0];

// Pipe size
const objectDepthHalf = objectDepth / 2;
const pipeRadius = objectHeight / 2;
// Pipe geometry
const pipeCurveVertices = [
  new THREE.Vector3(0, 0, objectDepthHalf),
  new THREE.Vector3(0, 0, -objectDepthHalf * 3),
];
const pipeCurve = new THREE.CatmullRomCurve3(pipeCurveVertices);
const pipeGeometryArgs = [pipeCurve, 2, pipeRadius, 64, true];

// Scene setup
const aspectRatio = 4 / 3;
const pointLightIntensity = 2000;
const pointLightPosition = [0, 0, 5];
const cameraPosition = [0, 0, 4];
const camera = {
  fov: 60,
  near: 0.1,
  far: 1000,
  zoom: 2.3,
  position: cameraPosition,
};

const styles = StyleSheet.create({
  canvasContainer: { aspectRatio: aspectRatio },
});
const rotationBase = { x: 15, y: -25, z: 0 };
const xFactor = 2;
const yFactor = 10;
const zFactor = 10;
const convertRotation = ({
  alpha,
  beta,
  gamma,
}: {
  alpha: number;
  beta: number;
  gamma: number;
}) =>
  new THREE.Euler(
    THREE.MathUtils.degToRad(rotationBase.x + beta * xFactor),
    THREE.MathUtils.degToRad(rotationBase.y + gamma * yFactor),
    THREE.MathUtils.degToRad(rotationBase.z + alpha * zFactor),
  );

interface ThreeObjectProps {
  colorScheme: MaterialDesign3ColorScheme;
  object: CalculationObject | "both";
}

export const ThreeObject: FC<ThreeObjectProps> = ({ colorScheme, object }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const _subscribe = () => {
    setSubscription(DeviceMotion.addListener(handleGyroscopeData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    DeviceMotion.setUpdateInterval(1000 / 12);
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const [rotation, setRotation] = useState(
    convertRotation({
      alpha: 0,
      beta: 0,
      gamma: 0,
    }),
  );
  const handleGyroscopeData = (gyroscopeData: DeviceMotionMeasurement) => {
    setRotation(convertRotation(gyroscopeData.rotation));
  };

  const materialColor = colorScheme.primary;
  const showDuct = object === "duct" || object === "both";
  const showPipe = object === "pipe" || object === "both";

  return (
    <View style={styles.canvasContainer}>
      <Canvas camera={camera}>
        <ambientLight color={"#ff0000"} intensity={pointLightIntensity} />
        <pointLight
          position={pointLightPosition}
          intensity={pointLightIntensity}
        />

        {showPipe && (
          <mesh position={objectPosition} rotation={rotation}>
            <tubeGeometry args={pipeGeometryArgs} />
            <meshMatcapMaterial color={materialColor} />
          </mesh>
        )}

        {showDuct && (
          <group position={objectPosition} rotation={rotation}>
            <mesh
              position={ductTopPlanePosition}
              rotation={ductWidthPlaneRotation}
            >
              <planeGeometry args={ductWidthPlaneGeometryArgs} />
              <meshMatcapMaterial
                color={materialColor}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              position={ductLeftPlanePosition}
              rotation={ductHeightPlaneRotation}
            >
              <planeGeometry args={ductHeightPlaneGeometryArgs} />
              <meshMatcapMaterial
                color={materialColor}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              position={ductRightPlanePosition}
              rotation={ductHeightPlaneRotation}
            >
              <planeGeometry args={ductHeightPlaneGeometryArgs} />
              <meshMatcapMaterial
                color={materialColor}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              position={ductBottomPlanePosition}
              rotation={ductWidthPlaneRotation}
            >
              <planeGeometry args={ductWidthPlaneGeometryArgs} />
              <meshMatcapMaterial
                color={materialColor}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )}
      </Canvas>
    </View>
  );
};
