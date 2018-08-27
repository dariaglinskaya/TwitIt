import { Form, Input, Icon, Button, Modal, } from 'antd';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import Header from './Header';

const FormItem = Form.Item;

export interface IProps {
    hasErrored: boolean;
    isLoading: boolean;
    authentication: any;
    form: any;
    history: any;
    register: any;
    initialState: any;
}

export interface IState {
    error: any;
    username: string;
    password: string;
    registerFailure: boolean;
}
const INITIAL_STATE = {
    error: '',
    username: '',
    password: '',
    registerFailure: false,
}

export class RegistrationForm extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.registerFailure;
    }
    public onUsernameChange(event) {
        const username: string = event.target.value;
        console.log(this);
        this.setState(() => ({ username, registerFailure: false }));
    }
    public onPasswordChange(event) {
        const password: string = event.target.value;
        this.setState(() => ({ password, registerFailure: false }));
    }
    public handleSubmit() {
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            subscriptions: [this.state.username]
        };
        this.props.form.resetFields();
        this.props.register(newUser);
    }
    public modal() {
        const that = this;
        if (this.props.authentication.registerFailure) {
            Modal.error({
                title: 'Register failure!',
                content: 'User is already registered.',
                onOk() {
                    that.props.initialState();
                },
            });
        }

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        this.modal();
        if (this.props.authentication.registerSuccess) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header />
                <div className="register">
                    <Form className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.onUsernameChange} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.onPasswordChange} />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => this.handleSubmit()}>Register</Button>
                            Or <Link to="/">log in now!</Link>
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
    };
};
const mapDispatchToProps = dispatch => {
    const register = (newUser) => userActions.register(newUser);
    const initialState = () => userActions.initialState();
    return { ...bindActionCreators({ register, initialState }, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegistrationForm));
