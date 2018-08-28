import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import tweetsActions from '../actions/tweetsActions';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const { TextArea } = Input;

export interface IProps {
    hasErrored: boolean;
    isLoading: boolean;
    authentication: any;
    addTweet: any;
    renderUserTweets: any;
}

export interface IState {
    newTweetContent: string;
}


export class AddForm extends React.Component<IProps, IState>{
    public customStyle = {
        display: 'inline',
    };
    constructor(props) {
        super(props);
        this.state = {
            newTweetContent: "",
        };
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
            const newTweet = {
                author: this.props.authentication.user.username,
                date: new Date(),
                text: this.state.newTweetContent,
                countLikes: 0,
                countRepost: 0,
            };
            this.setState(() => ({ newTweetContent: "" }));
            this.props.addTweet(newTweet);
        }
    }
    public userTweet(name, admin) {
        this.props.renderUserTweets(name, admin);
    }
    public render() {
        return (
            <form className="user-page" onSubmit={this.handleSubmit}>
                <Icon type="user" className="user-page-icon" />
                <Link to={"/user/:" + this.props.authentication.user.username} className="author" style={this.customStyle}>
                    <a onClick={() => this.userTweet(this.props.authentication.user.username,this.props.authentication.user )}>@{this.props.authentication.user.username}</a>                    
                </Link>
                <TextArea rows={4} ref='newTweet' className="add-tweet" placeholder='What do you think?' onChange={this.onTextChange} value={this.state.newTweetContent} />
                <Button type="primary" htmlType="submit" className="add-tweet-btn" >Add</Button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets,
        hasErrored: state.tweetsHasErrored,
        isLoading: state.tweetsIsLoading,
        authentication: state.authentication,
    };
};
const mapDispatchToProps = dispatch => {
    const renderUserTweets = (user, admin) => tweetsActions.renderUserTweets(user, admin);
    const addTweet = (newTweet) => tweetsActions.addTweet(newTweet);
    return {
        ...bindActionCreators({ addTweet, renderUserTweets }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
