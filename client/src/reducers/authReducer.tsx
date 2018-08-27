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
        case userConstants.INITIAL_STATE:
        return {
            INITIAL_STATE
        }
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
                INITIAL_STATE
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
        case userConstants.SUBSCRIBE_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    subscriptions: [...state.user.subscriptions, action.user.username]
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