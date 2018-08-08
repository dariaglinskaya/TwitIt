import { Button, Input } from 'antd';
import { userActions } from '../actions/userActions';
import * as React from 'react';
import connect from 'redux-connect-decorator';
import { Dispatch } from 'redux';
//import { applyMiddleware } from 'redux';

const INITIAL_STATE_USER = {
    username: '',
    password: '',
    submitted: false
}

interface ILogINProps {
    dispatch?: Dispatch<any>;
    loggingIn?: boolean;
}
interface ILogInState {
    username?: string;
    password?: string;
    submitted?: boolean;
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
//@connect(mapStateToProps, applyMiddleware)
export class LogIn extends React.Component<ILogINProps, ILogInState> {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE_USER;
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public handleChangeUsername(e) {
        const value = e.target.value;
        this.setState({ 'username': value });
    }
    public handleChangePassword(e) {
        const value = e.target.value;
        this.setState({ 'password': value });
    }
    public handleSubmit(e) {
        e.preventDefault;
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username === "admin" && password === "admin") {
            this.props.dispatch(userActions.login(username, password));
        }
    }
    render() {
        //const{loggingIn} = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="log-in-col">
                <span>Log In</span>
                <form >
                    <div>Login:</div>
                    <Input type="text" name="name" placeholder="username" onChange={this.handleChangeUsername} />
                    {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    }
                    <div>Password:</div>
                    <Input type="password" name="password" placeholder="password" onChange={this.handleChangePassword} />
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                    <Button itemType="submit" onClick={this.handleSubmit}>Submit</Button>
                </form>
            </div>
        );
    }
}
export default connect(mapStateToProps)(LogIn);