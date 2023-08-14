import TextField from '@common/TextField';

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
          (content.length < 5 || content.length > 100) && '5자 이상 100자 이하로 작성해주세요.'
        }
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </>
  );
};

export default ContentField;
