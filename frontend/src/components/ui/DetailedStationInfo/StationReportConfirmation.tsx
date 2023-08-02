import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import { modalActions } from '@stores/modalStore';

import { useUpdateStationChargerReport } from '@hooks/useUpdateStationReport';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import StationInformation from '@ui/DetailedStationInfo/StationInformation';

import type { ChargerDetails, StationDetails } from '../../../types';

interface StationReportConfirmationProps {
  station: StationDetails;
}

export interface Differences {
  [key: string]: string | number | boolean | ChargerDetails[];
}

const StationReportConfirmation = ({ station }: StationReportConfirmationProps) => {
  const [form, setForm] = useState<StationDetails>({ ...station });
  const { updateStationReport } = useUpdateStationChargerReport();
  const handleChangeTextField = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [id]: value });
  };

  const handleClickButton = (key: 'isParkingFree' | 'isPrivate') => {
    setForm({ ...form, [key]: !form[key] });
  };

  const findDifferentKeys = (formStation: StationDetails, originStation: StationDetails) =>
    getTypedObjectKeys<StationDetails>(formStation).filter(
      (key) => formStation[key] !== originStation[key]
    );

  const reportCharger = async () => {
    const differentKeys = findDifferentKeys(form, station);
    const differencesArray: Differences[] = differentKeys.map((key) => ({
      category: key,
      reportedDetail: form[key],
    }));
    if (differencesArray.length > 0) {
      updateStationReport({ stationId: station.stationId, differences: differencesArray });
    } else {
      alert('수정된 항목이 없습니다.');
    }
  };

  return (
    <Box p={2}>
      <Text variant="title" mb={3}>
        개선할 충전소 정보가 있나요?
      </Text>
      <Box border>
        <StationInformation station={form} />
      </Box>

      <TextField
        id="address"
        label="도로명 주소"
        fullWidth
        value={form.address}
        onChange={handleChangeTextField}
      />
      <TextField
        id="detailLocation"
        label="상세주소"
        fullWidth
        value={form.detailLocation}
        onChange={handleChangeTextField}
      />
      <TextField
        id="operatingTime"
        label="운영시간"
        fullWidth
        value={form.operatingTime}
        onChange={handleChangeTextField}
      />
      <TextField
        id="contact"
        label="연락처"
        fullWidth
        value={form.contact}
        onChange={handleChangeTextField}
      />
      <Box>
        <Button onClick={() => handleClickButton('isParkingFree')}>
          <FlexBox alignItems="center">
            <input type="checkbox" checked={form.isParkingFree} />
            <Text>주차비 무료</Text>
          </FlexBox>
        </Button>
      </Box>
      <Box>
        <Button onClick={() => handleClickButton('isPrivate')}>
          <FlexBox alignItems="center">
            <input type="checkbox" checked={form.isPrivate} />
            <Text>사용 제한</Text>
          </FlexBox>
        </Button>
      </Box>
      <TextField
        id="privateReason"
        label="사용 제한 사유"
        fullWidth
        value={form.privateReason}
        onChange={handleChangeTextField}
      />

      <FlexBox justifyContent="between">
        <Button size="md" onClick={() => modalActions.closeModal()}>
          저장하지 않고 닫을래요
        </Button>
        <Button size="md" onClick={() => reportCharger()}>
          제안하기
        </Button>
      </FlexBox>
    </Box>
  );
};

export default StationReportConfirmation;
