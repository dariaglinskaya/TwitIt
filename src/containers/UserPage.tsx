import { Button, Icon, Input } from 'antd';
import * as React from 'react';

const { TextArea } = Input;

export default class AddForm extends React.Component<{}, { author: string, placeholder: string, text: string, date: string, error: string }>{
    constructor(props: string) {
        super(props);
        this.state = {
            author: '',
            date: '',
            error: '',
            placeholder: "What do you think?",
            text: '',           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    public onTextChange(event: any) {
        const text = event.target.value;
        this.setState(() => ({ text }));
    }

    public handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state.text) {
            this.setState(() => (alert('Nothing to add')));
        } else {
            this.setState(() => ({ error: '' }));
            console.log(this.state);
        }
    }
    public render() {
        return (
            <div className="user-page">
                <Icon type="user" className="user-page-icon" />
                <span className="user-page-author">{this.state.author}</span>
                <TextArea rows={4} className="add-tweet" placeholder={this.state.placeholder} onChange={this.onTextChange} />
                <Button type="primary" className="add-tweet-btn" onClick={this.handleSubmit}>Add</Button>
            </div>
        );
    }
}
