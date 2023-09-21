import { calculateToastDuration } from '@utils/calculateToastDuration';

describe('calculateToastDuration를 테스트한다', () => {
  it('메시지 길이가 5글자 이하면 4를 반환한다.', () => {
    const message = '12345';
    const duration = calculateToastDuration(message);
    expect(duration).toBe(4);
  });
  it('메시지 길이가 5글자 초과면 4 + 올림(글자수 - 5 / 5)를 반환한다.', () => {
    const message = '123456';
    const duration = calculateToastDuration(message);
    expect(duration).toBe(5);
  });
});
