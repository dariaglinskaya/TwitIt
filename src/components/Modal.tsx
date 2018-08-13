import { Icon } from 'antd';
import * as React from 'react';
import Register from './RegistrationForm';


export interface IAuthLogin {
    login: string;
    password: string;
}

export const Modal = ({ handleClose, show }: any) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <Register />
                <Icon onClick={handleClose} className="hide-modal-button" type="close" />
            </section>
        </div>
    );
};
export default Modal