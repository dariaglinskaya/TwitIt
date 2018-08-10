import { Button, Input } from 'antd'
import { connect } from 'react-redux';
import store from '../store';
import userActions from '../actions/userActions'
import * as React from 'react'

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    authentication: any
}

export interface IState {
    error: any,
    username: string,
    password: string
}

export class Register extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    public onUsernameChange(event) {
        const username = event.target.value;
        this.setState(() => ({ username }));
        console.log(this.state)
    }
    public onPasswordChange(event) {
        const password = event.target.value;
        this.setState(() => ({ password }));
    }
    public resetInput(event) {
        event.target.children.item(1).value = '';
        event.target.children.item(3).value = '';
    }
    public handleSubmit(event) {
        event.preventDefault();
        const newUser = {
            name: this.state.username,
            password: this.state.password,
            subscriptions: []
        }
        this.resetInput(event);
        store.dispatch(userActions.register(newUser));
    }
    render() {
        return (
            <div className="register-col">
                <span>Register</span>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>Login:</div>
                    <Input type="text" name="login" placeholder="username" onChange={this.onUsernameChange} />
                    <div>Password:</div>
                    <Input type="password" name="password" placeholder="password" onChange={this.onPasswordChange} />
                    <Button htmlType="submit">Submit</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasErrored: state.tweetsHasErrored,
        authentication: state.authentication
    }
}

export default connect(mapStateToProps)(Register);
