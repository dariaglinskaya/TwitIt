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

function addTweet(newTweet) {
    return {
        type: tweetsConstant.TWEETS_ADD,
        isLoading: false,
        newTweet
    };
}
function searchUsers(usersFound) {
    return {
        type: tweetsConstant.SEARCH_USERS,
        usersFound
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
        console.log(user);
        dispatch(tweetsIsLoading(true));
        fetch('http://localhost:5000/feed', {
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