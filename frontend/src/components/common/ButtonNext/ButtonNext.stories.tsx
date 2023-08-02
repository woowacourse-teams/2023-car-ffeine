import Box from '@common/Box';
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
export const Size = () => {
  return (
    <>
      <ButtonNext size="sm">Text</ButtonNext>
      <ButtonNext size="md">Outlined</ButtonNext>
      <ButtonNext size="lg">Contained</ButtonNext>
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Box>
        <ButtonNext variant="contained" color="primary">
          primary
        </ButtonNext>
        <ButtonNext variant="outlined" color="primary">
          primary
        </ButtonNext>
        <ButtonNext variant="text" color="primary">
          primary
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="secondary">
          secondary
        </ButtonNext>
        <ButtonNext variant="outlined" color="secondary">
          secondary
        </ButtonNext>
        <ButtonNext variant="text" color="secondary">
          secondary
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="info">
          info
        </ButtonNext>
        <ButtonNext variant="outlined" color="info">
          info
        </ButtonNext>
        <ButtonNext variant="text" color="info">
          info
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="success">
          success
        </ButtonNext>
        <ButtonNext variant="outlined" color="success">
          success
        </ButtonNext>
        <ButtonNext variant="text" color="success">
          success
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="warning">
          warning
        </ButtonNext>
        <ButtonNext variant="outlined" color="warning">
          warning
        </ButtonNext>
        <ButtonNext variant="text" color="warning">
          warning
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="error">
          error
        </ButtonNext>
        <ButtonNext variant="outlined" color="error">
          error
        </ButtonNext>
        <ButtonNext variant="text" color="error">
          error
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="dark">
          dark
        </ButtonNext>
        <ButtonNext variant="outlined" color="dark">
          dark
        </ButtonNext>
        <ButtonNext variant="text" color="dark">
          dark
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="light">
          light
        </ButtonNext>
        <ButtonNext variant="outlined" color="light">
          light
        </ButtonNext>
        <ButtonNext variant="text" color="light">
          light
        </ButtonNext>
      </Box>
      <ButtonNext>None</ButtonNext>
    </>
  );
};

export const Disabled = () => {
  return <ButtonNext disabled>사용할 수 없는 버튼</ButtonNext>;
};

export const NoTheme = () => {
  return <ButtonNext noTheme>테마가 모두 사라져버린 버튼</ButtonNext>;
};
