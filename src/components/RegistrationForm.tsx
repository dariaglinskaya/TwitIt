import { Form, Input, Icon, Button, } from 'antd';
import { connect } from 'react-redux';
import store from '../store';
import userActions from '../actions/userActions';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const FormItem = Form.Item;

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    authentication: any,
    form: any,
    history: any
}

export interface IState {
    error: any,
    username: string,
    password: string,
    confirmDirty: boolean,
    autoCompleteResult: any,
}

export class RegistrationForm extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.setState({ confirmDirty: false });
        this.setState({ autoCompleteResult: [] });
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
    public handleSubmit(event) {
        //event.preventDefault();
        const newUser = {
            name: this.state.username,
            password: this.state.password,
            subscriptions: []
        }
        store.dispatch(userActions.register(newUser));
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Header />
                <div className="register">

                    <Form className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.onUsernameChange.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem>
                            <Link onClick={this.handleSubmit.bind(this)} to='/' replace>
                                <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                            </Link>
                        </FormItem>
                    </Form>
                </div>
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

export default connect(mapStateToProps)(Form.create()(RegistrationForm));
