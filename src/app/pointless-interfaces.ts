export interface MyState {
  a: string;
  b: number;
}

export interface MyAction<T> {
  type: string;
  payload?: T;
}

export interface MyPayload {
  a: string;
  b: number;
}
