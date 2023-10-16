import { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import Button from '@common/Button';
import Text from '@common/Text';

import { MOBILE_BREAKPOINT } from '@constants';

import DeveloperModeModal from './modal/DeveloperModeModal';

const DataDownloader = () => {
  const handleClickDeveloperMode = () => {
    modalActions.openModal(<DeveloperModeModal />);
  };

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <Button onClick={handleClickDeveloperMode} css={buttonCss}>
          <Text variant="caption" css={{ wordBreak: 'keep-all' }}>
            DB 다운
          </Text>
        </Button>
      )}
    </>
  );
};

const buttonCss = css`
  position: fixed;
  bottom: 3.2rem;
  right: 6.4rem;
  z-index: 99;

  width: 4.2rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    bottom: 9.6rem;
  }

  height: 4.2rem;
  border: 1.8px solid #e3e8f7;
`;

export default DataDownloader;
