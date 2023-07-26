import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Physics } from '@react-three/cannon'


const CanvasContainer = () => {
  return (
    <Canvas className='bg-green-500'>
      <Physics>
        <pointLight position={[0, 10, 0]} />
        <OrthographicCamera makeDefault position={[-40, 18, -100]} rotation={[Math.PI, 0, 0]} zoom={4.5} />
        <OrbitControls 
          enableDamping 
          dampingFactor={1} 
          autoRotate 
          autoRotateSpeed={0.1}
        />
        
      </Physics>
    </Canvas>
  )
}

export default CanvasContainer