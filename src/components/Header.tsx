import { Icon, Button } from 'antd';
import * as React from 'react';
import './style.css';
import { connect } from 'react-redux';

export interface IState { }

export interface IProps {
    authentication: any
}

export class Header extends React.Component<IProps, IState>{
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
                    <Button type="primary" className="log-out">Log out</Button>
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
