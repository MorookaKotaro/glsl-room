import { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Plane } from "~/components/image_particle/Plane";

const ImageParticle: NextPage = () => {
  return (
    <Canvas
      flat
      linear
      camera={{ position: [0, 0, 500], far: 10000, near: 0.001 }}
    >
      {/* <OrbitControls /> */}
      <Plane />
    </Canvas>
  );
};

export default ImageParticle;
