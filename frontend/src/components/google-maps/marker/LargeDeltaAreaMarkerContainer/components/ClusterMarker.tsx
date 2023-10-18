import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface ClusterMarkerProps {
  count: number;
}

const ClusterMarker = ({ count }: ClusterMarkerProps) => {
  return (
    <FlexBox
      p={4}
      borderRadius="50%"
      bgColor="#D9E5FF"
      width="70px"
      height="70px"
      justifyContent="center"
      alignItems="center"
      border={true}
      borderColor="#3366FF"
      borderWidth="1px"
    >
      <Text tag="span" fontSize={2}>
        {count}
      </Text>
    </FlexBox>
  );
};

export default ClusterMarker;
