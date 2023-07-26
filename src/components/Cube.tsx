import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { mesh, useBox } from '@react-three/fiber'; // Import mesh and useBox from @react-three/fiber
import { BoxBufferGeometry, MeshStandardMaterial } from 'three'; // Import BoxBufferGeometry and MeshStandardMaterial from three.js

interface CubeProps {
  color: string;
  position: [number, number, number];
  name: string;
}

export const Cube: React.FC<CubeProps> = (props) => {
  const [ref] = useBox(() => ({ mass: 1, position: props.position }));

  return (
    <>
      <mesh ref={ref}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
      <Text position={[props.position[0], props.position[1] + 1.5, props.position[2]]} fontSize={0.5}>
        {props.name}
      </Text>
    </>
  );
};