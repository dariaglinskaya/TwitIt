import connect from 'redux-connect-decorator';
import { Input } from 'antd';
//import { isEmpty } from 'lodash';
// import { Spin } from 'antd';
import * as React from 'react';

import Tweet from './Tweet';

const Search = Input.Search;


const tweetsList = [{
    author: 'admin',
    date: "01.01.2018",
    text: "my first tweet"
},
    {
        author: 'batman',
        date: "02.01.2018",
        text: "my second tweet"
    }
];

const mapStateToProps = function (store) {
    return {
        tweets: store.tweets.tweets,
        fetchingTweets: store.tweets.fetchingTweets,
        fetchedTweets: store.tweets.fetchedTweets,
        errorTweets: store.tweets.error,
        //user: store.login.user,
    }
}
export interface IProps {
    tweets: {
        author: string,
        date: string,
        text: string
    }[]
}

export interface IState {

}

@connect(mapStateToProps)
export default class Feed extends React.Component<IProps, IState>{
    public renderTweets() {

        return tweetsList.map((tweet, index) => {
            return (
                <Tweet
                    key={index}
                    {...tweet}
                    /*onLikeButton={onLikeButton}
                    onReTweetButton={onReTweetButton}
                    selectedUser={selectedUser}*/
                />
            );
        });
    }
    public renderEmpty() {
        return <div>No tweets added yet.</div>;
    }
    public render() {
        return (
            <div className="App-feed">
                <Search placeholder="search user by login" enterButton="Search" className="search-input" />
                {/*isEmpty(this.props.tweets) ? this.renderEmpty() : */this.renderTweets()}
            </div>
        );
    }
}
