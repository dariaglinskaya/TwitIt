import tweetsConstant from '../constants/tweetsConst';
const tweetsActions = {
    tweetsHasErrored,
    tweetsIsLoading,
    tweetsFetchDataSuccess,
    addTweet,
    searchUsers,
    tweetsFetchData,
    likeTweet,
    unLikeTweet
};
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
        console.log(newTweet)
        dispatch(tweetsIsLoading(true));
        fetch('http://localhost:5000/addTweet', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newTweet)
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                dispatch(addTweetSuccess(response));
            })
            .catch(() => dispatch(addTweetFailure()));
    };
}
function searchUsers(user) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        fetch('http://localhost:5000/search', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((users) => {
                dispatch(usersFetchDataSuccess(users));
            })
            .catch(() => dispatch(tweetsHasErrored(true)));
    };
}
function likeTweet(tweet) {
    return {
        type: tweetsConstant.LIKE_TWEET,
        tweet
    };
}
function unLikeTweet(tweet) {
    return {
        type: tweetsConstant.UNLIKE_TWEET,
        tweet
    };
}

function tweetsFetchData(user) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        fetch('http://localhost:5000/feed', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(tweetsIsLoading(true));
                return response;
            })
            .then((response) => response.json())
            .then((tweets) => dispatch(tweetsFetchDataSuccess(tweets)))
            .catch(() => dispatch(tweetsHasErrored(true)));
    };
}
export default tweetsActions;