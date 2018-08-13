import { Icon } from 'antd';
import * as React from 'react';
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
            </header>
        );
    }

}
