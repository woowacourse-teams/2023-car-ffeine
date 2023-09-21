import StateManager from '@utils/external-state/StateManager';

describe('StateManager를 테스트한다', () => {
  it('setState에 값을 넘기면 state가 변경된다.', () => {
    const stateManager = new StateManager(0);
    stateManager.setState(1);
    expect(stateManager.state).toBe(1);
  });
  it('setState에 함수를 넘기면 state가 변경된다.', () => {
    const stateManager = new StateManager(0);
    stateManager.setState((prevState) => prevState + 1);
    expect(stateManager.state).toBe(1);
  });
});
