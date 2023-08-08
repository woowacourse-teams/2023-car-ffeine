export const calculateToastDuration = (message: string) => {
  const charCount = message.length;
  const baseDuration = 4;
  const charThreshold = 5;

  if (charCount < charThreshold) {
    return baseDuration;
  }

  const additionalSeconds = Math.ceil((charCount - charThreshold) / charThreshold);

  return baseDuration + additionalSeconds;
};
