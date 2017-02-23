import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sidebar : this.props.sidebar
    };
  }

  render() {
    return (
    <div id="sidebar">
      <ul className={`sidebar-nav nav-pills nav-stacked ${this.props.sidebar.expand ? 'expanded' : ''}`}>
        <li><Link to="/dashboard" activeClassName="active">
          <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-dashboard" /></span>
          <span className="collapse in hidden-xs">Dashboard</span>
        </Link></li>
        <li><Link to="/visualization" activeClassName="active">
          <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-area-chart" /></span>
          <span className="collapse in hidden-xs">Data Visualization</span>
        </Link></li>
        <li><Link to="/records" activeClassName="active">
          <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-file" /></span>
          <span className="collapse in hidden-xs">Records</span>
        </Link></li>
        <li><Link to="/school/reports/at-risk" activeClassName="active">
          <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-graduation-cap" /></span>
          <span className="collapse in hidden-xs">School Reports</span>
        </Link></li>
        <li><Link to="/school/settings" activeClassName="active">
          <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-cogs" /></span>
          <span className="collapse in hidden-xs">School Settings</span>
        </Link></li>
        <li><Link to="/admin" activeClassName="active">
          <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-wrench" /></span>
          <span className="collapse in hidden-xs">Admin</span>
        </Link></li>
        <li className="flex-spacer" />
        <li><Link to="/admin" activeClassName="active">
      <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-question" /></span>
      About
    </Link></li>
      </ul>
    </div>
    );
  }
}

Sidebar.propTypes = {
  sidebar : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log('sidebar: ', state);
  return {
    sidebar : state.view.sidebar
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
