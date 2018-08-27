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
    unsubscribe: any;
    username: string;
    authentication: any;
    subscr: boolean;
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
        this.props.subscribe(this.props.username.toLowerCase(), this.props.authentication.user.username);
        this.setState(() => ({ subscribed: true }));
    }
    public unsubscribe(event) {
        event.preventDefault();
        this.props.unsubscribe(this.props.username.toLowerCase(), this.props.authentication.user.username);
        this.setState(() => ({ subscribed: false }));
    }
    componentDidMount() {
        if (this.props.authentication.user.subscriptions !== undefined) {
            this.props.authentication.user.subscriptions.forEach((item) => {
                if (item === this.props.username) {
                    this.setState(() => ({ subscribed: true }));
                } else {
                    this.setState(() => ({ subscribed: false }));
                }
            })
        }
    }
    public render() {
        return (
            <div className="search-item">
                <Link to={'/user/:' + this.props.username.toLowerCase()} className="author">@{this.props.username.toLowerCase()}</Link>
                {this.state.subscribed ?
                    <Button type="primary" onClick={e => this.unsubscribe(e)} >Unsubscribe</Button> :
                    <Button type="default" onClick={e => this.subscribe(e)}>Subscribe</Button>}
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
        subscribe: (name, admin) => dispatch(userActions.subscribe(name, admin)),
        unsubscribe: (name, admin) => dispatch(userActions.unsubscribe(name, admin))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);