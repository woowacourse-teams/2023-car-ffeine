import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { getLocalStorage, setLocalStorage } from '@utils/storage';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import {
  LOCAL_KEY_GOOGLE_MAPS_API,
  LOCAL_KEY_GOOGLE_MAPS_API_LAST_LOGIN,
  LOCAL_KEY_GOOGLE_MAPS_API_SAVE,
} from '@constants';

interface ApiKeyCheckerProps {
  render: (apiKey: string) => ReactNode;
}

function ApiKeyChecker({ render }: ApiKeyCheckerProps) {
  const [apiKey, setApiKey] = useState('');
  const [value, setValue] = useState('');
  const [isSaveMode, setSaveMode] = useState(true);

  useEffect(() => {
    const isSaving = getLocalStorage<boolean>(LOCAL_KEY_GOOGLE_MAPS_API_SAVE, true);
    setSaveMode(isSaving);
    if (isSaving) {
      const backupKey = getLocalStorage<string>(LOCAL_KEY_GOOGLE_MAPS_API, '');
      setValue(backupKey);
    }
  }, []);

  const onClick = () => {
    if (value.length > 0) {
      if (isSaveMode) {
        setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API, value);
      } else {
        setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API, '');
      }
      setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API_LAST_LOGIN, new Date().getTime());
      setApiKey(value);
    } else {
      alert('제대로 된 키를 입력하셔야 합니다.');
    }
  };

  return (
    <div>
      {apiKey.length > 0 ? (
        render(apiKey)
      ) : (
        <FlexBox
          className={'modal-open'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100vh'}
        >
          <Box border p={10}>
            <TextField
              width={100}
              label="google maps API키를 입력하세요"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <FlexBox justifyContent={'between'}>
              <FlexBox alignItems={'center'}>
                <input
                  type="checkbox"
                  checked={isSaveMode}
                  onChange={(e) => {
                    setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API_SAVE, e.target.checked);
                    setSaveMode(e.target.checked);
                  }}
                />
                <Text>키를 브라우저에 저장하기</Text>
              </FlexBox>
              <Button size={'md'} outlined onClick={onClick}>
                전송하기
              </Button>
            </FlexBox>
          </Box>
        </FlexBox>
      )}
    </div>
  );
}

export default ApiKeyChecker;
