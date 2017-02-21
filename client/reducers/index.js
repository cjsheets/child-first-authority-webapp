import { combineReducers } from 'redux';
import users from './userReducer';
import header from './headerReducer';

// ES6 short-hand property name (users: users)
const rootReducer = combineReducers({
  users,
  header
});

export default rootReducer;
