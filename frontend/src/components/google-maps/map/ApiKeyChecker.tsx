import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { getLocalStorage, setLocalStorage } from '@utils/storage';
import { LOCAL_KEY_GOOGLE_MAPS_API, LOCAL_KEY_GOOGLE_MAPS_API_SAVE } from '@utils/storage/keys';

interface ApiKeyCheckerProps {
  render: (apiKey: string) => ReactNode;
}

function ApiKeyChecker({ render }: ApiKeyCheckerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiKey, setApiKey] = useState('');
  const [isSaveMode, setSaveMode] = useState(true);
  useEffect(() => {
    const isSaving = getLocalStorage<boolean>(LOCAL_KEY_GOOGLE_MAPS_API_SAVE, true);
    setSaveMode(isSaving);
    if (isSaving) {
      const backUpKey = getLocalStorage<string>(LOCAL_KEY_GOOGLE_MAPS_API, '');
      (inputRef.current as HTMLInputElement).value = backUpKey;
    }
  }, []);

  const onClick = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue && inputValue.length > 0) {
      if (isSaveMode) {
        setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API, inputValue);
      } else {
        setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API, '');
      }
      setApiKey(inputValue);
    } else {
      alert('제대로 된 키를 입력하셔야 합니다.');
    }
  };

  return (
    <div>
      {apiKey.length > 0 ? (
        render(apiKey)
      ) : (
        <div>
          <div>API키를 입력하세요</div>
          <input type="text" ref={inputRef} />
          <button type="submit" onClick={onClick}>
            전송
          </button>
          <div>
            <input
              type="checkbox"
              checked={isSaveMode}
              onChange={(e) => {
                setLocalStorage(LOCAL_KEY_GOOGLE_MAPS_API_SAVE, e.target.checked);
                setSaveMode(e.target.checked);
              }}
            />
            키를 브라우저에 저장하기
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiKeyChecker;
