// components/Room3D.jsx
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Preload fan models
useGLTF.preload('/fan1.glb');
useGLTF.preload('/fan2.glb');

/* --- All the small components --- */
function Wall({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial 
        color={color} 
        side={THREE.DoubleSide}
        roughness={0.7}
        metalness={0.05}
        envMapIntensity={0.3}
      />
    </mesh>
  );
}

function TexturedWall({ position, rotation, textureUrl, size = [4, 6] }) {
  let wallTexture;
  try {
    wallTexture = useLoader(THREE.TextureLoader, textureUrl);
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1.5, 2);
  } catch {
    wallTexture = null;
  }

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={wallTexture || null}
        color={wallTexture ? undefined : '#F0E6D2'}
        side={THREE.DoubleSide}
        roughness={0.9}
        metalness={0}
        bumpScale={0.2}
      />
    </mesh>
  );
}

function Floor({ position, rotation }) {
  const floorTexture = useLoader(THREE.TextureLoader, '/floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial 
        map={floorTexture} 
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

function Bed({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.8, -1]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}

function Almirah({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 3.5, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.38, 1, 0.41]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 3.2, 0.05]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      <mesh position={[0.38, 1, 0.41]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 3.2, 0.05]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      <mesh position={[-0.15, 1, 0.45]} castShadow>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0.15, 1, 0.45]} castShadow>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

function Plant({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.25, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.1, 1.0, 0.1]} castShadow>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
    </group>
  );
}

function Window({ position }) {
  return (
    <group position={position}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[2.4, 3, 0.15]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2, 2.5, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Enhanced glass panes for more light transmission */}
      {[[-0.5, 0.6], [0.5, 0.6], [-0.5, -0.6], [0.5, -0.6]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <planeGeometry args={[0.8, 1.1]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.05} 
            transmission={0.95} 
            thickness={0.01} 
            roughness={0.05} 
            clearcoat={1} 
            clearcoatRoughness={0.05} 
            ior={1.5}
            envMapIntensity={2}
          />
        </mesh>
      ))}
      
      {/* Bright outdoor light simulation behind window */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[2.2, 2.7]} />
        <meshBasicMaterial color="#ffffcc" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function CeilingBulb({ position, isOn }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.15]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[0, -0.25, 0]} castShadow>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial 
          color={isOn ? "#FFF8DC" : "#E8E8E8"} 
          emissive={isOn ? "#FFEEAA" : "#000"} 
          emissiveIntensity={isOn ? 0.6 : 0} 
        />
      </mesh>
      {isOn && (
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#FFAA00" />
        </mesh>
      )}
    </group>
  );
}

