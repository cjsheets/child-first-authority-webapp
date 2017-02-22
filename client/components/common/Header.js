import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as headerActions from '../../actions/headerActions';

import MediaQuery from 'react-responsive';

import AppBar from 'material-ui/AppBar';
import AuthButton from './AuthButton';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

class Header extends Component {

  handleMenuClick() {
    alert('onTouchTap triggered on the title component');
  }

  handleMenuClick2() {
    alert('other menu');
  }


  render() {
    return (
      <AppBar
        className="main-header"
        title={<span style={{fontWeight: 400, fontSize: 20}}>Child First Authority</span>}
        iconElementRight={<AuthButton />}
        iconElementLeft={
          <div>
            <MediaQuery minWidth={768}>
              <IconButton
                onClick={this.handleMenuClick2}
                iconStyle={{color: '#EFEFEF'}}
              >
                <NavigationMenu />
              </IconButton>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
              <IconButton
                onClick={this.handleMenuClick}
                iconStyle={{color: '#EFEFEF'}}
              >
                <NavigationMenu />
              </IconButton>
            </MediaQuery>
          </div>
        }
      />
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
