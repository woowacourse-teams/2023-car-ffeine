import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { modalActions } from '@stores/modalStore';

import Alert from '@common/Alert';
import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { BASE_URL, LOCAL_KEY_TOKEN } from '@constants';

interface ChargerReportConfirmationProps {
  stationId: number;
}

const fetchReportCharger = async (stationId: number) => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, -1);
  return fetch(`${BASE_URL}/stations/${stationId}/reports`, {
    method: 'POST',
    body: JSON.stringify({ stationId }),
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const ChargerReportConfirmation = ({ stationId }: ChargerReportConfirmationProps) => {
  const queryClient = useQueryClient();

  const chargerReportMutation = useMutation({
    mutationFn: fetchReportCharger,
    onSuccess: () => {
      alert('신고 완료');
      modalActions.closeModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['isStationChargerReported'] });
    },
  });

  const reportCharger = async () => {
    chargerReportMutation.mutate(stationId);
  };

  return (
    <Box p={2}>
      <Text variant="title" mb={3}>
        충전기의 상태가 실제와 다른가요?
      </Text>
      <Alert color="primary" text="앱에 표시된 정보가 실제와 차이가 나는 경우가 있습니다." />
      <FlexBox justifyContent="between">
        <Button size="md" onClick={() => modalActions.closeModal()}>
          생각해보니 문제 없는 것 같아요
        </Button>
        <Button size="md" onClick={() => reportCharger()}>
          제보하기
        </Button>
      </FlexBox>
    </Box>
  );
};

export default ChargerReportConfirmation;
