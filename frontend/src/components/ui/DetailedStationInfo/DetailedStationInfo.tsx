import { useSelectedStation } from '@hooks/useSelectedStation';

import Box from '@common/Box';

import DetailedStation from '@ui/DetailedStationInfo/DetailedStation';

const DetailedStationInfo = () => {
  const { data: station, isLoading, isError } = useSelectedStation();

  if (isLoading || isError) return <></>;

  return (
    <Box
      css={{
        position: 'fixed',
        left: '41rem',
        width: '34rem',
        zIndex: '999',
      }}
    >
      <DetailedStation station={station} />
    </Box>
  );
};

export default DetailedStationInfo;
