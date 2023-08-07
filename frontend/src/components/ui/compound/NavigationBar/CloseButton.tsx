import { ChevronLeftIcon } from '@heroicons/react/24/solid';

import Button from '@common/Button';

import { useNavigationBar } from './hooks/useNavigationBar';

const CloseButton = () => {
  const { handleClosePanel } = useNavigationBar();

  return (
    <Button variant="label" aria-label="검색창 닫기" onClick={handleClosePanel}>
      <ChevronLeftIcon width="2.4rem" stroke="#9c9fa7" />
    </Button>
  );
};

export default CloseButton;
