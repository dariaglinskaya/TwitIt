import { Form, Input, Icon, Button, Modal, } from 'antd';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import * as React from 'react';
//import { Redirect } from 'react-router-dom';
import Header from './Header';

const FormItem = Form.Item;

export interface IProps {
    hasErrored: boolean;
    isLoading: boolean;
    authentication: any;
    form: any;
    history: any;
    register: any;
    create: any;
}

export interface IState {
    error: any;
    username: string;
    password: string;
    confirmDirty: boolean;
    autoCompleteResult: any;
    registerSuccess?: boolean;
}

export class RegistrationForm extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);
        this.setState({ confirmDirty: false });
        this.setState({ registerSuccess: false });
        this.setState({ autoCompleteResult: [] });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    public createUser = () => {
        this.props.create({
            email: this.state.username,
            password: this.state.password,
        })
            .then(() => this.setState({ registerSuccess: true }))
    }
    public onUsernameChange(event) {
        const username: string = event.target.value;
        this.setState(() => ({ username }));
    }
    public onPasswordChange(event) {
        const password: string = event.target.value;
        this.setState(() => ({ password }));
    }
    public handleSubmit() {
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            subscriptions: []
        };
        this.props.register(newUser);
    }
    public modal() {
        const modal = Modal.success({
            title: 'Register failure!',
            content: 'User with the same name was found.',
        });
        setTimeout(() => modal.destroy(), 5000);
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
        console.log(this.state);
        if (this.props.authentication.registerFailure) {
            this.modal();
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
    return {
        register: (newUser) => dispatch(userActions.register(newUser)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegistrationForm));
