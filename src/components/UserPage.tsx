import { Button, Icon, Input } from 'antd';
import * as React from 'react';

const { TextArea } = Input;


class UserPage extends React.Component<{}, { author: string, placeholder: string }>{
    constructor(props: string) {
        super(props);
        this.state = {
            author: "admin",
            placeholder: "What do you think?",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any) {
        this.setState({ placeholder: event.target.placeholder });
    }

    public handleSubmit(event: any) {
        alert('Tweet added ' + this.state.placeholder);
        event.preventDefault();
    }
    public render() {
        return (
            <div className="user-page">
                <Icon type="user" className="user-page-icon" />
                <span className="user-page-author">{this.state.author}</span>
                <TextArea rows={4} className="add-tweet" placeholder={this.state.placeholder} onChange={this.handleChange} />
                <Button type="primary" className="add-tweet-btn" onClick={this.handleSubmit}>Add</Button>
            </div>
        );
    }
}

export default UserPage