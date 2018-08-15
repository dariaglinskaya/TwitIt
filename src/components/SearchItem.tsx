import { Button } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import store from '../store';
import userActions from '../actions/userActions';
import { Link } from 'react-router-dom';

export interface IState {
    subscribed: boolean;
}
export class SearchItem extends React.Component<any, IState>{
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false
        }
    }
    public subscribe(event) {
        event.preventDefault();
        store.dispatch(userActions.subscribe(this.props.name.toLowerCase()))   
        this.setState(() => ({ subscribed: true }));
        event.target.children[0].innerHTML="Unsubscribe";
    }
    public render() {
        return (
            <div className="search-item">
                <Link to={'/user/:'+this.props.name.toLowerCase()} className="author">@{this.props.name.toLowerCase()}</Link>
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

export default connect(mapStateToProps)(SearchItem);