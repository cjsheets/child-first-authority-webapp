import React from 'react';
import { Link } from 'react-router';

class RecordsPage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Stand-In Template</h1>
                <p>This will be the app record page</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
}

export default RecordsPage;
