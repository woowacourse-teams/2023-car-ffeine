import { getLocalStorage, setLocalStorage } from '@utils/storage';

import { DEFAULT_TOKEN } from '@constants';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

import { generateRandomToken } from './randomDataGenerator';

export const configureToken = () => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  if (token < 0) {
    const newToken = generateRandomToken();
    setLocalStorage<number>(LOCAL_KEY_TOKEN, newToken);
  }
};
