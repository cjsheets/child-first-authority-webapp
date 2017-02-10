import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <navbar>

      <div className="debug-bar">
        {"Debug: "}
        <IndexLink to="/" activeClassName="active">Login</IndexLink>
        {" | "}
        <Link to="/dashboard" activeClassName="active">Dashboard</Link>
        {" | "}
        <Link to="/visualization" activeClassName="active">Visualization</Link>
        {" | "}
        <Link to="/records" activeClassName="active">Records</Link>
        {" | "}
        <Link to="/school/reports/at-risk" activeClassName="active">School Reports</Link>
        {" | "}
        <Link to="/school/settings" activeClassName="active">School Settings</Link>
        {" | "}
        <Link to="/admin" activeClassName="active">Admin</Link>
        {" | "}
        <Link to="/about" activeClassName="active">About</Link>
      </div>

      <div className="cfa navbar navbar-default">
        <div className="navbar-header fixed-brand">
          <button className="navbar-toggle pull-left" type="button" id="sidebar-toggle">
            <span className="sr-only">Toggle sidebar menu</span>
            <i className="fa fa-bars fa-lg fa-rotate-90"></i>
          </button>
          <a className="navbar-brand" href="/dashboard">Child First Authority</a>
          <button className="navbar-toggle" type="button" >
            <span className="sr-only">Toggle user menu</span>
            <i className="fa fa-user fa-lg"></i>
          </button>
        </div>
        <div className="navbar-collapse collapse" id="navbar-main" aria-expanded="false" aria-hidden="true">
          <ul className="nav navbar-nav navbar-right">
            <li><p className="navbar-text">Hello Chad Sheets</p></li>
            <li><a href="">Logout</a></li>
          </ul>
        </div>
      </div>
    </navbar>
  );
};

export default Header;
