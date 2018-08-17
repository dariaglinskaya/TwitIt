import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import tweetsActions from '../actions/tweetsActions';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    authentication: any,
    addTweet: any
}

export interface IState {
    newTweetContent: string,
}


export class AddForm extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            newTweetContent: "",
        }
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
                author: this.props.authentication.user.name,
                date: new Date().toISOString().slice(0, 10),
                text: this.state.newTweetContent,
                id: Math.random().toString(36).substr(2, 9),
                countLikes: 0
            }
            this.setState(() => ({ newTweetContent: "" }));
            this.props.addTweet(newTweet);
        }
    }
    private customStyle = {
        display: 'inline',
    }
    public render() {
        return (
            <form className="user-page" onSubmit={this.handleSubmit.bind(this)}>
                <Icon type="user" className="user-page-icon" />
                <Link to={"/user/:" + this.props.authentication.user.name} className="author" style={this.customStyle}>@{this.props.authentication.user.name}</Link>
                <span className="user-page-author"></span>
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
        authentication: state.authentication
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTweet: (newTweet) => dispatch(tweetsActions.addTweet(newTweet))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
