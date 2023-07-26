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
    socket.emit('message', { name, color });
  }, [color, name, socket]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newPosition;
      switch (event.key) {
        case 'w':
          newPosition = cubes.find(cube => cube.name === name)?.position;
          newPosition && socket.emit('message', { name, color, position: [newPosition[0], newPosition[1], newPosition[2] + 1] });
          break;
        case 'a':
          newPosition = cubes.find(cube => cube.name === name)?.position;
          newPosition && socket.emit('message', { name, color, position: [newPosition[0] - 1, newPosition[1], newPosition[2]] });
          break;
        case 's':
          newPosition = cubes.find(cube => cube.name === name)?.position;
          newPosition && socket.emit('message', { name, color, position: [newPosition[0], newPosition[1], newPosition[2] - 1] });
          break;
        case 'd':
          newPosition = cubes.find(cube => cube.name === name)?.position;
          newPosition && socket.emit('message', { name, color, position: [newPosition[0] + 1, newPosition[1], newPosition[2]] });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [name, color, cubes, socket]);

  return (
    <Canvas className='bg-green-500 h-screen'>
      <Html>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
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