import { Button, Icon, Input } from 'antd';
import * as React from 'react';


const Modal = ({ handleClose, show }: any) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">                
                <div className="log-in-col">
                    <span>Log In</span>
                    <form>
                        <div>Login:</div>
                        <Input type="text" name="login" placeholder="username" />
                        <div>Password:</div>
                        <Input type="password" name="password" placeholder="password" />
                        <Button >Submit</Button>
                    </form>
                </div>
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
                <Icon onClick={handleClose} className="hide-modal-button" type="close" />
            </section>
        </div>
    );
};
export default Modal;