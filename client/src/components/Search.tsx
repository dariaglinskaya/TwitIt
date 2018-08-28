import { Col, Spin } from 'antd';
import * as React from 'react';
import AddForm from '../containers/AddForm';
import Footer from './Footer';
import Header from '../containers/Header';
import SearchItem from '../containers/SearchItem';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

export interface IProps {
    authentication: any;
    tweets: any;
}

export class Search extends React.Component<IProps, {}>{
    public renderUsers() {
        if (this.props.tweets.usersFound !== undefined) {
            return this.props.tweets.usersFound.map((item, index) => {
                return <SearchItem key={index} {...item} />;
            });
        }
    }
    public showSpinner() {
        return <Spin />;
    }
    public render() {
        return (
            !this.props.authentication.loggedIn ? (<Redirect to="/" />) :
                <div className='App-body' >
                    <Header />
                    <div>
                        <Col span={17} push={7}>
                            <ul className="search-list">
                                {!this.props.tweets.searchSuccess ? this.showSpinner() : this.renderUsers()}
                            </ul>
                        </Col>
                        <Col span={7} pull={17}>
                            <AddForm />
                        </Col>
                    </div>
                    <Footer />
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
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps),
)(Search);
