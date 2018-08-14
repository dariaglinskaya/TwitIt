import { userConstants } from '../constants/userConst';

export const userActions = {
    login,
    logout,
    register
};

function register(newUser) {
    return {
        type: userConstants.REGISTER_SUCCESS,
        loggedIn: true,
        newUser
    }
}

function login(user) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        loggedIn: true,
        user
    }
}

function logout() {
    return {
        type: userConstants.LOGOUT,
        loggedIn: false
    };
}
export default userActions;