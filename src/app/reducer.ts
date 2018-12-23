import {Action, Actions, ActionsTypes, createAction, State} from './actions';

function reducer(state: State, action: Actions): typeof state {
  switch (action.type) {
    case ActionsTypes.Add:
      let addPayload = action.payload;
      return [...state, addPayload];
    case ActionsTypes.Clear:
      return [];
    case ActionsTypes.Set:
      return [...action.payload];
    default:
      return state;
  }
}

/**
 * The typing on this thing causes narrowing of the action input to it to narrow correctly.
 * Only works if action is previously narrowed to union type of actions  (A1 | A2 | ...)
 */
export function ofType<T extends string = string>(...types: T[]) {
  return <A extends Action, U extends Extract<A, { type: T }>>(action: A): action is U =>
    types.some(type => action.type === type);
}

let actions = [createAction(ActionsTypes.Set, [1,2,3]), createAction(ActionsTypes.Add, 3),
      createAction(ActionsTypes.Clear)];

let setActions = actions.filter(ofType(ActionsTypes.Set));
