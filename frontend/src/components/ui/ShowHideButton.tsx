import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface Props {
  name?: '더보기' | '닫기';
  onClick: () => void;
}
/**
 * @param name [기본값] 더보기
 * @returns 더보기 버튼 | 닫기 버튼
 */
const ShowHideButton = ({ name = '더보기', onClick }: Props) => {
  return (
    <Button width="100%" css={buttonContainer} onClick={onClick}>
      <FlexBox layout="center">
        <Text>{name}</Text>
        {name === '더보기' ? <ChevronDownIcon width={20} /> : <ChevronUpIcon width={20} />}
      </FlexBox>
    </Button>
  );
};

const buttonContainer = css`
  & svg {
    padding-top: 2px;
  }
`;

export default ShowHideButton;
