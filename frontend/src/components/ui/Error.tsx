import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface ErrorProps {
  fontSize?: number | string;
  title: string;
  message: string;
  subMessage?: string;
  handleRetry?: () => void;
  minHeight?: string | number;
}

const Error = ({ title, message, subMessage, handleRetry, fontSize, minHeight }: ErrorProps) => {
  return (
    <FlexBox
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
      css={{
        fontSize: typeof fontSize === 'string' ? fontSize : `${fontSize}rem`,
      }}
    >
      <Box css={{ wordBreak: 'keep-all' }}>
        <Text align="center" css={{ fontSize: '10em', fontWeight: 'bold' }} mb={7}>
          {title}
        </Text>
        <Text align="center" mb={2}>
          {message}
        </Text>
        <Text align="center">{subMessage}</Text>
        <FlexBox justifyContent="center">
          <ButtonNext
            aria-label="다시 시도하기"
            onClick={handleRetry}
            variant="outlined"
            color="dark"
            size="xs"
            mt={6}
            mb={8}
          >
            다시 시도하기
          </ButtonNext>
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
export default Error;
