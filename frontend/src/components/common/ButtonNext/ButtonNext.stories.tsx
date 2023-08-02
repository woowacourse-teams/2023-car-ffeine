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
        primary
      </ButtonNext>
      <ButtonNext variant="contained" color="secondary">
        secondary
      </ButtonNext>
      <ButtonNext variant="contained" color="info">
        info
      </ButtonNext>
      <ButtonNext variant="contained" color="success">
        success
      </ButtonNext>
      <ButtonNext variant="contained" color="warning">
        warning
      </ButtonNext>
      <ButtonNext variant="contained" color="error">
        error
      </ButtonNext>
      <ButtonNext variant="contained" color="dark">
        dark
      </ButtonNext>
      <ButtonNext variant="contained" color="light">
        light
      </ButtonNext>
      <ButtonNext variant="contained">None</ButtonNext>
    </>
  );
};
