import * as React from 'react';
import '../components/style.css';
import '../index.css'
import Header from './Header';
import LogIn from './LogIn';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class Home extends React.Component<any, any> {
    render() {
        return (
            this.props.authentication.loggedIn ? (<Redirect to={"/user/:"+this.props.authentication.user.name}/>)
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
    }
}

export default connect(mapStateToProps)(Home);