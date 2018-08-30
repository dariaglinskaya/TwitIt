import tweetsConstant from '../constants/tweetsConst';
import axios from 'axios';
const tweetsActions = {
    tweetsHasErrored,
    tweetsIsLoading,
    tweetsFetchDataSuccess,
    addTweet,
    searchUsers,
    tweetsFetchData,
    likeTweet,
    unlikeTweet,
    renderUserTweets
};
function renderUserTweets(user, admin) {
    const newUser = { name: user };
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        if (user === admin.username) {
            const info = {
                name: user,
                admin: admin
            }            
            axios.post('/personal', info)
                .then((response) => {
                    dispatch(tweetsIsLoading(true));
                    return response;
                })
                .then((response) => {
                    dispatch(renderTweetSuccess(response.data));
                })
                .catch(() => dispatch(renderTweetFailure()));
        } else {
            axios.post('/userpage', newUser)
                .then((response) => {
                    dispatch(tweetsIsLoading(true));
                    return response;
                })
                .then((response) => {
                    dispatch(renderTweetSuccess(response.data));
                })
                .catch(() => dispatch(renderTweetFailure()));
        }
    };
}
function renderTweetSuccess(tweets) {
    return {
        type: tweetsConstant.RENDER_TWEET_SUCCESS,
        userTweets: tweets,
        renderSuccess: true
    };
}

function renderTweetFailure() {
    return {
        type: tweetsConstant.RENDER_TWEET_FAILURE,
        hasErrored: true
    };
}
function tweetsHasErrored(bool) {
    return {
        type: tweetsConstant.TWEETS_HAS_ERRORED,
        hasErrored: bool
    };
}

function tweetsIsLoading(bool) {
    return {
        type: tweetsConstant.TWEETS_IS_LOADING,
        isLoading: bool
    };
}

function tweetsFetchDataSuccess(tweets) {
    return {
        type: tweetsConstant.TWEETS_FETCH_DATA_SUCCESS,
        isLoading: false,
        tweets
    };
}
function usersFetchDataSuccess(users) {
    return {
        type: tweetsConstant.USERS_FETCH_DATA_SUCCESS,
        isLoading: false,
        searchSuccess: true,
        users
    };
}
function addTweetSuccess(newTweet) {
    return {
        type: tweetsConstant.ADD_TWEET_SUCCESS,
        isLoading: false,
        addTweetSuccess: true,
        newTweet
    };
}
function addTweetFailure() {
    return {
        type: tweetsConstant.ADD_TWEET_FAILURE,
        addTweetFailure: true,
    };
}
function addTweet(newTweet) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        axios.post('/addTweet', newTweet)
            .then((response) => {
                dispatch(addTweetSuccess(response.data));
            })
            .catch(() => dispatch(addTweetFailure()));
    };
}
function searchUsers(user) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        axios.post('/search', user)
            .then((users) => {
                dispatch(usersFetchDataSuccess(users.data));
            })
            .catch(() => dispatch(tweetsHasErrored(true)));
    };
}
function likeTweet(props) {    
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        axios.post('/like', props)
            .then(dispatch(likeSuccess(props)))
            .catch(() => dispatch(likeFailure()));
    };
}

function likeSuccess(tweet) {
    return {
        type: tweetsConstant.LIKE_SUCCESS,
        isLoading: false,
        tweet
    };
}
function likeFailure() {
    return {
        type: tweetsConstant.LIKE_FAILURE,
        hasErrored: true,
    };
}
function unlikeTweet(tweet) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        axios.post('/unlike', tweet)
            .then(dispatch(unlikeSuccess(tweet)))
            .catch(() => dispatch(unlikeFailure()));
    };
}
function unlikeSuccess(tweet) {
    return {
        type: tweetsConstant.UNLIKE_SUCCESS,
        tweet
    };
}
function unlikeFailure() {
    return {
        type: tweetsConstant.UNLIKE_FAILURE,
        hasErrored: true
    };
}

function tweetsFetchData(user) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        axios.post('/newsFeed', user)
            .then((response) => {
                dispatch(tweetsIsLoading(true));
                return response;
            })
            .then((tweets) => dispatch(tweetsFetchDataSuccess(tweets.data)))
            .catch(() => dispatch(tweetsHasErrored(true)));
    };
}
export default tweetsActions;