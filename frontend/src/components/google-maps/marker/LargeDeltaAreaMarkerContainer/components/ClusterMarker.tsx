import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface ClusterMarkerProps {
  count: number;
}

const ClusterMarker = ({ count }: ClusterMarkerProps) => {
  return (
    <FlexBox
      p={6}
      borderRadius="50%"
      bgColor="#D9E5FF"
      width="100px"
      height="100px"
      justifyContent="center"
      alignItems="center"
      css={{ border: '1px solid #3366FF' }}
    >
      <Text fontSize={2}>{count}</Text>
    </FlexBox>
  );
};

export default ClusterMarker;
