import { useSelectedStation } from '@hooks/useSelectedStation';

import Box from '@common/Box';

import DetailedStation from '@ui/DetailedStationInfo/DetailedStation';

const DetailedStationInfo = () => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
  } = useSelectedStation();

  if (isSelectedStationLoading || isSelectedStationError) {
    return <></>;
  }

  return (
    <Box
      css={{
        position: 'fixed',
        left: '41rem',
        width: '34rem',
        zIndex: '999',
      }}
    >
      <DetailedStation station={selectedStation} />
    </Box>
  );
};

export default DetailedStationInfo;
