import { Avatar, Button, Icon } from 'antd';
import * as React from 'react';
import Modal from './Modal';
import './style.css';

export default class Header extends React.Component {
    public state = { show: false };

    public showModal = () => {
        this.setState({ show: true });
    };

    public hideModal = () => {
        this.setState({ show: false });
    };
    public render() {
        return (
            <header className="App-header">
                <Icon type="twitter" className="App-logo" />
                <span className="App-title">TwitIt</span>
                <div className="authorization-field">
                    <Avatar icon="user" />
                    <Button type="ghost" onClick={this.showModal}>log in</Button>
                </div>
                <Modal show={this.state.show} handleClose={this.hideModal}/>
            </header>
        );
    }

}
