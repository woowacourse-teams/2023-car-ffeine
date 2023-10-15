import Box from '@common/Box';
import Text from '@common/Text';

export interface FooMarkerProps {
  count: number;
}

const FooMarker = ({ count }: FooMarkerProps) => {
  return (
    <Box p={6} borderRadius="50%" bgColor="#D9E5FF">
      <Text fontSize={2}>{count}</Text>
    </Box>
  );
};

export default FooMarker;
