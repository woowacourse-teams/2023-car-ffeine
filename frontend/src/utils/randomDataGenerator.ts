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
