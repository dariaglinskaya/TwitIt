import axios from 'axios';

export function fetchTweets() {
    return function (dispatch: any) {
        dispatch({ type: "FETCH_TWEETS" });
        axios
            .get("http://10.0.1.75:3000/tweets")
            .then((response: any) => {
                dispatch({
                    type: "FETCH_TWEETS_FULFILLED",
                    payload: response.data
                });
            }, err => dispatch({ type: "FETCH_TWEETS_REJECTED", payload: err }));

    };
};
