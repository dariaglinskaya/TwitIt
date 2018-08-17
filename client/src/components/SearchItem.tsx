import { Button } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import userActions from '../actions/userActions';
import { Link } from 'react-router-dom';

export interface IState {
    subscribed: boolean;
}
export interface IProps {
    subscribe: any,
    name: String
}
export class SearchItem extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false
        }
    }
    public subscribe(event) {
        event.preventDefault();
        this.props.subscribe(this.props.name.toLowerCase());   
        this.setState(() => ({ subscribed: true }));
        event.target.children[0].innerHTML="Unsubscribe";
    }
    public render() {
        return (
            <div className="search-item">
                <Link to={'/user/'+this.props.name.toLowerCase()} className="author">@{this.props.name.toLowerCase()}</Link>
                <Button type={this.state.subscribed ? "primary" : "default"} onClick={e => this.subscribe(e)}>Subscribe</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        tweets: state.tweets
    }
}
const mapDispatchToProps = dispatch => {
    return {
        subscribe: (name) => dispatch(userActions.subscribe(name))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);