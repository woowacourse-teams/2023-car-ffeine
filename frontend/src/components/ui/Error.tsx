import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface ErrorProps {
  title: string;
  message: string;
  subMessage?: string;
  handleRetry?: () => void;
  minHeight?: string | number;
}

const Error = ({ title, message, subMessage, handleRetry, minHeight }: ErrorProps) => {
  return (
    <FlexBox
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <Box>
        <Text align="center" css={{ fontSize: '10rem', fontWeight: 'bold' }} mb={7}>
          {title}
        </Text>
        <Text align="center" mb={2}>
          {message}
        </Text>
        <Text align="center">{subMessage}</Text>
        <FlexBox justifyContent="center">
          <ButtonNext onClick={handleRetry} variant="outlined" color="dark" size="xs" my={2}>
            다시 시도하기
          </ButtonNext>
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
export default Error;
