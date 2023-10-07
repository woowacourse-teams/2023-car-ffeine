import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import type { FlexBoxProps } from '@common/FlexBox/FlexBox';
import Text from '@common/Text';

export interface ErrorProps extends Partial<FlexBoxProps> {
  fontSize?: number | string;
  title: string;
  message: string;
  subMessage?: string;
  handleRetry?: () => void;
}

const Error = ({ title, message, subMessage, handleRetry, fontSize, ...props }: ErrorProps) => {
  return (
    <FlexBox
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      {...props}
      css={{
        fontSize: typeof fontSize === 'string' ? fontSize : `${fontSize}rem`,
      }}
    >
      <Box css={{ wordBreak: 'keep-all' }}>
        <Text align="center" weight="bold" css={{ fontSize: '10em' }} mb={7}>
          {title}
        </Text>
        <Text align="center" mb={1}>
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
            fullWidth
            mt={6}
            mb={8}
            py={1}
          >
            다시 시도하기
          </ButtonNext>
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
export default Error;
