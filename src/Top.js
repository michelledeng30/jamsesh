import React from "react";
import "./Top.css";

const Top = props => {

  return (
    <div className="App">
      <div className="top-wrapper">

        <div className="top-tracks">
        <ol>
            <h2 className="top-tracks-header">Top Tracks</h2>
            <li>{props.top_track_items[0].name} {" by "} {props.top_track_items[0].artists[0].name}</li>
            <li>{props.top_track_items[1].name} {" by "} {props.top_track_items[1].artists[0].name}</li>
            <li>{props.top_track_items[2].name} {" by "} {props.top_track_items[2].artists[0].name}</li>
            <li>{props.top_track_items[3].name} {" by "} {props.top_track_items[3].artists[0].name}</li>
            <li>{props.top_track_items[4].name} {" by "} {props.top_track_items[4].artists[0].name}</li>
        </ol>
        </div>
        
        <div className="top-artists">
        <ol>
            <h2 className="top-artists-header">Top Artists</h2>
            <li>{props.top_artist_items[0].name}</li>
            <li>{props.top_artist_items[1].name}</li>
            <li>{props.top_artist_items[2].name}</li>
            <li>{props.top_artist_items[3].name}</li>
            <li>{props.top_artist_items[4].name}</li>
        </ol>
        </div>

      </div>
    </div>
  );
}

export default Top;