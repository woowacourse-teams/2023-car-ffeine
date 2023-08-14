import { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import { useUpdateStationReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StationReportConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportConfirmation';
import StationInformation from '@ui/StationDetailsWindow/station/StationInformation';

import type { StationDetails } from '@type';

interface StationReportPreConfirmationProps {
  station: StationDetails;
}

const StationReportPreConfirmation = ({ station }: StationReportPreConfirmationProps) => {
  const { updateStationReport, isLoading } = useUpdateStationReport();

  const reportCharger = () => {
    updateStationReport({ stationId: station.stationId, differences: [] });
  };

  const handleReportMoreButton = () => {
    modalActions.openModal(<StationReportConfirmation station={station} />);
  };

  const handleCloseModalButton = () => modalActions.closeModal();

  return (
    <Box p={4} css={stationReportPreConfirmationCss}>
      <Text variant="title" mb={5}>
        개선할 충전소 정보가 있나요?
      </Text>
      <Box border p={4}>
        <StationInformation station={station} />
      </Box>
      <ButtonNext
        my={6}
        fullWidth
        variant="contained"
        size="md"
        color="primary"
        onClick={handleReportMoreButton}
      >
        데이터를 직접 수정/제안하고 싶어요
      </ButtonNext>
      <FlexBox nowrap>
        <ButtonNext
          fullWidth
          variant="outlined"
          size="sm"
          color="error"
          onClick={handleCloseModalButton}
        >
          닫기
        </ButtonNext>
        <ButtonNext
          disabled={isLoading}
          fullWidth
          variant="outlined"
          size="sm"
          color="success"
          onClick={reportCharger}
        >
          {isLoading ? '처리중...' : '그냥 제보하기'}
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

const stationReportPreConfirmationCss = css`
  width: 40rem;
`;

export default StationReportPreConfirmation;
