// Counter.test.js
import { fireEvent, render } from '@testing-library/react';

import { store, useExternalState } from '@utils/external-state/tools';

const counterStore = store(0);

function Counter() {
  const [count, setCount] = useExternalState<number>(counterStore);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p data-testid="count-value">Count: {count}</p>
      <button data-testid="increment-button" onClick={increment}>
        Increment
      </button>
      <button data-testid="decrement-button" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
}

describe('useExternalState', () => {
  test('전역 상태가 0임을 확인한다.', () => {
    const { getByTestId } = render(<Counter />);
    const countValue = getByTestId('count-value');

    expect(countValue).toHaveTextContent('Count: 0');
  });

  test('이전 테스트 결과에서 1을 증가한다.', () => {
    const { getByTestId } = render(<Counter />);
    const incrementButton = getByTestId('increment-button');
    const countValue = getByTestId('count-value');

    fireEvent.click(incrementButton);

    expect(countValue).toHaveTextContent('Count: 1');
  });

  test('이전 테스트 결과에서 1을 감소한다.', () => {
    const { getByTestId } = render(<Counter />);
    const decrementButton = getByTestId('decrement-button');
    const countValue = getByTestId('count-value');

    fireEvent.click(decrementButton);

    expect(countValue).toHaveTextContent('Count: 0');
  });
});
