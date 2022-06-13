import React, { Component } from "react";
import "./Color.css";
import { sage, retro, bubblegum } from "./colors"

export class Color extends Component {
    render() {
        return (
            <div>
                <div className="color-button-group">
                    <button 
                        className='sage-button' 
                        style={{backgroundColor: sage[0]}} 
                        onClick={this.props.setSage}>
                    </button>
                    <button 
                        className='retro-button' 
                        style={{backgroundColor: retro[0]}} 
                        onClick={this.props.setRetro}>
                    </button>
                    <button
                        className='bubblegum-button' 
                        style={{backgroundColor: bubblegum[0]}}
                        onClick={this.props.setBubblegum}>
                    </button>
                    {/* <button className='brown-button' onClick={this.props.brown}></button> */}
                </div>
            </div>
        )
    }
}

export default Color