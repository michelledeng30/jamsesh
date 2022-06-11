import React, { Component } from "react";
import "./Color.css";

export class Color extends Component {
    render() {
        return (
            <div>
                <div className="color-button-group">
                    <button className='green-button' onClick={this.props.green}></button>
                    <button className='pink-button' onClick={this.props.pink}></button>
                    <button className='brown-button' onClick={this.props.brown}></button>
                </div>
            </div>
        )
    }
}

export default Color