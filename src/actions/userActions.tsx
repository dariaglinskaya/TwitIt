import { userConstants } from '../constants/userConst';

export const userActions = {
    login,
    logout,
    register,
    subscribe
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
function subscribe(userName) {
    return {
        type: userConstants.USER_SUBSCRIBE,
        userName
    }
}

export default userActions;