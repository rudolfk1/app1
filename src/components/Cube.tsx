import { useBox } from "use-cannon";
import { Text } from "@react-three/drei";


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