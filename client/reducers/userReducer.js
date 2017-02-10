import * as types from '../actions/actionTypes';

export default function userReducer(state = [], action) { // ES6 Default parameter
  switch(action.type){
    case types.CREATE_USER:
      return [...state, // ES6 Spread, returns current state array
        Object.assign({}, action.user) // ES6 Object.assign - Add new object
      ];
      return state;
    
    default:
      return state;
  }
}