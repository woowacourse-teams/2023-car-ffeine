import { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import { useUpdateStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationChargerReport';

import Alert from '@common/Alert';
import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface ChargerReportConfirmationProps {
  stationId: string;
}

const ChargerReportConfirmation = ({ stationId }: ChargerReportConfirmationProps) => {
  const { updateStationChargerReport } = useUpdateStationChargerReport(stationId);
  const reportCharger = () => {
    updateStationChargerReport(stationId);
  };

  return (
    <Box p={4} css={chargerReportConfirmationCss}>
      <Text variant="title" mb={3}>
        표시된 정보가 실제 충전기 상태와 다를 수 있습니다.
      </Text>
      <Text my={4}>충전기가 고장나있다면 신고해주세요.</Text>
      <FlexBox justifyContent="between" nowrap>
        <ButtonNext
          variant="outlined"
          size="sm"
          fullWidth
          onClick={() => modalActions.closeModal()}
        >
          돌아가기
        </ButtonNext>
        <ButtonNext variant="contained" size="sm" fullWidth onClick={() => reportCharger()}>
          제보하기
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

const chargerReportConfirmationCss = css`
  width: 40rem;
`;

export default ChargerReportConfirmation;
