import { Avatar, Button, Icon } from 'antd';
import * as React from 'react';
import AuthorizationForm from './AuthorizationForm';
import './style.css';



function Header(){
    function logIn(e: React.MouseEvent<HTMLElement>){
        e.preventDefault();
        return(
            <AuthorizationForm/>
        );
    }
    return(
        <header className="App-header">
            <Icon type="twitter" className="App-logo"/>
            <span className="App-title">TwitIt</span>
            <div className="authorization-field">
                <Avatar icon="user" />
                <Button type="ghost" onClick = {logIn}>log in</Button>
            </div>
        </header>
        );
}

export default Header