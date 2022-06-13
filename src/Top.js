import React from "react";
import "./Top.css";

const Top = props => {
  const tracks_color = props.current_color[2];
  const artists_color = props.current_color[3];

  return (
    <div className="App">
      <div className="top-wrapper">
        <div className="tracks-box" style={{backgroundColor: tracks_color}}>
          <div className="top-tracks">
            <h2 className="top-tracks-header">top tracks</h2>
            <ol className="top-tracks-list">
                <li>{props.top_track_items[0].name} {" by "} {props.top_track_items[0].artists[0].name}</li>
                <li>{props.top_track_items[1].name} {" by "} {props.top_track_items[1].artists[0].name}</li>
                <li>{props.top_track_items[2].name} {" by "} {props.top_track_items[2].artists[0].name}</li>
                <li>{props.top_track_items[3].name} {" by "} {props.top_track_items[3].artists[0].name}</li>
                <li>{props.top_track_items[4].name} {" by "} {props.top_track_items[4].artists[0].name}</li>
            </ol>
          </div>
        </div>

        <div className="artists-box" style={{backgroundColor: artists_color}}>
          <div className="top-artists">
            <h2 className="top-artists-header">top artists</h2>
            <div className="top-artist-img">
              <img className="items-center" src={props.top_artist_items[0].images[0].url} />
            </div>
            <ol className="top-artists-list">
                <li>{props.top_artist_items[0].name}</li>
                <li>{props.top_artist_items[1].name}</li>
                <li>{props.top_artist_items[2].name}</li>
                <li>{props.top_artist_items[3].name}</li>
                <li>{props.top_artist_items[4].name}</li>
            </ol>
          </div>
        </div>
      </div>
      </div>
        
  );
}

export default Top;