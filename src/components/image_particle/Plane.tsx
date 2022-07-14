import React, { FC, useMemo, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "~/shaders/image_particle/particle.vert";
import fragmentShader from "~/shaders/image_particle/particle.frag";

const COUNT = 512;
const PARTICLE_NUM = COUNT * COUNT;

const rand = (a: number, b: number) => {
  return a + (b - a) * Math.random();
};

export const Plane: FC = () => {
  const shaderRef = useRef(null);
  const [yWheel, setYWheel] = useState(0);

  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      if (shaderRef.current) {
        console.log(e.deltaY);
        shaderRef.current.uniforms.move.value =
          Math.abs(e.deltaY) < 3 ? 0 : e.deltaY / 100;
      }
    };

    window.addEventListener("wheel", handleWheelEvent);

    return () => {
      window.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  const texture = useMemo(() => {
    return {
      pokemon: new THREE.TextureLoader().load("/images/pokemon.png"),
      mask: new THREE.TextureLoader().load("/images/mask.jpg"),
    };
  }, []);

  const [positions, coordinates, speed, offset] = useMemo(() => {
    const positions = new Float32Array(PARTICLE_NUM * 3);
    const coordinates = new Float32Array(PARTICLE_NUM * 3);
    const speed = new Float32Array(PARTICLE_NUM);
    const offset = new Float32Array(PARTICLE_NUM);

    let index = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = 0; j < COUNT; j++) {
        positions.set([i - COUNT / 2, j - COUNT / 2, 0], index);
        coordinates.set([i, j, 0], index);
        speed.set([rand(-1000, 1000)], index / 3);
        offset.set([rand(0.4, 1)], index / 3);

        index += 3;
      }
    }

    return [positions, coordinates, speed, offset];
  }, []);
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          count={positions.length / 3}
          itemSize={3}
          attach="attributes-position"
          array={positions}
        />
        <bufferAttribute
          attach="attributes-aCoordinates"
          count={positions.length / 3}
          itemSize={3}
          array={coordinates}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speed.length}
          itemSize={1}
          array={speed}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={offset.length}
          itemSize={1}
          array={offset}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          t1: { value: texture.pokemon },
          mask: { value: texture.mask },
          move: { value: yWheel },
          time: { value: 0 },
        }}
      />
    </points>
  );
};
