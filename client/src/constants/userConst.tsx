export enum userConstants {
    INITIAL_STATE = 'INITIAL_STATE',
    IS_LOADING = 'IS_LOADING',
    LOGIN_REQUEST = 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE = 'USERS_LOGIN_FAILURE',
    AUTH_ISLOADING = 'AUTH_ISLOADING',

    LOGOUT = 'USERS_LOGOUT',

    REGISTER_REQUEST = 'REGISTER_REQUEST',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',

    USER_SUBSCRIBE = 'USER_SUBSCRIBE',
    SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS',
    SUBSCRIBE_FAILURE = 'SUBSCRIBE_SUCCESS', 

    UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS',
    UNSUBSCRIBE_FAILURE = 'UNSUBSCRIBE_SUCCESS', 

    USER_RETWEETED = 'USER_RETWEETED',
    RETWEET_SUCCESS = 'RETWEET_SUCCESS',
    RETWEET_FAILURE = 'RETWEET_FAILURE',

    USER_UNRETWEETED = 'USER_UNRETWEETED',
    UNRETWEET_SUCCESS = 'UNRETWEET_SUCCESS',
    UNRETWEET_FAILURE = 'UNRETWEET_FAILURE',
}
export default userConstants;