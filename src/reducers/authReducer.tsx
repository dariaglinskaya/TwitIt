import { userConstants } from '../constants/userConst';

const initialState = {
    loggedIn: true,
    user: {
        name: 'admin',
        subscriptions: ['admin','rocky', 'jess', 'estrella']
    },
    users: []
}

export default function authentication(state = initialState, action) {
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
            return {};
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.newUser]
            }
        default:
            return state
    }
}