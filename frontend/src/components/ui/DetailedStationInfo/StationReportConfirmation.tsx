import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { modalActions } from '@stores/modalStore';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import StationInformation from '@ui/DetailedStationInfo/StationInformation';

import type { StationDetails } from '../../../types';

interface StationReportConfirmationProps {
  station: StationDetails;
}

const StationReportConfirmation = ({ station }: StationReportConfirmationProps) => {
  const [form, setForm] = useState({ ...station });

  const reportCharger = async () => {
    alert(`report this station's information: ${JSON.stringify(form)}`);
  };

  const handleChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleClickButton = (key: 'isParkingFree' | 'isPrivate') => {
    setForm({ ...form, [key]: !form[key] });
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
