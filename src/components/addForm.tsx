import { Button, Icon, Input } from 'antd';
//import connect from 'redux-connect-decorator';
//import applyMiddleware from 'redux-thunk';
import * as React from 'react';

const { TextArea } = Input;
const INITIAL_STATE = {
    author: 'admin',
    date: '01.01.01',
    error: '',
    placeholder: "What do you think?",
    text: '',

}

export default class AddForm extends React.Component<{}, { author: string, placeholder: string, text: string, date: string, error: string }>{
    constructor(props: string) {
        super(props);
        this.state = INITIAL_STATE;
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
            this.setState(() => ({ error: 'Nothing to add' }));
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
//export default connect((state, applyMiddleware) => console.log(state))(AddForm);
