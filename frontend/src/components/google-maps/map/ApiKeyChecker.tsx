import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { getLocalStorage, setLocalStorage } from '@utils/storage';

import Box from '@common/Box';
import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import TextField from '@common/TextField';

import { LOCAL_KEY_GOOGLE_MAPS_API, LOCAL_KEY_GOOGLE_MAPS_API_LAST_LOGIN } from '@constants';

interface ApiKeyCheckerProps {
  render: (apiKey: string) => ReactNode;
}

function ApiKeyChecker({ render }: ApiKeyCheckerProps) {
  const [apiKey, setApiKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const backupKey = getLocalStorage<string>(LOCAL_KEY_GOOGLE_MAPS_API, '');
    setValue(backupKey);

    const lastLoginTime = getLocalStorage<number>(LOCAL_KEY_GOOGLE_MAPS_API_LAST_LOGIN, -1);
    if ((new Date().getTime() - lastLoginTime) / (1000 * 60) <= 60) {
      console.log('60분 이내에 재접속');
      setApiKey(backupKey);
    }
  }, []);

  const handleClickLogin = () => {
    if (value.length > 0) {
      setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API, value);
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
              supportingText={value.length > 0 && '키는 항상 자동으로 브라우저에 저장됩니다.'}
            />
            <FlexBox justifyContent={'between'}>
              <ButtonNext
                variant="outlined"
                onClick={() => setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API, '')}
              >
                브라우저에 저장된 키 제거
              </ButtonNext>
              <ButtonNext variant="contained" color="success" onClick={handleClickLogin}>
                전송하기
              </ButtonNext>
            </FlexBox>
          </Box>
        </FlexBox>
      )}
    </div>
  );
}

export default ApiKeyChecker;
