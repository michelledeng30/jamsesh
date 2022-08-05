import React from "react";
import { useState } from "react";
import "./Top.css";
import artistTab from './images/ArtistTab.png';


const Top = props => {
  const tracks_color = props.current_color[2];
  const artists_color = props.current_color[3];
  const [selectedImg , setSelectedImg] = useState(props.top_artist_items[0].images[0].url);

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

        <div className="artists-box justify-center" style={{backgroundImage: `url(${artistTab})` }}>
          <div className="top-artists">
            <div className="top-artist-img">
              <img className="items-center" src={selectedImg} />
            </div>
            <div className="top-artists-list grid grid-flow-col">
              <div className = "flex flex-col">
                <img
                  style= {{border: selectedImg === props.top_artist_items[0].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[0].images[0].url} 
                  alt= "ArtistOne"
                  onClick = {() => setSelectedImg(props.top_artist_items[0].images[0].url)}
                />
                <div>{props.top_artist_items[0].name}</div>
              </div>
              <div className = "flex flex-col">
              <img
                  style= {{border: selectedImg === props.top_artist_items[1].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[1].images[0].url} 
                  alt= "ArtistTwo"
                  onClick = {() => setSelectedImg(props.top_artist_items[1].images[0].url)}
                />
                <div>{props.top_artist_items[1].name}</div>
              </div>
              <div className = "flex flex-col">
              <img
                  style= {{border: selectedImg === props.top_artist_items[2].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[2].images[0].url} 
                  alt= "ArtistTwo"
                  onClick = {() => setSelectedImg(props.top_artist_items[2].images[0].url)}
                />
                <div>{props.top_artist_items[2].name}</div>
              </div>
            </div>
          </div>
        </div>


      </div>
      </div>
        
  );
}

export default Top;