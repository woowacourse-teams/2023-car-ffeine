import { useStationDetails } from '@hooks/tanstack-query/station-details/useStationDetails';

import Box from '@common/Box';
import Text from '@common/Text';

import { useAccordionAction } from '@ui/Accordion/hooks/useAccordionAction';
import StationDetailsView from '@ui/StationDetailsWindow/StationDetailsView';

const StationDetailsWindow = () => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
    isFetching,
  } = useStationDetails();
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
      <StationDetailsView station={selectedStation} />
    </Box>
  );
};

export default StationDetailsWindow;
