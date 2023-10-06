import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { RegionName } from '../types';

export interface RegionMarkerProps {
  count: number;
  regionName: RegionName;
}

const RegionMarker = ({ count, regionName }: RegionMarkerProps) => {
  return (
    <FlexBox
      justifyContent="between"
      alignItems="center"
      gap={1}
      p={1}
      style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #2a6cd8',
      }}
    >
      <Box
        bgColor="#d0e1fa"
        px={1}
        py={0.5}
        css={{
          borderRadius: '4px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        {count}
      </Box>
      <Text variant="label" weight="bold">
        {regionName}
      </Text>
    </FlexBox>
  );
};

export default RegionMarker;
