import { useFrame } from "@react-three/fiber";
import React, { FC, useRef } from "react";

interface ThreeUseFrameProps {
  onFirstFrame: () => void;
}

export const ThreeUseFrame: FC<ThreeUseFrameProps> = ({ onFirstFrame }) => {
  const meshRef = useRef<any>();
  const hasRenderedOnce = useRef(false);

  useFrame((state, delta) => {
    if (!hasRenderedOnce.current && meshRef.current) {
      hasRenderedOnce.current = true;
      onFirstFrame();
    }
  });

  return <mesh ref={meshRef}></mesh>;
};
