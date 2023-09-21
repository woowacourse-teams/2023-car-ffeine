import { getQueryFormattedUrl } from '@utils/request-query-params/index';

describe('getQueryFormattedUrl를 테스트한다', () => {
  it('queryObject에 빈 객체를 넘기면 빈 문자열을 반환한다.', () => {
    const queryObject = {};
    const result = getQueryFormattedUrl(queryObject);
    expect(result).toBe('');
  });
  it('queryObject에 값이 빈 객체를 넘기면 빈 문자열을 반환한다.', () => {
    const queryObject = {
      a: '',
      b: '',
    };
    const result = getQueryFormattedUrl(queryObject);
    expect(result).toBe('');
  });
  it('queryObject에 객체를 넘기면 query string을 반환한다.', () => {
    const queryObject = {
      a: '1',
      b: '2',
    };
    const result = getQueryFormattedUrl(queryObject);
    expect(result).toBe('a=1&b=2');
  });
});
