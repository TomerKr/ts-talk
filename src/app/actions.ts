export interface TypedAction<T extends string = string>{
  type: T;
}

export interface PayloadAction<T extends string, P> extends TypedAction<T> {
  payload: P;
}

export type State = number[];

/**
 * Conditionals with generics only decide types at time of type checking, so unfortunately cannot use as method output here.
 */
function createAction<T extends string>(type: T): TypedAction<T>;
function createAction<T extends string, P>(type: T, payload: P): PayloadAction<T, P>;
function createAction<T extends string, P = undefined>(type: T, payload?: P): TypedAction<T> | PayloadAction<T, P> {
  return payload === undefined ? {type} : {type, payload};
}


export enum ActionsTypes {
  Set = 'set',
  Clear = 'clear',
  Add = 'add'
}

export const setAction = (list: State) => createAction(ActionsTypes.Set, list);
export const clearAction = () => createAction(ActionsTypes.Clear);
export const addAction = (item: number) => createAction(ActionsTypes.Add, item);

export type Actions = ReturnType<typeof setAction> | ReturnType<typeof clearAction> | ReturnType<typeof addAction>;
