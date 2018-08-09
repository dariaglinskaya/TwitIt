import { connect } from 'react-redux';
import { Input } from 'antd';
//import { isEmpty } from 'lodash';
import { Spin } from 'antd';
import * as React from 'react';
import tweetsFetchData from '../actions/tweetsActions';

import Tweet from './Tweet';

const Search = Input.Search;

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    fetchData: any,
    tweets: any
}

export interface IState {
}

export class Feed extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchData('http://5b6b3e39ad81cd0014d153c6.mockapi.io/tweets');
    }

    public renderTweets() {
        const arr = this.props.tweets.tweets.map((tweet, index) => {
            return <Tweet key={index}
                {...tweet}
            />
        });
        return arr;
    }

    public renderEmpty() {
        return <div>No tweets added yet.</div>;
    }
    public render() {
        console.log(this.props);
        if (this.props.tweets.hasErrored) {
            return <p>No items to show.</p>;
        }
        if(this.props.tweets.isLoading === true) {
            <div className="App-feed">
                <Search placeholder="search user by login" enterButton="Search" className="search-input" />
                return <Spin />
            </div>
            
        }
        return (
            <div className="App-feed">
                <Search placeholder="search user by login" enterButton="Search" className="search-input" />
                <div>
                    {this.renderTweets()}
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets,
        hasErrored: state.tweetsHasErrored,
        isLoading: state.tweetsIsLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (url) => dispatch(tweetsFetchData(url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);