import styled from '@emotion/styled';
import type { Meta } from '@storybook/react';

import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import { borderStyleArgTypes } from '@common/Container/style/container.style';
import Text from '@common/Text';
import { sizeArgTypes } from '@common/styles/size';
import { spacingArgTypes } from '@common/styles/spacing';

import type { FlexContainerProps } from './FlexContainer';
import FlexContainer from './FlexContainer';
import { LAYOUT } from './styles/flexContainer.style';

const generateChildrenBoxes = () => {
  const BOX_COUNT = 6;

  const boxes = Array.from({ length: BOX_COUNT }, (_, index) => {
    return <Text key={index}>Box{index + 1}</Text>;
  });

  return boxes;
};

const meta = {
  title: 'Layout/FlexContainer',
  component: FlexContainer,
  parameters: {
    docs: {
      description: {
        component: 'CSS Flex 속성을 이용해 자식 컴포넌트들을 유연하게 배열할 수 있습니다.',
      },
    },
  },
  args: {
    direction: 'row',
    wrap: false,
    reverse: false,
    gap: '0px',
    maxWidth: '340px',
    fluid: false,
    gutter: false,
    position: 'center',
    children: generateChildrenBoxes(),
  },
  argTypes: {
    gap: {
      control: {
        type: 'text',
      },
      description: `Flex Container 안의 박스가 여러 개일 경우, 박스 사이의 행/열 여백 변경 가능
      <br />- [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
      <br />&nbsp; 🔶 스토리북에서는 string 🔶
      <br />- [number] 숫자만 적을 경우 px로 자동 변환`,
    },
    rowGap: {
      control: {
        type: 'text',
      },
      description: `Flex Container 안의 박스가 여러 개일 경우, 박스 사이의 행 여백 변경 가능
      <br />- [string] 단위까지 적어줘야 함 (ex. 8px)
      <br />&nbsp; 🔶 스토리북에서는 string 🔶
      <br />- [number] 숫자만 적을 경우 px로 자동 변환`,
    },
    columnGap: {
      control: {
        type: 'text',
      },
      description: `Flex Container 안의 박스가 여러 개일 경우, 박스 사이의 열 여백 변경 가능
      <br />- [string] 단위까지 적어줘야 함 (ex. 8px)
      <br />&nbsp; 🔶 스토리북에서는 string 🔶
      <br />- [number] 숫자만 적을 경우 px로 자동 변환`,
    },
    children: {
      control: false,
    },
    tag: {
      control: false,
    },
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
    ...borderStyleArgTypes,
    ...sizeArgTypes,
    ...spacingArgTypes,
  },
} satisfies Meta<typeof FlexContainer>;

export default meta;

const ContainerForStorybook = styled(FlexContainer)`
  height: 10rem;
  border: 2px solid #32affd;

  & > * {
    width: fit-content;
    height: fit-content;
    padding: 0.4rem 1.6rem;
    border: 2px solid #fb709f;
  }
`;

export const Default = ({ ...args }: FlexContainerProps) => {
  return <ContainerForStorybook {...args} />;
};

const ContainerWithNoHeightBoxes = styled(ContainerForStorybook)`
  & > * {
    height: initial;
  }
`;

export const DefaultWithNoHeightBoxes = ({ ...args }: FlexContainerProps) => {
  return <ContainerWithNoHeightBoxes {...args} />;
};

const layoutList = getTypedObjectKeys(LAYOUT);
const SubTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 500;
  color: #035d95;
`;

export const Layout = () => {
  return (
    <>
      <SubTitle>➡️&nbsp; Direction: Row</SubTitle>
      <FlexContainer tag="section" gap="28px 12px" wrap mb={7.2}>
        {layoutList.map((layout, index) => {
          return (
            <div key={index}>
              <Text tag="h3" variant="h5" mb={2}>
                {layout}
              </Text>
              <ContainerForStorybook layout={layout} minWidth={20}>
                <Text>Box</Text>
                <Text>Box</Text>
              </ContainerForStorybook>
            </div>
          );
        })}
      </FlexContainer>

      <SubTitle>⬇️&nbsp; Direction: Column</SubTitle>
      <FlexContainer tag="section" gap="28px 12px" wrap>
        {layoutList.map((layout, index) => {
          return (
            <div key={index}>
              <Text tag="h3" variant="h5" mb={7.2}>
                {layout}
              </Text>
              <ContainerForStorybook layout={layout} direction="column" minWidth={20}>
                <Text>Box</Text>
                <Text>Box</Text>
              </ContainerForStorybook>
            </div>
          );
        })}
      </FlexContainer>
    </>
  );
};

export const ExampleHeader = () => {
  return (
    <ContainerForStorybook tag="header" layout="centerLeft" columnGap={1.2} px={1.6}>
      <Text tag="h1" variant="h6">
        로고
      </Text>
      {Array.from({ length: 4 }, (_, index) => (
        <p key={index}>메뉴{index + 1}</p>
      ))}
      <button type="button" aria-label="로그인" css={{ marginLeft: 'auto' }}>
        로그인
      </button>
    </ContainerForStorybook>
  );
};
