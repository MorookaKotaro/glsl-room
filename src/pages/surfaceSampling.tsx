import { NextPage } from "next";
import { FC, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sampler } from "@react-three/drei";

const Cube: FC = ({ ...props }) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="orange" wireframe />
    </mesh>
  );
};

const CubeSampler: FC = () => {
  const meshRef = useRef(null);
  const instanceMeshRef = useRef(null);

  const vertices = useMemo(() => {
    return new Float32Array(
      [...Array(100)].flatMap(() => {
        const tmpPosition = new THREE.Vector3();

        return [tmpPosition.x, tmpPosition.y, tmpPosition.z];
      })
    );
  }, []);

  console.log(vertices);

  return (
    <Sampler mesh={meshRef} instances={instanceMeshRef}>
      <Cube ref={meshRef} />
      <points ref={instanceMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="position"
            count={vertices.length / 3}
            array={vertices}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="pink" size={0.8} />
      </points>
    </Sampler>
  );
};

const SurfaceSampling: NextPage = () => {
  return (
    <Canvas flat linear>
      <OrbitControls />
      <CubeSampler />
    </Canvas>
  );
};

export default SurfaceSampling;
