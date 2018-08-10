import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import { addTweet } from '../actions/tweetsActions';
import store from '../store';

const { TextArea } = Input;

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    authentication: any
}

export interface IState {
    error: any,
    newTweetContent: any,
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
            const newTweet = {
                author: this.props.authentication.user.name,
                date: new Date().toISOString().slice(0, 10),
                text: this.state.newTweetContent,
                id: Math.random().toString(36).substr(2, 9)
            }
            store.dispatch(addTweet(newTweet));
        }
    }
    private customStyle = {
        display: 'inline',
    }
    public render() {
        return (
            <form className="user-page" onSubmit={this.handleSubmit.bind(this)}>
                <Icon type="user" className="user-page-icon" />
                <span className="author" style={this.customStyle}>@{this.props.authentication.user.name}</span>
                <span className="user-page-author"></span>
                <TextArea rows={4} ref='newTweet' className="add-tweet" placeholder='What do you think?' onChange={this.onTextChange} />
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
export default connect(mapStateToProps)(AddForm);
