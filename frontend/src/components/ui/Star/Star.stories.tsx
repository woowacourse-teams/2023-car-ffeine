import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Text from '@common/Text';

import Star from '@ui/Star';
import type { StarProps } from '@ui/Star/Star';

const meta = {
  title: 'UI/Star',
  component: Star,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
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
