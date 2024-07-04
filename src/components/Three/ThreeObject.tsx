/* eslint-disable react/no-unknown-property */

import { CalculationObject } from "@/src/calculation";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { Canvas } from "@react-three/fiber";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { THREE } from "expo-three";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Curve, Vector3 } from "three";

// Object size in general
const objectWidth = 1;
const objectHeight = 1;
const objectDepth = 2;
const objectPosition = new THREE.Vector3(0.125, 0.142, 0);

// Duct size
const ductWidth = objectWidth;
const ductWidthHalf = ductWidth / 2;
const ductHeight = objectHeight;
const ductHeightHalf = ductHeight / 2;
// Duct plane geometries
const ductWidthPlaneGeometryArgs: [
  width?: number | undefined,
  height?: number | undefined,
  widthSegments?: number | undefined,
  heightSegments?: number | undefined,
] = [ductWidth, objectDepth, 1, 1];
const ductHeightPlaneGeometryArgs: [
  width?: number | undefined,
  height?: number | undefined,
  widthSegments?: number | undefined,
  heightSegments?: number | undefined,
] = [ductHeight, objectDepth, 1, 1];
// Duct plane rotations
const radian90 = THREE.MathUtils.degToRad(90);
const ductWidthPlaneRotation = new THREE.Euler(radian90, 0, 0);
const ductHeightPlaneRotation = new THREE.Euler(radian90, radian90, 0);
// Duct plane positions
const ductTopPlanePosition = new THREE.Vector3(0, ductHeightHalf, 0);
const ductLeftPlanePosition = new THREE.Vector3(-ductWidthHalf, 0, 0);
const ductRightPlanePosition = new THREE.Vector3(ductWidthHalf, 0, 0);
const ductBottomPlanePosition = new THREE.Vector3(0, -ductHeightHalf, 0);

// Pipe size
const objectDepthHalf = objectDepth / 2;
const pipeRadius = objectHeight / 2;
// Pipe geometry
const pipeCurveVertices = [
  new THREE.Vector3(0, 0, objectDepthHalf),
  new THREE.Vector3(0, 0, -objectDepthHalf * 3),
];
const pipeCurve = new THREE.CatmullRomCurve3(pipeCurveVertices);
const pipeGeometryArgs: [
  path?: Curve<Vector3> | undefined,
  tubularSegments?: number | undefined,
  radius?: number | undefined,
  radialSegments?: number | undefined,
  closed?: boolean | undefined,
] = [pipeCurve, 2, pipeRadius, 64, true];

// Lighting
const addAmbientLight = false;
const ambientLightColor = "#ffffff";
const ambientLightIntensity = 0.9;

const addPointLight = true;
const pointLightIntensity = 1;
const pointLightColor = "#ffffff";
const pointLightPosition = new THREE.Vector3(0, 2, 5);

const addDirectionalLight = false;
const directionalLightIntensity = 100;
const directionalLightColor = "#ffffff";
const directionalLightPosition = new THREE.Vector3(0, 20, 20);

// Scene setup
const aspectRatio = 1 / 1;
const camera = {
  fov: 60,
  near: 0.1,
  far: 1000,
  zoom: 3.75,
  position: new THREE.Vector3(0, 0, 5),
};

const styles = StyleSheet.create({
  canvasContainer: {
    width: "100%",
    height: "100%",
    aspectRatio: aspectRatio,
    opacity: 0.1,
  },
});
const rotationBase = { x: 15, y: -15, z: 0 };
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
    //DeviceMotion.setUpdateInterval(1000 / 12);
    //_subscribe();
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
        {addAmbientLight && (
          <ambientLight
            color={ambientLightColor}
            intensity={ambientLightIntensity}
          />
        )}
        {addPointLight && (
          <pointLight
            color={pointLightColor}
            position={pointLightPosition}
            intensity={pointLightIntensity}
            castShadow
          />
        )}
        {addDirectionalLight && (
          <directionalLight
            color={directionalLightColor}
            position={directionalLightPosition}
            intensity={directionalLightIntensity}
            castShadow
          />
        )}

        {showPipe && (
          <mesh castShadow position={objectPosition} rotation={rotation}>
            <tubeGeometry args={pipeGeometryArgs} />
            <meshStandardMaterial
              color={materialColor}
              shadowSide={THREE.DoubleSide}
            />
          </mesh>
        )}

        {showDuct && (
          <group position={objectPosition} rotation={rotation}>
            <mesh
              castShadow
              position={ductTopPlanePosition}
              receiveShadow
              rotation={ductWidthPlaneRotation}
            >
              <planeGeometry args={ductWidthPlaneGeometryArgs} />
              <meshStandardMaterial
                color={materialColor}
                side={THREE.DoubleSide}
                shadowSide={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              castShadow
              position={ductLeftPlanePosition}
              receiveShadow
              rotation={ductHeightPlaneRotation}
            >
              <planeGeometry args={ductHeightPlaneGeometryArgs} />
              <meshStandardMaterial
                color={materialColor}
                side={THREE.DoubleSide}
                shadowSide={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              castShadow
              position={ductRightPlanePosition}
              receiveShadow
              rotation={ductHeightPlaneRotation}
            >
              <planeGeometry args={ductHeightPlaneGeometryArgs} />
              <meshStandardMaterial
                color={materialColor}
                side={THREE.DoubleSide}
                shadowSide={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              castShadow
              position={ductBottomPlanePosition}
              receiveShadow
              rotation={ductWidthPlaneRotation}
            >
              <planeGeometry args={ductWidthPlaneGeometryArgs} />
              <meshStandardMaterial
                color={materialColor}
                side={THREE.DoubleSide}
                shadowSide={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )}
      </Canvas>
    </View>
  );
};
