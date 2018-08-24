import { Button } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import userActions from '../actions/userActions';
import { Link } from 'react-router-dom';

export interface IState {
    subscribed: boolean;
}
export interface IProps {
    subscribe: any;
    username: string;
}
export class SearchItem extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
        };
    }
    public subscribe(event) {
        event.preventDefault();
        this.props.subscribe(this.props.username.toLowerCase());   
        this.setState(() => ({ subscribed: true }));
        event.target.children[0].innerHTML="Unsubscribe";
    }
    public render() {
        return (
            <div className="search-item">
            {console.log(this.props)}
                <Link to={'/user/:'+this.props.username.toLowerCase()} className="author">@{this.props.username.toLowerCase()}</Link>
                <Button type={this.state.subscribed ? "primary" : "default"} onClick={e => this.subscribe(e)}>Subscribe</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        tweets: state.tweets
    };
};
const mapDispatchToProps = dispatch => {
    return {
        subscribe: (name) => dispatch(userActions.subscribe(name))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);