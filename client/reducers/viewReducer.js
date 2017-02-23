import * as types from '../actions/actionTypes';
import iState from './initialState';

export default function viewReducer(state = iState.view, action) {
  switch (action.type) {
  case types.TOGGLE_EXPAND_SIDEBAR:
    return {
      sidebar : {
        expand  : action.open,
        popover : true
      }
    };
  case types.TOGGLE_POPOVER_SIDEBAR:
    return { view : {
      sidebar : {
        expand  : true,
        popover : action.open
      }
    }
    };
  default:
    return state;
  }
}
