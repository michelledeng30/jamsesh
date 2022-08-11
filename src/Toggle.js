import React, { Component } from "react";
import "./Toggle.css";
import { short_uri, medium_uri, long_uri } from "./const";



export class ToggleButtons extends Component {
    handleImageInput(image_link){
        this.props.handleImageChange(image_link)
    }

    handleTimeInput(time_frame){
        this.props.handleTimeRange(time_frame)
    }

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
                <div className="toggle-header">
                    <div className="button-group">
                        <button className={button1_color} 
                        onClick={(e) => {
                            this.handleImageInput(this.props.top_artist_items_short_term[0].images[0].url);
                            this.handleTimeInput(short_uri);
                        }}
                        >
                            last month
                        </button>
                        <button className={button2_color} 
                        onClick={(e) => {
                            this.handleImageInput(this.props.top_artist_items_medium_term[0].images[0].url);
                            this.handleTimeInput(medium_uri);
                        }}
                        >
                            six months
                            </button>
                        <button className={button3_color} 
                        onClick={(e) => {
                            this.handleImageInput(this.props.top_artist_items_long_term[0].images[0].url);
                            this.handleTimeInput(long_uri);
                        }}
                        >
                            all-time
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default ToggleButtons