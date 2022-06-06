import React, { Component} from "react";
import "./Toggle.css";
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/Button';
// import styled from 'styled-components';


export class ToggleButtons extends Component {

    render() {
        
        let button1_color = this.props.button1_type ? "pressed" : "not-pressed";
        let button2_color = this.props.button2_type ? "pressed" : "not-pressed";
        let button3_color = this.props.button3_type ? "pressed" : "not-pressed";

        return (
            <div>
                <div className="button-group">
                    <button className={button1_color} onClick={this.props.handleClick1}>
                        last month
                    </button>
                    <button className={button2_color} onClick={this.props.handleClick2}>
                        last 6 months
                        </button>
                    <button className={button3_color} onClick={this.props.handleClick3}>
                        all-time
                    </button>
                </div>
            </div>
        )
    }
}

export default ToggleButtons