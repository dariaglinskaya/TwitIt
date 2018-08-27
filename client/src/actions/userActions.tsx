import { userConstants } from '../constants/userConst';

export const userActions = {
    login,
    logout,
    register,
    subscribe,
    unsubscribe,
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
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
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
    return (dispatch) => {
        dispatch(authIsLoading(true))
        fetch('http://localhost:5000/users/logout')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    dispatch(initialState());
                }
            })
            .catch(() => new Error());
    };
}
function subscribe(userName, admin) {
    const user = { username: userName, admin: admin };
    return (dispatch) => {
        dispatch(authIsLoading(true))
        fetch('http://localhost:5000/users/subscribe', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    dispatch(subscribeSuccess(user));
                }
            })
            .catch(() => dispatch(subscribeFailure()));
    };
}
function unsubscribe(userName, admin) {
    const user = { username: userName, admin: admin };
    return (dispatch) => {
        dispatch(authIsLoading(true))
        fetch('http://localhost:5000/users/unsubscribe', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    dispatch(unsubscribeSuccess(user));
                }
            })
            .catch(() => dispatch(unsubscribeFailure()));
    };
}
function subscribeSuccess(user) {
    return {
        type: userConstants.SUBSCRIBE_SUCCESS,
        user
    };
}
function unsubscribeSuccess(user) {
    return {
        type: userConstants.UNSUBSCRIBE_SUCCESS,
        user
    };
}
function subscribeFailure() {
    return {
        type: userConstants.SUBSCRIBE_FAILURE,
        subscribed: false,
    };
}
function unsubscribeFailure() {
    return {
        type: userConstants.UNSUBSCRIBE_FAILURE,
        unsubscribed: false,
    };
}
function retweet(props) {
    return (dispatch) => {
        dispatch(isLoading());
        fetch('http://localhost:5000/retweet', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(props)
        })
            .then(dispatch(retweetSuccess(props._id)))
            .catch(() => dispatch(retweetFailure()));
    };
}
function isLoading() {
    return {
        type: userConstants.IS_LOADING,
        isLoading: true
    };
}
function retweetSuccess(_id) {
    return {
        type: userConstants.USER_RETWEETED,
        _id
    };
}
function retweetFailure() {
    return {
        type: userConstants.RETWEET_FAILURE,
    };
}
function unretweet(props) {
    return (dispatch) => {
        dispatch(isLoading());
        fetch('http://localhost:5000/unretweet', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(props)
        })
            .then(dispatch(unretweetSuccess(props._id)))
            .catch(() => dispatch(unretweetFailure()));
    };
}
function unretweetSuccess(_id) {
    return {
        type: userConstants.USER_UNRETWEETED,
        _id
    };
}
function unretweetFailure() {
    return {
        type: userConstants.UNRETWEET_FAILURE,
    };
}

export default userActions;