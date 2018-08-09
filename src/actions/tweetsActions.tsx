import tweetsConstant from '../constants/tweetsConst';
//import axios from 'axios';
export function tweetsHasErrored(bool) {
    return {
        type: tweetsConstant.TWEETS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function tweetsIsLoading(bool) {
    return {
        type: tweetsConstant.TWEETS_IS_LOADING,
        isLoading: bool
    };
}

export function tweetsFetchDataSuccess(tweets) {
    return {
        type: tweetsConstant.TWEETS_FETCH_DATA_SUCCESS,
        tweets
    };
}

export function tweetsFetchData(url) {
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
            .then((items) => dispatch(tweetsFetchDataSuccess(items)))
            .catch(() => dispatch(tweetsHasErrored(true)));
    };
}
export default tweetsFetchData;