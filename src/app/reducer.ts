import {Actions, ActionsTypes, State} from './actions';

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
