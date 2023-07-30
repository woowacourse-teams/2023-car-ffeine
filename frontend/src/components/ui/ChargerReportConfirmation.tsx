import { getLocalStorage } from '@utils/storage';

import { modalActions } from '@stores/modalStore';

import Box from '@common/Box';
import Button from '@common/Button';
import Text from '@common/Text';

import { BASE_URL, LOCAL_KEY_TOKEN } from '@constants';

interface ChargerReportConfirmationProps {
  stationId: number;
}

const ChargerReportConfirmation = ({ stationId }: ChargerReportConfirmationProps) => {
  const reportCharger = async () => {
    const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, -1);
    await fetch(`${BASE_URL}/stations/${stationId}/reports`, {
      method: 'POST',
      body: JSON.stringify({ stationId }),
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Box p={2}>
      <Text variant="title">충전기의 상태가 실제와 다르나요?</Text>
      <Button size="md" outlined onClick={() => modalActions.closeModal()}>
        생각해보니 문제 없는 것 같아요
      </Button>
      <Button size="md" outlined onClick={() => reportCharger()}>
        제보하기
      </Button>
    </Box>
  );
};

export default ChargerReportConfirmation;