function CeilingFan({ modelUrl, rotate, fanSpeed }) {
  const fanRef = useRef();
  let scene;
  
  try {
    const gltf = useGLTF(modelUrl);
    scene = gltf.scene;
  } catch (error) {
    console.warn(`Failed to load fan model: ${modelUrl}`, error);
    // Fallback to a simple cylinder if model loading fails
    scene = null;
  }

  useFrame(() => {
    if (rotate && fanRef.current) {
      fanRef.current.rotation.y += fanSpeed;
    }
  });

  const scale = modelUrl.includes('fan2') ? 0.2 : 1.5;
  
  // If model failed to load, render a simple fallback fan
  if (!scene) {
    return (
      <group ref={fanRef} position={[0, 2.8, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 0.05, 0.2]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
        <mesh position={[0, -0.15, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[2, 0.05, 0.2]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      </group>
    );
  }
  
  // Ensure the loaded model casts shadows
  if (scene) {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }
  
  return <primitive object={scene} ref={fanRef} position={[0, 2.8, 0]} scale={scale} />;
}

/* --- Main Room3D Component --- */
export default function Room3D({ 
  wallColor: propWallColor,
  backWallColor: propBackWallColor,
  leftWallColor: propLeftWallColor,
  rightWallColor: propRightWallColor,
  fanModel: propFanModel, 
  isRotating: propIsRotating, 
  fanSpeed: propFanSpeed, 
  showFurniture: propShowFurniture, 
  isBulbOn: propIsBulbOn 
}) {
  const [wallColor, setWallColor] = useState(propWallColor || 'lightblue');
  const [backWallColor, setBackWallColor] = useState(propBackWallColor || propWallColor || 'lightblue');
  const [leftWallColor, setLeftWallColor] = useState(propLeftWallColor || propWallColor || 'lightblue');
  const [rightWallColor, setRightWallColor] = useState(propRightWallColor || propWallColor || 'lightblue');
  const [fanModel, setFanModel] = useState(propFanModel || '/fan1.glb');
  const [isRotating, setIsRotating] = useState(propIsRotating !== undefined ? propIsRotating : true);
  const [fanSpeed, setFanSpeed] = useState(propFanSpeed || 0.1);
  const [showFurniture, setShowFurniture] = useState(propShowFurniture !== undefined ? propShowFurniture : true);
  const [isBulbOn, setIsBulbOn] = useState(propIsBulbOn !== undefined ? propIsBulbOn : true);

  // Update state when props change
  React.useEffect(() => {
    if (propWallColor) {
      setWallColor(propWallColor);
      // If individual wall colors aren't set, use the general wallColor
      if (!propBackWallColor) setBackWallColor(propWallColor);
      if (!propLeftWallColor) setLeftWallColor(propWallColor);
      if (!propRightWallColor) setRightWallColor(propWallColor);
    }
  }, [propWallColor]);

  React.useEffect(() => {
    if (propBackWallColor) setBackWallColor(propBackWallColor);
  }, [propBackWallColor]);

  React.useEffect(() => {
    if (propLeftWallColor) setLeftWallColor(propLeftWallColor);
  }, [propLeftWallColor]);

  React.useEffect(() => {
    if (propRightWallColor) setRightWallColor(propRightWallColor);
  }, [propRightWallColor]);

  React.useEffect(() => {
    if (propFanModel) setFanModel(propFanModel);
  }, [propFanModel]);

  React.useEffect(() => {
    if (propIsRotating !== undefined) setIsRotating(propIsRotating);
  }, [propIsRotating]);

  React.useEffect(() => {
    if (propFanSpeed !== undefined) setFanSpeed(propFanSpeed);
  }, [propFanSpeed]);

  React.useEffect(() => {
    if (propShowFurniture !== undefined) setShowFurniture(propShowFurniture);
  }, [propShowFurniture]);

  React.useEffect(() => {
    if (propIsBulbOn !== undefined) setIsBulbOn(propIsBulbOn);
  }, [propIsBulbOn]);

  return (
    <Canvas camera={{ position: [0, 0, 8] }} shadows>
      {/* Enhanced ambient lighting for brighter room */}
      <ambientLight intensity={0.6} color="#f5f5dc" />
      
      {/* Main sunlight coming through window */}
      <directionalLight 
        position={[8, 6, -3]} 
        intensity={2.5} 
        color="#fff5e6"
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Secondary sunlight for softer shadows */}
      <directionalLight position={[5, 8, -2]} intensity={1.8} color="#fffbf0" />
      
      {/* Natural light bounce from window - using spotlight instead of RectAreaLight */}
      <spotLight
        position={[2, 1, -4.8]}
        intensity={2.5}
        color="#ffffff"
        angle={Math.PI / 4}
        penumbra={0.3}
        castShadow
      />
      
      {/* Enhanced point lights for even illumination */}
      <pointLight position={[3, 4, 2]} intensity={1.2} color="#fff8dc" />
      <pointLight position={[-3, 4, 2]} intensity={1.2} color="#fff8dc" />
      
      {/* Ceiling light spots for better coverage */}
      <spotLight position={[2, 4.5, 0]} intensity={isBulbOn ? 1.5 : 0} color="#ffeeaa" angle={0.6} />
      <spotLight position={[-2, 4.5, 0]} intensity={isBulbOn ? 1.2 : 0} color="#ffeeaa" angle={0.5} />
      
      {/* Rim lighting for object definition */}
      <pointLight position={[0, 3, 6]} intensity={0.8} color="#e6f3ff" />
      <pointLight position={[0, 2, -6]} intensity={0.6} color="#fff2e6" />
      <Suspense fallback={null}>
        {/* Back Wall */}
        <Wall position={[0, 0, -5]} rotation={[0, 0, 0]} color={backWallColor} />
        {/* Left Wall */}
        <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} color={leftWallColor} />
        {/* Right Wall */}
        <Wall position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color={rightWallColor} />
        {/* Ceiling */}
        <Wall position={[0, 5, 0]} rotation={[-Math.PI / 2, 0, 0]} color={'white'} />
        <Floor position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]} />
        {showFurniture && <Window position={[2, 1, -4.95]} />}
        {showFurniture && <Bed position={[-2, -4.2, -2]} />}
        {showFurniture && <Almirah position={[3.5, -3.5, 1]} />}
        {showFurniture && <Plant position={[-4, -4.2, 3]} />}
        {showFurniture && <Plant position={[4, -4.2, -3]} />}
        <CeilingBulb position={[-2, 4.8, 2]} isOn={isBulbOn} />
        <CeilingFan modelUrl={fanModel} rotate={isRotating} fanSpeed={fanSpeed} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}