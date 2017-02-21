import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Sidebar = () =>
    <div className="column col-sm-3 col-xs-1 sidebar-offcanvas" id="sidebar">
      <ul className="nav" id="menu">
        <li><a href=""><i className="fa fa-dashboard" /> <span className="collapse in hidden-xs">Dashboard</span></a></li>
        <li><a href=""><i className="fa fa-area-chart" /> <span className="collapse in hidden-xs">Data Visualization</span></a></li>
        <li><a href=""><i className="fa fa-file" /> <span className="collapse in hidden-xs">Records</span></a></li>
        <li><a href=""><i className="fa fa-graduation-cap" /> <span className="collapse in hidden-xs">School Reports</span></a></li>
        <li><a href=""><i className="fa fa-cogs" /> <span className="collapse in hidden-xs">School Settings</span></a></li>
        <li><a href=""><i className="fa fa-wrench" /> <span className="collapse in hidden-xs">Admin</span></a></li>
        {/*<li> // Sample dropdown menu
          <a href="#" data-target="#item1" data-toggle="collapse"><i className="fa fa-list" /> <span className="collapse in hidden-xs">Menu <span className="caret" /></span></a>
          <ul className="nav nav-stacked collapse left-submenu" id="item1">
            <li><a href="google.com">View One</a></li>
            <li><a href="gmail.com">View Two</a></li>
          </ul>
        </li>*/}
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
