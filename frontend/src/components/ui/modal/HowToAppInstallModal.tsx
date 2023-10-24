import { XMarkIcon } from '@heroicons/react/24/outline';
import { FlexBox } from 'car-ffeine-design-system';

import { BsArrowDownSquare, BsPlusSquare } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { IoShareOutline } from 'react-icons/io5';
import { MdInstallDesktop, MdInstallMobile } from 'react-icons/md';

import { modalActions } from '@stores/layout/modalStore';

import useMediaQueries from '@hooks/useMediaQueries';

import Button from '@common/Button';
import Text from '@common/Text';

const HowToAppInstallModal = () => {
  const screen = useMediaQueries();

  return (
    <FlexBox
      maxWidth={40}
      width="calc(100vw - 4.8rem)"
      rowGap={2}
      pt={4}
      px={6}
      pb={9}
      direction="column"
    >
      <Button mt={1} mr={0} mb={-6} ml="auto" onClick={modalActions.closeModal}>
        <XMarkIcon width={28} />
      </Button>
      {screen.get('isMobile') ? (
        <></>
      ) : (
        <FlexBox direction="column" rowGap={2} mb={3}>
          <Text tag="h2" variant="h6">
            크롬 브라우저인가요?
          </Text>
          <FlexBox tag="p" alignItems="center">
            주소창 오른쪽에 위치한
            <MdInstallDesktop size={20} display="inline-block" /> 아이콘을 누르세요.
          </FlexBox>
          <Text tag="h3">아쉽게도 사파리는 지원하지 않습니다</Text>
        </FlexBox>
      )}
      <div>
        <Text tag="h2" variant="h6" mb={2}>
          IOS 모바일인가요?
        </Text>
        <FlexBox tag="p" alignItems="center" mb={2}>
          주소창 근처에 있는 <IoShareOutline size={20} />
          아이콘을 누르세요.
        </FlexBox>
        <FlexBox tag="p" alignItems="center">
          그리고 홈 화면에 추가 <BsPlusSquare size={20} />를 눌러주세요.
        </FlexBox>
      </div>
      <div>
        <Text tag="h2" variant="h6" mt={3} mb={2}>
          안드로이드인가요?
        </Text>
        <FlexBox tag="p" alignItems="center" mb={2}>
          주소창 오른쪽에 위치한 <BsArrowDownSquare size={20} />
          아이콘을 누르거나
        </FlexBox>
        <FlexBox tag="p" alignItems="center">
          <FiMoreVertical /> 아이콘을 누른 뒤, 앱 설치 버튼
          <MdInstallMobile size={20} />을 누르세요.
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default HowToAppInstallModal;
