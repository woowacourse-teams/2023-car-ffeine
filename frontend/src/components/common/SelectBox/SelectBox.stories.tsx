import styled from 'styled-components';

import { useState } from 'react';

import Text from '@common/Text';

import SelectBox from './SelectBox';

const meta = {
  title: 'Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;

const Container = styled.div`
  width: 300px;
  height: 1000px;
  margin: 20px auto;
`;

const options = [
  { value: 'IONIC5', label: '아이오닉5' },
  { value: 'TSLA3', label: '테슬라3' },
  { value: 'tajiri', label: '지리자동차' },
];

export const Default = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <Container>
      <Text>selectedValue: {selectedValue}</Text>
      <SelectBox options={options} onChange={handleSelectChange} value={selectedValue} />
    </Container>
  );
};
