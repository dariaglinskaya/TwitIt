import { Form, Icon, Input, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { Link, Redirect } from 'react-router-dom';
import * as _ from 'lodash';
const FormItem = Form.Item;

export interface IProps {
    hasErrored: boolean;
    isLoading: boolean;
    authentication: any;
    subscriptions: any;
    form: any;
    logIn: any;
}
export interface IState {
    error: any;
    username: string;
    password: string;
    loggedIn: boolean;
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
    public handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const user = {
            username: username,
            password: password,
            subscriptions: ['edwin'],
            retweets: ['5b768c974f0f18075a7f7e67']
        };
        user.subscriptions.push(username);
                this.props.logIn(user);
        /*const users = this.props.authentication.users;
        /*if (typeof users !== "undefined" && users !== null && users.length !== null && users.length > 0) {
            const res = users.filter(element => (element.name === username && element.password === password));
            if (!_.isEmpty(res)) {
                
            } else {
                alert('invalid username or password');
            }
        } else {
            alert('There is no users!');
        }*/
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.authentication.loggedIn ? (<Redirect to="/newsFeed" />) :
                <div className="logIn">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.handleChangeUsername} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleChangePassword} />
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
    };
};
const mapDispatchToProps = dispatch => {
    return {
        logIn: (user) => dispatch(userActions.login(user))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LogIn));