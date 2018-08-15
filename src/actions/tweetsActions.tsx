import tweetsConstant from '../constants/tweetsConst';
//import axios from 'axios';
const tweetsActions = {
    tweetsHasErrored,
    tweetsIsLoading,
    tweetsFetchDataSuccess,
    addTweet,
    searchUsers,
    tweetsFetchData,
    likeTweet,
    retweetTweet
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

function addTweet(newTweet) {
    return {
        type: tweetsConstant.TWEETS_ADD,
        isLoading: false,
        newTweet
    }
}
function searchUsers(usersFound) {
    return {
        type: tweetsConstant.SEARCH_USERS,
        usersFound
    }
}
function likeTweet(tweet) {
    return {
        type: tweetsConstant.LIKE_TWEET,
        tweet
    }
}
function retweetTweet(tweet) {
    return {
        type: tweetsConstant.RETWEET_TWEET,
        tweet
    }
}
function tweetsFetchData(url) {
    return (dispatch) => {
        dispatch(tweetsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(tweetsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((tweets) => dispatch(tweetsFetchDataSuccess(tweets)))
            .catch(() => dispatch(tweetsHasErrored(true)));
    };
}
export default tweetsActions;