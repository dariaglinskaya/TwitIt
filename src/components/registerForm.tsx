import { Button, Input } from 'antd'
import * as React from 'react'

export default  class Register extends React.Component {
    render() {
        return (
            <div className="register-col">
                    <span>Register</span>
                    <form>
                        <div>Login:</div>
                        <Input type="text" name="login" placeholder="username" />
                        <div>Password:</div>
                        <Input type="password" name="password" placeholder="password" />
                        <Button>Submit</Button>
                    </form>
                </div>
        );
    }
}