import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportPreConfirmation';

import type { StationDetails } from '@type';

import ReportButton from '../ReportButton';

interface StationReportButtonProps {
  station: StationDetails;
}

const StationReportButton = ({ station }: StationReportButtonProps) => {
  return (
    <ReportButton
      css={calculatedButtonWidthCss}
      modalContent={<StationReportPreConfirmation station={station} />}
    >
      <MegaphoneIcon width={20} stroke="#666" aria-hidden />
      잘못된 충전소 정보 제보
    </ReportButton>
  );
};

const calculatedButtonWidthCss = css`
  width: calc(100% - 1.6px * 2);
`;

export default StationReportButton;
