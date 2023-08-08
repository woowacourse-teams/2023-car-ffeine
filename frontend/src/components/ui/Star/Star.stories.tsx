import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Text from '@common/Text';

import Star from '@ui/Star';
import type { StarProps } from '@ui/Star/Star';

const meta = {
  title: 'UI/Star',
  component: Star,
  tags: ['autodocs'],
  args: {
    isSelected: false,
    onClick: () => {
      alert('제가 눌렸어요!!!');
    },
    size: 'md',
  },
  argTypes: {
    isSelected: {
      description: '별에 불을 들어오게 하는 역할을 합니다.',
    },
    onClick: {
      description: '눌렀을 때 반응하도록 할 수 있습니다.',
    },
    size: {
      description: '크기를 지정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Star>;

export default meta;

export const Default = (args: StarProps) => {
  return <Star {...args} />;
};

export const Controllable = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <Text variant="h1">현재 상태: {isSelected ? '반짝반짝 작은별' : '죽은별'}</Text>
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} />
    </div>
  );
};
export const Sizes = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} size="xs" />
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} size="sm" />
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} size="md" />
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} size="lg" />
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} size="xl" />
      <Star isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} size="xxl" />
    </div>
  );
};
