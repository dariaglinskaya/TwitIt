import { Icon, Button, Input } from 'antd';
import './style.css';
import * as React from 'react';
import './style.css';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import tweetsActions from '../actions/tweetsActions';
import store from '../store';
import { Redirect, Link, withRouter } from 'react-router-dom';

const Search = Input.Search;

export interface IState {}

export interface IProps {
    authentication: any,
    tweets: any,
    history: any
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
        if(usersFound && usersFound.length > 0) {
            this.props.history.push("/searchUser");
            store.dispatch(tweetsActions.searchUsers(usersFound));
        } else {
            alert("No users found")
        }
          
    } 
    public logOut(event) {
        event.preventDefault();
        store.dispatch(userActions.logout());
        return <Redirect to="/"/>
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
                    <Link to="/newsFeed" style={{color:'white'}} className="App-title">TwitIt</Link>
                    <Search placeholder="search user by login" className="search-input" onSearch={value => this.searchUser(value)} />
                    <Button type="primary" className="log-out" onClick={this.logOut}>Log out</Button>
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

export default withRouter(
    connect(mapStateToProps)(Header)
);
