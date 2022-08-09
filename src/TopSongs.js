import React from "react";
import { useState } from "react";
import "./Top.css";
import songTab from './images/SongsTab.png';

const TopSongs = props => {
    return (
        <div className="App">
            <div className="tracks-box" style={{backgroundImage: `url(${songTab})`}}>
                <div className="top-tracks">
                    <ol className="top-tracks-list">
                        <li>{props.top_track_items[0].name} {" by "} {props.top_track_items[0].artists[0].name}</li>
                        <li>{props.top_track_items[1].name} {" by "} {props.top_track_items[1].artists[0].name}</li>
                        <li>{props.top_track_items[2].name} {" by "} {props.top_track_items[2].artists[0].name}</li>
                        <li>{props.top_track_items[3].name} {" by "} {props.top_track_items[3].artists[0].name}</li>
                        <li>{props.top_track_items[4].name} {" by "} {props.top_track_items[4].artists[0].name}</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default TopSongs;