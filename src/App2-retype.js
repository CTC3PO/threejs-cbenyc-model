//import
import { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { Camera } from "@react-three/fiber";

//1. Function loader for loading UI (also useProgress to display loading status)
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

//2. Define class SimpleModel to be use to be render in <App>. It calls the useLoader hook from three-fiber (it will load the model from the public folder) and load it into the gltf const
// useFrame is a hook that is called for every frame
// we call useFrame to animate the model
//modelRef is defined for the primitive element. useFrame contorls the model's roration and reposition

const SimpleModel = (args) => {
  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x += 0.05;
      modelRef.current.rotation.y += 0.1;
      modelRef.current.position.z = (modelRef.current.position.z + 0.01) % 10;
    }
  });
  const gltf = useLoader(GLTFLoader, "./london-model/scene.gltf");
  return <primitive object={gltf.scene} {...args} />;
};

//3. Function App to render the model, but first it wraps the model with <Canvas> and add <Suspense> to have the loading progress,
//then add the <Model>, <OrbitControls> options and add <Environment> and <Light>

function App2() {
  return (
    <Canvas style={{ height: "100vh" }}>
      <Suspense fallback={<Loader />}>
        <pointLight color="yellow" position={[5, 5, 5]} />
        <SimpleModel position={[-5, -5, -15]} scale={0.02} rotation-x={0} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          rotationSpeed={0.3}
          autoRotate={true}
          autoRotateSpeed={0.7}
          enableDamping={true}
          dampingFactor={0.1}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment preset="park" background />
      </Suspense>
    </Canvas>
  );
}

export default App2;
