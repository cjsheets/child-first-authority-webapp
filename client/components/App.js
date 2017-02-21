import React, {PropTypes} from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid wrapper">
        <div className="row row-offcanvas row-offcanvas-left">
          <Header/>
          <Sidebar/>
          <div className="column col-sm-9 col-xs-11" id="main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children : PropTypes.object.isRequired,
};

export default App;
