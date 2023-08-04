import { useSelectedStation } from '@hooks/tanstack-query/station-details/useSelectedStation';

import Box from '@common/Box';
import Text from '@common/Text';

import { useAccordionAction } from '@ui/Accordion/hooks/useAccordionAction';
import DetailedStation from '@ui/DetailedStationInfo/DetailedStation';

const DetailedStationInfo = () => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
    isFetching,
  } = useSelectedStation();
  const { handleCloseLastPanel } = useAccordionAction();

  if (!isFetching && selectedStation === undefined) {
    handleCloseLastPanel();
  }

  if (isSelectedStationError || isSelectedStationLoading) {
    return (
      <Box
        css={{
          width: '34rem',
          zIndex: '999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text variant="h1">⌛</Text>
      </Box>
    );
  }

  return (
    <Box
      css={{
        width: '34rem',
        zIndex: '999',
        overflow: 'scroll',
      }}
    >
      <DetailedStation station={selectedStation} />
    </Box>
  );
};

export default DetailedStationInfo;
