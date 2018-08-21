import { userConstants } from '../constants/userConst';
import axios, { AxiosPromise } from 'axios'

export const userActions = {
    login,
    logout,
    register,
    subscribe,
    retweet,
    unretweet,
    create
};

function register(newUser) {
    return {
        type: userConstants.REGISTER_SUCCESS,
        loggedIn: true,
        newUser
    };
}
function authIsLoading(bool) {
    return {
        type: userConstants.AUTH_ISLOADING,
        isLoading: bool
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
        type: userConstants.LOGIN_SUCCESS,
        loggedIn: bool,
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
                    dispatch(loginSuccess(true, user));
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
function create(user: { username: string, password: string }): AxiosPromise<string> {
    return axios.post('/api/user', user)
        .then(res => res.data)
}

export default userActions;