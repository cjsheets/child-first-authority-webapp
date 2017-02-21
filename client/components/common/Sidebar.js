import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Sidebar = () =>
    <div id="sidebar">
      <ul className="sidebar-nav nav-pills nav-stacked" >
        <li><Link to="/dashboard" activeClassName="active">
          <i className="fa fa-dashboard" /> <span className="collapse in hidden-xs">Dashboard</span>
        </Link></li>
        <li><Link to="/visualization" activeClassName="active">
          <i className="fa fa-area-chart" /> <span className="collapse in hidden-xs">Data Visualization</span>
        </Link></li>
        <li><Link to="/records" activeClassName="active">
          <i className="fa fa-file" /> <span className="collapse in hidden-xs">Records</span>
        </Link></li>
        <li><Link to="/school/reports/at-risk" activeClassName="active">
          <i className="fa fa-graduation-cap" /> <span className="collapse in hidden-xs">School Reports</span>
        </Link></li>
        <li><Link to="/school/settings" activeClassName="active">
          <i className="fa fa-cogs" /> <span className="collapse in hidden-xs">School Settings</span>
        </Link></li>
        <li><Link to="/admin" activeClassName="active">
          <i className="fa fa-wrench" /> <span className="collapse in hidden-xs">Admin</span>
        </Link></li>
      </ul>
    </div>
  /*<sidebar ><ul className="sidebar-nav nav-pills nav-stacked" >
        <li>
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-dashboard" ></i></span>
            Dashboard
          </a>
        </li>
        <li >
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-area-chart" ></i></span>
            Data Visualization
          </a>
        </li><li >
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-file" ></i></span>
            Records
          </a>
        </li><li >
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-graduation-cap" ></i></span>
            School Reports
          </a>
        </li><li >
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-cogs" ></i></span>
            School Settings
          </a>
        </li><li >
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-wrench" ></i></span>
            Admin
          </a>
        </li>

        <li className="flex-spacer"></li>
        <li >
          <a href="">
            <span className="fa-stack fa-lg pull-left"><i className="fa fa-stack-1x fa-question"></i></span>
            About
          </a>
        </li>
      </ul>
</sidebar>*/
  ;

export default Sidebar;
