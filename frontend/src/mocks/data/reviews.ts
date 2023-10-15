import { generateRandomData, generateRandomToken, getRandomTime } from '@utils/randomDataGenerator';

import type { Reply, Review } from '@type';

export const generateReviews = (): Review[] => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      reviewId: index,
      memberId: generateRandomToken(),
      latestUpdateDate: getRandomTime(),
      ratings: Math.floor(Math.random() * 5) + 1,
      content: generateRandomData([
        '정말 멋진 충전소네요.',
        '고장이 잘나요',
        '주차 공간이 너무 좁아요',
        '후면 주차가 어려워요',
        '손잡이가 드러워요',
        '비매너 사용자들이 많아요',
        '자리가 넉넉해요',
        '비매너 사용자들이 많아요 비매너 사용자들이 많아요 비매너 사용자들이 많아요 비매너 사용자들이 많아요 비매너 사용자들이 많아요 비매너 사용자들이 많아요',
      ]),
      isUpdated: generateRandomData([true, false]),
      isDeleted: generateRandomData([true, false]),
      replySize: generateRandomData([0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7]),
    };
  });
};

export const generateReplies = (): Reply[] => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      replyId: index,
      reviewId: generateRandomToken(),
      memberId: generateRandomToken(),
      latestUpdateDate: getRandomTime(),
      content: generateRandomData([
        '정말 멋진 충전소네요.',
        '고장이 잘나요',
        '주차 공간이 너무 좁아요',
        '후면 주차가 어려워요',
        '손잡이가 드러워요',
        '비매너 사용자들이 많아요',
        '자리가 넉넉해요',
        '비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요',
      ]),
      isUpdated: generateRandomData([true, false]),
      isDeleted: generateRandomData([true, false]),
    };
  });
};
