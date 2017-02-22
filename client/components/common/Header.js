import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as viewActions from '../../actions/viewActions';

import MediaQuery from 'react-responsive';

import AppBar from 'material-ui/AppBar';
import AuthButton from './AuthButton';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

class Header extends Component {

  handleExpandSidebar() {
    this.props.actions.setExpandSidebar();
  }

  handlePopoverSidebar() {
    this.props.actions.setPopoverSidebar();
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
                onClick={this.handleExpandSidebar}
                iconStyle={{color: '#EFEFEF'}}
              >
                <NavigationMenu />
              </IconButton>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
              <IconButton
                onClick={this.handlePopoverSidebar}
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
  view    : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    view : state.view
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(viewActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
