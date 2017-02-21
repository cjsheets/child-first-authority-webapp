import * as types from '../actions/actionTypes';

export default function headerReducer(state = [], action) { // ES6 Default parameter
  switch (action.type) {
  case types.TOGGLE_SIDEBAR:
    return state;
  default:
    return state;
  }
}
