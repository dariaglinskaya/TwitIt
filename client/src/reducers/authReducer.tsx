import { userConstants } from '../constants/userConst';

const INITIAL_STATE = {
    loggedIn: false,
    loginFailure: false,
    user: {
        name: '',
        subscriptions: [],
        retweets: [],
    },
    users: []
}


export default function authentication(state = INITIAL_STATE, action) {
    switch (action.type) {
        case userConstants.AUTH_ISLOADING:
            return {
                ...state,
                registerFailure: false,
            }
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                loginFailure: true,
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: {
                    name: '',
                    subscriptions: []
                },
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccess: true,
                users: [...state.users, action.newUser]
            };
        case userConstants.REGISTER_FAILURE:
            return {
                loggedIn: false,
                registerFailure: true,
            };
        case userConstants.USER_SUBSCRIBE: {
            return {
                ...state,
                user: {
                    ...state.user,
                    subscriptions: [...state.user.subscriptions, action.userName]
                }
            }
        }
        case userConstants.USER_RETWEETED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    retweets: [...state.user.retweets, action.userID]
                }
            }
        }
        case userConstants.USER_UNRETWEETED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    retweets: [...state.user.retweets].slice(0, -1)
                }
            }
        }

        default:
            return state
    }
}