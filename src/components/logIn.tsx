import { Form, Icon, Input, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import userActions from '../actions/userActions';
import { Link, Redirect } from 'react-router-dom';

const FormItem = Form.Item;

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    authentication: any,
    subscriptions: any,
    form: any
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

        console.log(this.state)
    }
    public handleChangePassword(event) {
        const password = event.target.value;
        this.setState({ password });

        console.log(this.state)
    }
    public handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const user = {
            name: username,
            password: password,
            subscriptions: ['keenan'],
        }
        let users = this.props.authentication.users;
        if (typeof users != "undefined" && users != null && users.length != null && users.length > 0) {
            users.forEach(element => {
                if (element.name == username && element.password == password) {
                    user.subscriptions.push(element.name);
                    store.dispatch(userActions.login(user));
                } else {
                    alert('invalid username or password');
                }
            });
        } else {
            alert('There is no users!');
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.authentication.loggedIn ? (<Redirect to={"/user/:"+this.props.authentication.user.name}/>) :
            <div className="logIn">
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.handleChangeUsername.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleChangePassword.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        Or <Link to="/register">register now!</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}

export default connect(mapStateToProps)(Form.create()(LogIn));