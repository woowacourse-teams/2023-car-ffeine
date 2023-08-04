import { getLocalStorage, setLocalStorage } from '@utils/storage';

import { DEFAULT_TOKEN } from '@constants';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

const generateRandomToken = () => {
  const min = 10_000_000;
  const max = 99_999_999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const configureToken = () => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  if (token < 0) {
    const newToken = generateRandomToken();
    setLocalStorage<number>(LOCAL_KEY_TOKEN, newToken);
  }
};
