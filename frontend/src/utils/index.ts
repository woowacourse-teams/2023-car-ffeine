export const calculateLatestUpdateTime = (latestUpdateTimeString: string) => {
  const currentDate = new Date();
  const latestUpdatedDate = new Date(latestUpdateTimeString);
  const diffInSeconds = Math.floor((currentDate.getTime() - latestUpdatedDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `방금 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};
