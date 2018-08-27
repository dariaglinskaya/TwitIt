import tweetsConstant from '../constants/tweetsConst';
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
            fetch('http://localhost:5000/personal', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(info)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(tweetsIsLoading(true));
                    return response;
                })
                .then((response) => response.json())
                .then((response) => {
                    dispatch(renderTweetSuccess(response));
                })
                .catch(() => dispatch(renderTweetFailure()));
        } else {
            fetch('http://localhost:5000/userpage', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(newUser)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(tweetsIsLoading(true));
                    return response;
                })
                .then((response) => response.json())
                .then((response) => {
                    dispatch(renderTweetSuccess(response));
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
        fetch('http://localhost:5000/addTweet', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newTweet)
        })
            .then((response) => response.json())
            .then((response) => {
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
function likeTweet(props) {    
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));
        fetch('http://localhost:5000/like', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(props),
        })
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
        fetch('http://localhost:5000/unlike', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(tweet)
        })
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