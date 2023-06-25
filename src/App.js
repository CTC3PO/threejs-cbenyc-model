// REACT THREE FIBER WAY

import { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { Camera } from "three";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const SimpleModel = (args) => {
  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x += 0.05;
      modelRef.current.rotation.y += 0.1;
      modelRef.current.position.z = (modelRef.currentposition.z + 0.01) % 10;
    }
  });
  const gltf = useLoader(GLTFLoader, "./london-model/scene.gltf");
  return <primitive object={gltf.scene} {...args} />;
};

function App() {
  return (
    <Canvas style={{ height: "100vh" }}>
      <Suspense fallback={<Loader />}>
        <pointLight color="#83c2f2" position={[5, 5, 5]} />
        <SimpleModel position={[-5, -5, -15]} scale={0.02} rotation-x={0} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          rotateSpeed={0.3}
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

export default App;

// WAY 1:

// import { Suspense, useRef } from "react";
// import { Canvas, useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {
//   Environment,
//   Html,
//   OrbitControls,
//   useProgress,
// } from "@react-three/drei";

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }

// const FreeFarm = (args) => {
//   const modelRef = useRef();
//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.x += 0.05;
//       modelRef.current.rotation.y += 0.1;
//       modelRef.current.position.z = (modelRef.currentposition.z + 0.01) % 10;
//     }
//   });
//   const gltf = useLoader(GLTFLoader, "./london-model/scene.gltf");
//   return <primitive object={gltf.scene} {...args} />;
// };

// function App() {
//   return (
//     <Canvas style={{ height: "100vh" }}>
//       <Suspense fallback={<Loader />}>
//         <pointLight color="blue" position={[10, 10, 10]} />
//         <FreeFarm position={[-5, -5, -5]} scale={0.01} rotation-x={1} />
//         <OrbitControls
//           enableZoom={true}
//           rotateSpeed={2}
//           autoRotate={true}
//           autoRotateSpeed={1}
//         />
//         <Environment preset="park" background />
//       </Suspense>
//     </Canvas>
//   );
// }

// export default App;

//METHOD 2
// import { useEffect, useRef } from "react";
// import { Suspense } from "react";
// import { canvas, useLoader } from "@react-three/fiber";
// import * as THREE from "three";

// function App() {
//   const divRef = useRef();

//   useEffect(() => {
//     // init
//     let width = divRef.current.clientWidth;
//     let height = divRef.current.clientHeight;

//     const camera = new THREE.PerspectiveCamera(
//       70,
//       window.innerWidth / window.innerHeight,
//       0.01,
//       10
//     );
//     camera.position.z = 2;

//     const scene = new THREE.Scene();

//     const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
//     const material = new THREE.MeshNormalMaterial();

//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setAnimationLoop(animation);

//     const divCurrent = divRef.current;
//     divCurrent.appendChild(renderer.domElement);

//     window.addEventListener("resize", handleResize);

//     //handle window resize
//     function handleResize() {
//       width = divRef.current.clientWidth;
//       height = divRef.current.clientHeight;
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.render(scene, camera);
//     }

//     // animation
//     function animation(time) {
//       mesh.rotation.x = time / 2000;
//       mesh.rotation.y = time / 1000;

//       renderer.render(scene, camera);
//     }

//     return () => {
//       renderer.setAnimationLoop(null);
//       window.removeEventListener("resize", handleResize);
//       divCurrent.removeChild(renderer.domElement);
//       scene.remove(mesh);
//       geometry.dispose();
//       material.dispose();
//     };
//   }, []);

//   return <div ref={divRef} style={{ height: "100vh" }} />;
// }

// export default App;
