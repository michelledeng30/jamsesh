import React, { Component} from "react";
import "./Toggle.css";
import { short_uri, medium_uri, long_uri } from "./const";

// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/Button';
// import styled from 'styled-components';


export class ToggleButtons extends Component {

    render() {
        let button1_color = "not-pressed";
        let button2_color = "not-pressed";
        let button3_color = "not-pressed";
        
        if(this.props.time_range === short_uri) {
            button1_color = "pressed";
        }
        if(this.props.time_range === medium_uri) {
            button2_color = "pressed";
        }
        if(this.props.time_range === long_uri) {
            button3_color = "pressed";
        }

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