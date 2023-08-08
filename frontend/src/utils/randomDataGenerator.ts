/**
 * 현 시점으로 부터 1달 이내의 랜덤한 시간 문자열을 생성한다.
 */
export const getRandomTime = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let randomYear = currentYear;
  let randomMonth = currentMonth - 1;

  if (randomMonth < 0) {
    randomMonth = 11;
    randomYear -= 1;
  }

  const randomDay = Math.floor(Math.random() * 28) + 1;
  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);

  const randomDate = new Date(
    randomYear,
    randomMonth,
    randomDay,
    randomHour,
    randomMinute,
    randomSecond
  );

  const isoString = randomDate.toISOString();
  return isoString;
};

/**
 * 랜덤한 수 10,000,000 ~ 99,999,999 중 하나를 생성한다.
 */
export const generateRandomToken = () => {
  const min = 10_000_000;
  const max = 99_999_999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 배열 내부에 있는 값 중 아무거나 랜덤으로 반환한다.
 */
export const generateRandomData = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};
