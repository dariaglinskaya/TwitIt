import { userConstants } from '../constants/userConst';

const INITIAL_STATE = {
    loggedIn: false,
    user: {
        name: '',
        subscriptions: []
    },
    users: []
}


export default function authentication(state = INITIAL_STATE, action) {
    switch (action.type) {
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
            return {};
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
                users: [...state.users, action.newUser]
            };
        case userConstants.USER_SUBSCRIBE: 
            return {
                ...state,
                user: {
                    ...state.user,
                    subscriptions: [...state.user.subscriptions, action.userName]
                }                
            }

        default:
            return state
    }
}