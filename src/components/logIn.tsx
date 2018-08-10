import { Button, Input } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import userActions from '../actions/userActions'

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    authentication: any,
    subscriptions: any
}
export interface IState {
    error: any,
    username: string,
    password: string,
    loggedIn: boolean,
}

export class LogIn extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public handleChangeUsername(event) {
        const username = event.target.value;
        this.setState({ username });
    }
    public handleChangePassword(event) {
        const password = event.target.value;
        this.setState({ password });
    }
    public resetInput(event) {
        event.target.children.item(1).value = '';
        event.target.children.item(3).value = '';
    }
    public handleSubmit(e) {
        e.preventDefault;
        const { username, password } = this.state;
        const user = {
            name: username,
            password: password,
            subscriptions: ['keenan'],
        }      
        this.setState({ loggedIn: true });
        this.props.authentication.users.forEach(element => {
            console.log(element.name)
            console.log(element.password)
            if (element.name == username && element.password == password) {
                console.log(2)
                user.subscriptions.push(element.name);
                this.resetInput(event);
                store.dispatch(userActions.login(user));
            } else {
                alert('invalid username or password')
            }
        });
    }
    render() {
        return (
            <div className="log-in-col">
                <span>Log In</span>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>Login:</div>
                    <Input type="text" name="name" placeholder="username" onChange={this.handleChangeUsername} />
                    <div>Password:</div>
                    <Input type="password" name="password" placeholder="password" onChange={this.handleChangePassword} />
                    <Button htmlType="submit">Submit</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasErrored: state.tweetsHasErrored,
        authentication: state.authentication,
        subscriptions: state.authentication.user.subscriptions
    }
}
export default connect(mapStateToProps)(LogIn);