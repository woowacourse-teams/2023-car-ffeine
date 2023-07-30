import { getLocalStorage } from '@utils/storage';

import { BASE_URL, LOCAL_KEY_TOKEN } from '@constants';

interface ChargerReportConfirmationProps {
  stationId: number;
}

const ChargerReportConfirmation = ({ stationId }: ChargerReportConfirmationProps) => {
  const foo = async () => {
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

  return <div>충전기 진짜 신고할거냐?{stationId}</div>;
};

export default ChargerReportConfirmation;
