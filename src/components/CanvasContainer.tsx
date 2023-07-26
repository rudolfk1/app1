import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { useState, useEffect, useCallback } from 'react';
import { Cube } from './Cube';
import { useSocket } from '../hooks/useSocket';
import { Html } from '@react-three/drei';


interface CubeState {
  name: string;
  color: string;
  position: [number, number, number];
}


const CanvasContainer = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ff0000');
  const [cubes, setCubes] = useState<CubeState[]>([]);

  const handleSocketMessage = useCallback((message: any) => {
    setCubes(message.cubes);
  }, []);

  const socket = useSocket('http://localhost:4000', handleSocketMessage);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newPosition;
      switch (event.key) {
        case 'w':
          newPosition = cubes.find((cube) => cube.name === name)?.position;
          newPosition && setCubes((prevCubes) =>
            prevCubes.map((cube) =>
              cube.name === name ? { ...cube, position: [cube.position[0], cube.position[1], cube.position[2] + 1] } : cube
            )
          );
          break;
        case 'a':
          newPosition = cubes.find((cube) => cube.name === name)?.position;
          newPosition && setCubes((prevCubes) =>
            prevCubes.map((cube) =>
              cube.name === name ? { ...cube, position: [cube.position[0] - 1, cube.position[1], cube.position[2]] } : cube
            )
          );
          break;
        case 's':
          newPosition = cubes.find((cube) => cube.name === name)?.position;
          newPosition && setCubes((prevCubes) =>
            prevCubes.map((cube) =>
              cube.name === name ? { ...cube, position: [cube.position[0], cube.position[1], cube.position[2] - 1] } : cube
            )
          );
          break;
        case 'd':
          newPosition = cubes.find((cube) => cube.name === name)?.position;
          newPosition && setCubes((prevCubes) =>
            prevCubes.map((cube) =>
              cube.name === name ? { ...cube, position: [cube.position[0] + 1, cube.position[1], cube.position[2]] } : cube
            )
          );
          break;
      }
      // Emit the message to the server here if needed
    };

    window.addEventListener('keydown', handleKeyDown);

    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log(name, color, cubes)
    };
  }, [name, color, cubes, socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (name && color) {
      const newPosition: [number, number, number] = [0, 0, 0];
      setCubes([...cubes, { name, color, position: newPosition }]);
    }
  };


  return (
    <Canvas className='bg-green-500 h-screen'>
      <Html>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <button type="submit">Add Cube</button>
        </form>
      </Html>
        <Physics>
          {cubes.map((cube) => (
            <Cube key={cube.name} name={cube.name} color={cube.color} position={cube.position} />
          ))}
        </Physics>
      </Canvas>
    
  );
}

export default CanvasContainer;