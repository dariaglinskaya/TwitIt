import tweetsConstant from '../constants/tweetsConst';

const initialState = {
  hasErrored: false,
  isLoading: false,
  tweets: [],
}
export default function tweets(state = initialState, action: any) {
  switch (action.type) {
    case tweetsConstant.TWEETS_HAS_ERRORED: {
      return { ...state, hasErrored: true };
      break;
    }
    case tweetsConstant.TWEETS_IS_LOADING: {
      return { ...state, isLoading: true };
      break;
    }
    case tweetsConstant.TWEETS_FETCH_DATA_SUCCESS: {
      return { ...state, tweets: action.tweets, isLoading: false };
    }
    case tweetsConstant.TWEETS_ADD : {
      return { ...state, tweets: [ action.newTweet, ...state.tweets] };
    }
    case tweetsConstant.SEARCH_USERS : {
      return {...state, usersFound: [action.usersFound]}
    }
    default: {
      return state;
    }
  }
}