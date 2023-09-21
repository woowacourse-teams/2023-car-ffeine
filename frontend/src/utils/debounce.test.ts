import { debounce } from '@utils/debounce';

describe('debounce를 테스트한다', () => {
  it('debounce 걸린 함수를 연속으로 3번 호출하지만 실제로는 1번만 호출된다.', () => {
    jest.useFakeTimers();
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toBeCalled();

    jest.runAllTimers();

    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(1);
  });
});
