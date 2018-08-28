import * as React from 'react';
import Header from '../containers/Header';
import LogIn from '../containers/LogIn';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class Home extends React.Component<any, any> {
    render() {
        return (
            this.props.authentication.loggedIn ? (<Redirect to="/newsFeed"/>)
            :
            <div>
                <Header />
                <LogIn />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication,
    };
};

export default connect(mapStateToProps)(Home);
