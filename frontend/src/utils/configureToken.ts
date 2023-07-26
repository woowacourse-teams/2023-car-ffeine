import { getLocalStorage, setLocalStorage } from '@utils/storage';

import { LOCAL_KEY_TOKEN } from '@constants';

const generateRandomToken = () => {
  const min = 10_000_000;
  const max = 99_999_999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const configureToken = () => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, -1);
  if (token < 0) {
    const newToken = generateRandomToken();
    setLocalStorage<number>(LOCAL_KEY_TOKEN, newToken);
  }
};
