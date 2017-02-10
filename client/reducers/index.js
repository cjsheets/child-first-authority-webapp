import { combineReducers } from 'redux';
import users from './userReducer';

const rootReducer = combineReducers({
  users // ES6 short-hand property name (users: users)
});

export default rootReducer;
