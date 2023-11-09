import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface StyledClusterMarkerProps {
  count: number;
}

const StyledClusterMarker = ({ count }: StyledClusterMarkerProps) => {
  return (
    <FlexBox
      p={4}
      borderRadius="50%"
      bgColor="#d9e5ffcb"
      width="70px"
      height="70px"
      justifyContent="center"
      alignItems="center"
      border
      borderColor="#3366FF"
      borderWidth="1px"
    >
      <Text tag="span" fontSize={2}>
        {count}
      </Text>
    </FlexBox>
  );
};

export default StyledClusterMarker;
