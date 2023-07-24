export type SetStateCallbackType<T> = (prevState: T) => T;

export interface DataObserver<T> {
  setState: (param: SetStateCallbackType<T> | T) => void;
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
  emitChange: () => void;
}

class StateManager<T> implements DataObserver<T> {
  public state: T;
  private listeners: Array<() => void> = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  setState = (param: SetStateCallbackType<T> | T) => {
    if (param instanceof Function) {
      const newState = param(this.state);
      this.state = newState;
    } else {
      this.state = param;
    }

    this.emitChange();
  };

  getState = () => {
    return this.state;
  };

  subscribe = (listener: () => void) => {
    this.listeners = [...this.listeners, listener];

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  emitChange = () => {
    for (const listener of this.listeners) {
      listener();
    }
  };
}

export default StateManager;
