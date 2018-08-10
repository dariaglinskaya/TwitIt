import { userConstants } from '../constants/userConst';
import { userService } from '../services/userService';

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

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
export default userActions;