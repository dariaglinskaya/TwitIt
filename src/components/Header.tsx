import { Icon, Button, Input } from 'antd';
import './style.css';
import * as React from 'react';
import './style.css';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import store from '../store';
import { Redirect } from 'react-router-dom';

const Search = Input.Search;

export interface IState { }

export interface IProps {
    authentication: any
}

export class Header extends React.Component<IProps, IState>{
    public searchUser() {

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
                    <span className="App-title">TwitIt</span>
                    <Search placeholder="search user by login" className="search-input" onSearch={this.searchUser} />
                    <Button type="primary" className="log-out" onClick={this.logOut}>Log out</Button>
                </header>

        );
    }

}
const mapStateToProps = state => {
    return {
        authentication: state.authentication,
    }
}

export default connect(mapStateToProps)(Header);
