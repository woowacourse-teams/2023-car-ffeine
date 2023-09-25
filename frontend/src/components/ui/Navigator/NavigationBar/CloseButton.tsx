import { ChevronLeftIcon } from '@heroicons/react/24/solid';

import Button from '@common/Button';

import { displayNoneInMobile } from '@style/mediaQuery';

import { useNavigationBar } from './hooks/useNavigationBar';

interface Props {
  canDisplay: boolean;
}

const CloseButton = ({ canDisplay }: Props) => {
  const { handleClosePanel } = useNavigationBar();

  if (!canDisplay) {
    return <></>;
  }

  return (
    <Button
      css={[{ top: '50%', transform: 'translate(0, -50%);' }, displayNoneInMobile]}
      variant="label"
      aria-label="검색창 닫기"
      onClick={handleClosePanel}
    >
      <ChevronLeftIcon width="2.4rem" fill="#5b5d62" stroke="#5b5d62" />
    </Button>
  );
};

export default CloseButton;
