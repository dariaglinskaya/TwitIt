import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
//import applyMiddleware from 'redux-thunk';
import * as React from 'react';
//import authentication from '../reducers/authReducer';
import { addTweet } from '../actions/tweetsActions';
import store from '../store';

const { TextArea } = Input;

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    user: string
}

export interface IState {
    error: any,
    newTweetContent: any,
    user: string
}


export class AddForm extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    public onTextChange(event: any) {
        const newTweetContent = event.target.value;
        this.setState(() => ({ newTweetContent }));
    }

    public handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state) {
            this.setState(() => (alert('Nothing to add')));
        } else {
            console.log(store.getState)
            const newTweet = {
                author: this.props.user,
                date: new Date().toISOString().slice(0, 10),
                text: this.state.newTweetContent,
                id: Math.random().toString(36).substr(2, 9)
            }
            console.log(newTweet)
            store.dispatch(addTweet(newTweet));
        }
    }
    public render() {
        return (
            <div className="user-page">
                <Icon type="user" className="user-page-icon" />
                <span className="user-page-author"></span>
                <TextArea rows={4} className="add-tweet" placeholder='What do you think?' onChange={this.onTextChange} />
                <Button type="primary" className="add-tweet-btn" onClick={this.handleSubmit.bind(this)}>Add</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets,
        hasErrored: state.tweetsHasErrored,
        isLoading: state.tweetsIsLoading,
        user: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTweets: (tweet) => addTweet(tweet)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
