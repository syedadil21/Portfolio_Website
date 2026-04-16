"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Value noise
function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number): number {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < 5; i++) {
    v += a * (smoothNoise(x * f, y * f) * 2 - 1);
    a *= 0.5;
    f *= 2;
  }
  return v;
}

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const spotRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, sx: 0, sy: 0, hasMoved: false });
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseVec = useMemo(() => new THREE.Vector2(), []);
  const zoomRef = useRef(0); // 0 = zoomed in, 1 = zoomed out

  const onMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseRef.current.hasMoved = true;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  const { geometry, baseZ } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(36, 28, 90, 70);
    const pos = geo.attributes.position;
    const bz = new Float32Array(pos.count);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Smooth, uniform noise across the whole terrain
      const elevation =
        fbm(x * 0.25 + 2.1, y * 0.25 + 3.7) * 0.6 +
        fbm(x * 0.5 + 8.2, y * 0.5 + 1.3) * 0.2;

      // Gentle dome that covers the full mesh (wider falloff)
      const d = Math.sqrt(x * x + y * y);
      const dome = Math.exp(-d * d * 0.006) * 0.7;

      const z = elevation + dome;
      pos.setZ(i, z);
      bz[i] = z;
    }
    geo.computeVertexNormals();
    return { geometry: geo, baseZ: bz };
  }, []);

  useFrame((state, delta) => {
    const m = mouseRef.current;
    // Smooth mouse
    m.sx += (m.x - m.sx) * 3 * delta;
    m.sy += (m.y - m.sy) * 3 * delta;

    // Smooth zoom transition: zoomed in (0) → zoomed out (1)
    const zoomTarget = m.hasMoved ? 1 : 0;
    zoomRef.current += (zoomTarget - zoomRef.current) * 1.2 * delta;
    const z = zoomRef.current;

    // Camera position: starts close (z=4), eases out to z=7
    const camZ = 4 + z * 3;
    state.camera.position.z = camZ;
    state.camera.updateProjectionMatrix();

    const mesh = meshRef.current;
    if (mesh) {
      const pos = mesh.geometry.attributes.position;
      const t = performance.now() * 0.001;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Stronger ripple waves
        const wave =
          Math.sin(t * 1.0 + x * 0.6 + y * 0.4) * 0.14 +
          Math.sin(t * 1.5 - x * 0.4 + y * 0.9) * 0.10 +
          Math.cos(t * 0.7 + x * 0.25 - y * 0.5) * 0.07 +
          Math.sin(t * 2.0 + x * 1.2 + y * 0.3) * 0.04;
        pos.setZ(i, baseZ[i] + wave);
      }
      pos.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    }

    // Raycast from camera through mouse to find terrain hit point
    if (spotRef.current && meshRef.current) {
      mouseVec.set(m.sx, m.sy);
      raycaster.setFromCamera(mouseVec, camera);
      const hits = raycaster.intersectObject(meshRef.current);
      if (hits.length > 0) {
        const p = hits[0].point;
        spotRef.current.position.set(p.x, p.y, p.z + 2.5);
      } else {
        // Fallback: project mouse onto a horizontal plane at the mesh level
        const dir = raycaster.ray.direction;
        const origin = raycaster.ray.origin;
        const planeY = 0;
        if (Math.abs(dir.y) > 0.001) {
          const t2 = (planeY - origin.y) / dir.y;
          if (t2 > 0) {
            spotRef.current.position.set(
              origin.x + dir.x * t2,
              origin.y + dir.y * t2,
              2.5
            );
          }
        }
      }
    }
  });

  return (
    <>
      {/* Ambient — base brightness for all unlit areas */}
      <ambientLight intensity={0.55} color="#334466" />

      {/* Mouse-following spotlight */}
      <pointLight
        ref={spotRef}
        intensity={90}
        distance={40}
        decay={0.8}
        color="#c0d0e8"
      />

      {/* Overhead fill — lights the whole terrain evenly */}
      <directionalLight
        intensity={0.60}
        position={[3, 5, 8]}
        color="#556688"
      />

      {/* Back fill from opposite side — prevents dark corners */}
      <directionalLight
        intensity={0.90}
        position={[-5, -3, 6]}
        color="#445577"
      />

      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[-0.75, 0, 0.04]}
        position={[0, 0.5, -5]}
      >
        <meshStandardMaterial
          color="#1c2840"
          emissive="#0d1520"
          emissiveIntensity={0.8}
          roughness={0.55}
          metalness={0.45}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export default function GeometricBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="absolute inset-0 bg-[#050810]" />;

  return (
    <div className="absolute inset-0 w-full h-full" style={{ background: "#050810" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#050810"]} />
        <fog attach="fog" args={["#050810", 6, 16]} />
        <Terrain />
      </Canvas>
    </div>
  );
}
