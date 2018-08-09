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
      return { ...state, tweets: action.tweets };
    }
    default: {
      return state;
    }
  }
}