import { Form, Icon, Input, Button, Modal } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    initialState: any;
}
export interface IState {
    error: any;
    username: string;
    password: string;
    loggedIn: boolean;
    loginFailure: boolean;
}
const INITIAL_STATE = {
    error: '',
    username: '',
    password: '',
    loggedIn: false,
    loginFailure: false
}

export class LogIn extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChangeUsername(event) {
        const username = event.target.value;
        this.setState({ username, loginFailure: false });
    }
    public handleChangePassword(event) {
        const password = event.target.value;
        this.setState({ password, loginFailure: false });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.loginFailure;
    }
    public modal() {
        const that = this;
        if (this.props.authentication.loginFailure) {
            Modal.error({
                title: 'Login failure!',
                content: 'You entered incorrect password or user has not found.',
                onOk() {
                    that.props.initialState();
                },
            });
        }
    }
    public handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const user = {
            username: username,
            password: password,
            subscriptions: [],
            retweets: []
        };
        user.subscriptions.push(username);
        this.props.form.resetFields();
        this.props.logIn(user);
    }
    render() {
        this.modal();
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
    const logIn = (user) => userActions.login(user);
    const initialState = () => userActions.initialState();
    return { ...bindActionCreators({ logIn, initialState }, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LogIn));