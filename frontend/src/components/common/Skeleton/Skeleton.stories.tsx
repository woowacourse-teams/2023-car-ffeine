import Box from '@common/Box';

import type { SkeletonProps } from './Skeleton';
import Skeleton from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    height: '100px',
    width: '250px',
    borderRadius: '6px',
  },
  argTypes: {
    height: {
      control: {
        type: 'text',
      },
      description: '높이를 지정할 수 있습니다. 기본 값은 1rem 입니다.',
    },
    width: {
      control: {
        type: 'text',
      },
      description: '높이를 지정할 수 있습니다. 기본 값은 100% 입니다.',
    },
    borderRadius: {
      control: {
        type: 'text',
      },
      description: '모서리의 둥근 정도를 설정할 수 있습니다. 기본 값은 6px 입니다.',
    },
  },
};

export default meta;

export const Default = (args: SkeletonProps) => {
  return <Skeleton {...args} />;
};

export const Example = () => {
  return (
    <>
      <Box mb={2}>
        <Skeleton />
      </Box>
      <Box mb={2}>
        <Skeleton width="40rem" height="30rem" />
      </Box>
      <Skeleton width="100px" height="100px" borderRadius="50%" />
    </>
  );
};
