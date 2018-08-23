import { userConstants } from '../constants/userConst';

export const userActions = {
    login,
    logout,
    register,
    subscribe,
    retweet,
    unretweet,
    initialState,
};
function initialState() {
    return {
        type: userConstants.INITIAL_STATE,
    };
}
function register(newUser) {
    return (dispatch) => {
        dispatch(authIsLoading(true));
        fetch('http://localhost:5000/users/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newUser)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    console.log(response)
                    dispatch(registerSuccess());
                    return response;
                }
            })
            .catch(() => dispatch(registerFailure()));
    };

}
function registerFailure() {
    return {
        type: userConstants.REGISTER_FAILURE,
        registerFailure: true,
    };
}
function registerSuccess() {
    return {
        type: userConstants.REGISTER_SUCCESS,
        loggedIn: false,
        registerSuccess: true,
    };
}
function authIsLoading(bool) {
    return {
        type: userConstants.AUTH_ISLOADING,
        isLoading: bool,
        registerFailure: false,
    };
}
function loginSuccess(bool, user) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        loggedIn: bool,
        user
    };
}
function loginFailure(bool) {
    return {
        type: userConstants.LOGIN_FAILURE,
        loggedIn: !bool,
        loginFailure: true,
    };
}
function login(user) {
    return (dispatch) => {
        dispatch(authIsLoading(true))
        fetch('http://localhost:5000/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    console.log(response);
                    response.json().then(data => {
                        dispatch(loginSuccess(true, data))
                    });
                    return response;
                }
            })
            .catch(() => dispatch(loginFailure(true)));
    };
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
    };
}
function retweet(userID) {
    return {
        type: userConstants.USER_RETWEETED,
        userID
    };
}
function unretweet(userID) {
    return {
        type: userConstants.USER_UNRETWEETED,
        userID
    };
}

export default userActions;