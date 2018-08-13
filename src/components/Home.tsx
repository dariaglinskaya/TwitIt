import * as React from 'react';
import '../components/style.css';
import '../index.css'
import Header from './Header';
import LogIn from './LogIn';

export default class Home extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Header />
                <LogIn />
            </div>
        );
    }
}
