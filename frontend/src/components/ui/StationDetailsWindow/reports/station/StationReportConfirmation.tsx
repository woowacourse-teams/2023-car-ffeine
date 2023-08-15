import { css } from 'styled-components';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { modalActions } from '@stores/layout/modalStore';

import { useUpdateStationReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import { findDifferentKeys } from '@ui/StationDetailsWindow/reports/station/domain';
import StationInformation from '@ui/StationDetailsWindow/station/StationInformation';

import {
  FORM_ADDRESS_LENGTH_LIMIT,
  FORM_CONTACT_LENGTH_LIMIT,
  FORM_DETAIL_LOCATION_LENGTH_LIMIT,
  FORM_OPERATING_TIME_LENGTH_LIMIT,
  FORM_PRIVATE_REASON_LENGTH_LIMIT,
} from '@constants';

import type { ChargerDetails } from '@type/chargers';
import type { StationDetails, StationDetailsWithoutChargers } from '@type/stations';

interface StationReportConfirmationProps {
  station: StationDetails;
}

export interface Differences {
  [key: string]: string | number | boolean | ChargerDetails[];
}

const validateForm = (form: StationDetailsWithoutChargers) => {
  if (!form) {
    return true;
  }

  return (
    (!form.address || form.address.length <= FORM_ADDRESS_LENGTH_LIMIT) &&
    (!form.detailLocation || form.detailLocation.length <= FORM_DETAIL_LOCATION_LENGTH_LIMIT) &&
    (!form.operatingTime || form.operatingTime.length <= FORM_OPERATING_TIME_LENGTH_LIMIT) &&
    (!form.contact || form.contact.length <= FORM_CONTACT_LENGTH_LIMIT) &&
    (!form.privateReason || form.privateReason.length <= FORM_PRIVATE_REASON_LENGTH_LIMIT)
  );
};

const StationReportConfirmation = ({ station }: StationReportConfirmationProps) => {
  const { chargers, ...stationWithoutChargers } = station;
  const [form, setForm] = useState<StationDetailsWithoutChargers>({ ...stationWithoutChargers });
  const { updateStationReport, isLoading } = useUpdateStationReport();
  const isFormValid = validateForm(form);

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
    <Box p={4} css={stationReportConfirmationCss}>
      <Text variant="title" mb={6}>
        개선할 충전소 정보가 있나요?
      </Text>
      <Text variant="subtitle" mb={2}>
        변경사항 미리보기
      </Text>
      <Box border p={4}>
        <StationInformation station={{ chargers: [], ...form }} />
      </Box>
      <TextField
        id="address"
        label="도로명 주소"
        fullWidth
        value={form.address}
        onChange={handleChangeTextField}
        supportingText={
          form.address?.length > FORM_ADDRESS_LENGTH_LIMIT &&
          `${FORM_ADDRESS_LENGTH_LIMIT}자 이내로 작성해주셔야 합니다.`
        }
      />
      <TextField
        id="detailLocation"
        label="상세주소"
        fullWidth
        value={form.detailLocation}
        onChange={handleChangeTextField}
        supportingText={
          form.detailLocation?.length > FORM_DETAIL_LOCATION_LENGTH_LIMIT &&
          `${FORM_DETAIL_LOCATION_LENGTH_LIMIT}자 이내로 작성해주셔야 합니다.`
        }
      />
      <TextField
        id="operatingTime"
        label="운영시간"
        fullWidth
        value={form.operatingTime}
        onChange={handleChangeTextField}
        supportingText={
          form.operatingTime?.length > FORM_OPERATING_TIME_LENGTH_LIMIT &&
          `${FORM_OPERATING_TIME_LENGTH_LIMIT}자 이내로 작성해주셔야 합니다.`
        }
      />
      <TextField
        id="contact"
        label="연락처"
        fullWidth
        value={form.contact}
        onChange={handleChangeTextField}
        supportingText={
          form.contact?.length > FORM_CONTACT_LENGTH_LIMIT &&
          `${FORM_CONTACT_LENGTH_LIMIT}자 이내로 작성해주셔야 합니다.`
        }
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
        supportingText={
          form.privateReason?.length > FORM_PRIVATE_REASON_LENGTH_LIMIT &&
          `${FORM_PRIVATE_REASON_LENGTH_LIMIT}자 이내로 작성해주셔야 합니다.`
        }
      />

      <FlexBox justifyContent="between" nowrap>
        <ButtonNext variant="outlined" size="md" fullWidth onClick={handleCloseModalButton}>
          돌아가기
        </ButtonNext>
        {isFormValid ? (
          <ButtonNext
            disabled={isLoading}
            variant="contained"
            size="md"
            fullWidth
            onClick={reportCharger}
          >
            {isLoading ? '처리중...' : '제안하기'}
          </ButtonNext>
        ) : (
          <ButtonNext disabled variant="contained" size="md" fullWidth>
            다시확인해주세요
          </ButtonNext>
        )}
      </FlexBox>
    </Box>
  );
};

const stationReportConfirmationCss = css`
  width: 40rem;
`;

export default StationReportConfirmation;
