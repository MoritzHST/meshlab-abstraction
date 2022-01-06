import React from 'react';
import "./MessageBox.css"

class MessageBox extends React.Component {
    constructor(props) {
        super(props);

        this.dismiss = this.dismiss.bind(this)
    }

    dismiss() {
        this.props.unmountChild();
    }

    render() {
        return (
            <div className="messageBox">
                <span className="closeBtn" onClick={this.dismiss}>&times;</span>
                {this.props.msg}
            </div>
        )
    }
}

export default MessageBox;