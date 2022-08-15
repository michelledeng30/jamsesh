import React, { Component } from "react";
import "./Color.css";
import { sage, retro, bubblegum } from "./colors"

export class Color extends Component {
    handleColorInput(color){
        this.props.handleColor(color)
    }
    render() {
        return (
            <div>
                <div className="color-button-group">
                    <button 
                        className='sage-button' 
                        style={{backgroundColor: sage[0]}} 
                        onClick={(e) => this.handleColorInput(sage)}>
                    </button>
                    <button 
                        className='retro-button' 
                        style={{backgroundColor: retro[0]}} 
                        onClick={(e) => this.handleColorInput(retro)}>
                    </button>
                    <button
                        className='bubblegum-button' 
                        style={{backgroundColor: bubblegum[0]}}
                        onClick={(e) => this.handleColorInput(bubblegum)}>
                    </button>
                </div>
            </div>
        )
    }
}

export default Color