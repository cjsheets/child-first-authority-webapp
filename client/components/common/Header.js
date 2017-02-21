import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as headerActions from '../../actions/headerActions';

import AppBar from 'material-ui/AppBar';
import AuthButton from './AuthButton';


class Header extends Component {

  handleMenuClick() {
    alert('onTouchTap triggered on the title component');
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={{fontWeight: 400, fontSize: 20}}>Child First Authority</span>}
          onLeftIconButtonTouchTap={this.handleMenuClick}
          iconElementRight={<AuthButton />}
        />
      </div>
    );
  }
}

Header.propTypes = { // Prop type validation
  actions : PropTypes.object.isRequired,
  header  : PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    header : state.header
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(headerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
