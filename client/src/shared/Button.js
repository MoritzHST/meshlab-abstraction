import React from 'react';
import "./Button.css"

class Button extends React.Component {
    render() {
        return (
            <div className="Button">{this.props.label}</div>
        )
    }
}

export default Button;