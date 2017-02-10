import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadUsers} from './actions/userActions'; // named import, shorter syntax
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
// Future improvement, inject into Head on serve during initial render
store.dispatch(loadUsers());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
