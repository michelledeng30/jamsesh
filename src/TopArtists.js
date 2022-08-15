import React from "react";
import { useState } from "react";
import "./Top.css";
import artistTab from './images/ArtistTab.png';

const TopArtists = props => {

  function handleImageInput(image_link){
    props.handleImageChange(image_link)
  }
  const artistNums = [0, 1, 2, 3, 4];
  const topTracks = [];

  for (const artistNum of artistNums) {
    topTracks.push(
      <div className = "flex flex-col">
        <img
          style= {{border: props.image_link === props.top_artist_items[artistNum].images[0].url ? "4px solid purple" : ""}} 
          className="items-center" 
          src={props.top_artist_items[artistNum].images[0].url} 
          alt= "ArtistOne"
          onClick = {(e) => handleImageInput(props.top_artist_items[artistNum].images[0].url)}
        />
        <div class='orbitron-medium'>{props.top_artist_items[artistNum].name}</div>
      </div>
    )
  }


  return (
    <div className="App">
        <div className="artists-box" style={{backgroundImage: `url(${artistTab})` }}>
          <div className="top-artists">

            <div className="top-artist-img">
              <img className="items-center" src={props.image_link} />
            </div>

            <div className="top-artists-list grid grid-flow-col">
              {topTracks}
            </div>

          </div>
        </div>
      </div>

        
  );
}

export default TopArtists;