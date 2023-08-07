import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { modalActions } from '@stores/layout/modalStore';

import { useUpdateStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import StationInformation from '@ui/StationDetailsWindow/StationInformation';
import { findDifferentKeys } from '@ui/StationDetailsWindow/reports/domain';

import type { ChargerDetails } from '@type/chargers';
import type { StationDetails, StationDetailsWithoutChargers } from '@type/stations';

interface StationReportConfirmationProps {
  station: StationDetails;
}

export interface Differences {
  [key: string]: string | number | boolean | ChargerDetails[];
}

const StationReportConfirmation = ({ station }: StationReportConfirmationProps) => {
  const { chargers, ...stationWithoutChargers } = station;
  const [form, setForm] = useState<StationDetailsWithoutChargers>({ ...stationWithoutChargers });
  const { updateStationReport } = useUpdateStationChargerReport();
  const handleChangeTextField = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [id]: value });
  };

  const handleClickButton = (key: 'isParkingFree' | 'isPrivate') => {
    setForm({ ...form, [key]: !form[key] });
  };

  const reportCharger = () => {
    const differentKeys = findDifferentKeys(form, stationWithoutChargers);
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

  const handleCloseModalButton = () => modalActions.closeModal();

  return (
    <Box p={2}>
      <Text variant="title" mb={3}>
        개선할 충전소 정보가 있나요?
      </Text>
      <Text variant="label">변경사항 미리보기</Text>
      <Box border mt={2} mb={10}>
        <StationInformation station={{ chargers: [], ...form }} />
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
        <ButtonNext noTheme onClick={() => handleClickButton('isParkingFree')}>
          <FlexBox alignItems="center">
            <input type="checkbox" checked={form.isParkingFree} />
            <Text>주차비 무료</Text>
          </FlexBox>
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext noTheme onClick={() => handleClickButton('isPrivate')}>
          <FlexBox alignItems="center">
            <input type="checkbox" checked={form.isPrivate} />
            <Text>사용 제한</Text>
          </FlexBox>
        </ButtonNext>
      </Box>
      <TextField
        id="privateReason"
        label="사용 제한 사유"
        fullWidth
        value={form.privateReason}
        onChange={handleChangeTextField}
      />

      <FlexBox justifyContent="between" nowrap>
        <ButtonNext
          variant="outlined"
          color="error"
          size="md"
          fullWidth
          onClick={handleCloseModalButton}
        >
          저장하지 않고 닫을래요
        </ButtonNext>
        <ButtonNext variant="contained" color="success" size="md" fullWidth onClick={reportCharger}>
          제안하기
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

export default StationReportConfirmation;
