import React, {PropTypes} from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        <Sidebar/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
