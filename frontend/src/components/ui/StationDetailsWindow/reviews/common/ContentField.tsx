import TextField from '@common/TextField';

import { MAX_REVIEW_CONTENT_LENGTH, MIN_REVIEW_CONTENT_LENGTH } from '@constants';

interface ContentFieldProps {
  content: string;
  setContent: (newContent: string) => void;
}

const ContentField = ({ content, setContent }: ContentFieldProps) => {
  return (
    <>
      <TextField
        label="글 작성하기"
        value={content}
        fullWidth
        supportingText={
          (content.length < MIN_REVIEW_CONTENT_LENGTH ||
            content.length > MAX_REVIEW_CONTENT_LENGTH) &&
          `${MIN_REVIEW_CONTENT_LENGTH}자 이상 ${MAX_REVIEW_CONTENT_LENGTH}자 이하로 작성해주세요.`
        }
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </>
  );
};

export default ContentField;
