import { Icon, Button, Input } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import tweetsActions from '../actions/tweetsActions';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const Search = Input.Search;

export interface IState { }

export interface IProps {
    authentication: any,
    tweets: any,
    history: any,
    searchUsers: any,
    logOut: any
}

export class Header extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }
    public searchUser(value) {
        let users = this.props.authentication.users;
        console.log(this.props)
        const usersFound = users.filter(user => user.name.includes(value));
        console.log(usersFound)
        if (usersFound && usersFound.length > 0) {
            this.props.history.push("/searchUser");
            this.props.searchUsers(usersFound);
        } else {
            alert("No users found")
        }

    }
    public logOut(event) {
        event.preventDefault();
        this.props.logOut();
        return <Redirect to="/" />
    }

    public render() {
        return (
            !this.props.authentication.loggedIn
                ? <header className="App-header">
                    <Icon type="twitter" className="App-logo" />
                    <span className="App-title">TwitIt</span>
                </header>
                : <header className="App-header">
                    <Icon type="twitter" className="App-logo" />
                    <Link to="/newsFeed" style={{ color: 'white' }} className="App-title">TwitIt</Link>
                    <Search placeholder="search user by login" className="search-input" onSearch={value => this.searchUser(value)} />
                    <Button type="primary" className="log-out" onClick={this.logOut.bind(this)}>Log out</Button>
                </header>
        );
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        tweets: state.tweets
    }
}
const mapDispatchToProps = dispatch => {
    let searchUsers = (users) => dispatch(tweetsActions.searchUsers(users));
    let logOut = () => dispatch(userActions.logout());
    return {
        ...bindActionCreators({ searchUsers, logOut }, dispatch)
    };
}
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);
