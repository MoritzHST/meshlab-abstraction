import React from 'react';
import "./AlertBox.css"
import MessageBox from "./MessageBox";

class AlertBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            style: {animation: "messageBoxFadeIn 0.5s forwards"}
        }

        this.dismiss = this.dismiss.bind(this)
        this.animationEnd = this.animationEnd.bind(this)
    }

    dismiss() {
        this.setState({
            display: false,
            style: {animation: "messageBoxFadeOut 0.5s backwards"}
        })
    }

    animationEnd(event){
        if (!this.state.display)
            this.props.unmountChild();

    }

    render() {
        return (
            <div onAnimationEnd={this.animationEnd} style={this.state.style} className="alertBox">
                <MessageBox msg={this.props.errorMsg} unmountChild={this.dismiss}/>
            </div>
        )
    }
}

export default AlertBox;