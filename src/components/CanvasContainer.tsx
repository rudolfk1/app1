import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'


const CanvasContainer = () => {
  


  return (
    <Canvas className='bg-green-500 h-screen'>
        <Physics>
          <OrbitControls />
           
        </Physics>
      </Canvas>
    
  );
}

export default CanvasContainer;