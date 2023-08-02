import ButtonNext from '@common/ButtonNext';
import type { ButtonNextProps } from '@common/ButtonNext/ButtonNext';

const meta = {
  title: 'Components/ButtonNext',
  component: ButtonNext,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};
export default meta;

export const Default = (args: ButtonNextProps) => {
  return <ButtonNext {...args}>Button</ButtonNext>;
};

export const Variant = () => {
  return (
    <>
      <ButtonNext variant="text">Text</ButtonNext>
      <ButtonNext variant="outlined">Outlined</ButtonNext>
      <ButtonNext variant="contained">Contained</ButtonNext>
    </>
  );
};
export const Colors = () => {
  return (
    <>
      <ButtonNext variant="contained" color="primary">
        Contained
      </ButtonNext>
      <ButtonNext variant="contained" color="warning">
        Contained
      </ButtonNext>
      <ButtonNext variant="contained" color="secondary">
        Contained
      </ButtonNext>
    </>
  );
};
