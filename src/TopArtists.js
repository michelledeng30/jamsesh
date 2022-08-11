import React from "react";
import { useState } from "react";
import "./Top.css";
import artistTab from './images/ArtistTab.png';



const TopArtists = props => {

  function handleImageInput(image_link){
    props.handleImageChange(image_link)
  }
  return (
    <div className="App">
        <div className="artists-box" style={{backgroundImage: `url(${artistTab})` }}>
          <div className="top-artists">
            <div className="top-artist-img">
              <img className="items-center" src={props.image_link} />
            </div>
            <div className="top-artists-list grid grid-flow-col">
              <div className = "flex flex-col">
                <img
                  style= {{border: props.image_link === props.top_artist_items[0].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[0].images[0].url} 
                  alt= "ArtistOne"
                  // onClick = {() => setSelectedImg(props.top_artist_items[0].images[0].url)}
                  onClick = {(e) => handleImageInput(props.top_artist_items[0].images[0].url)}
                />
                <div class='orbitron-medium'>{props.top_artist_items[0].name}</div>
              </div>
              <div className = "flex flex-col">
              <img
                  style= {{border: props.image_link === props.top_artist_items[1].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[1].images[0].url} 
                  alt= "ArtistTwo"
                  onClick = {(e) => handleImageInput(props.top_artist_items[1].images[0].url)}
                />
                <div class="orbitron-medium">{props.top_artist_items[1].name}</div>
              </div>
              <div className = "flex flex-col">
              <img
                  style= {{border: props.image_link === props.top_artist_items[2].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[2].images[0].url}
                  alt= "ArtistTwo"
                  onClick = {(e) => handleImageInput(props.top_artist_items[2].images[0].url)}
                />
                <div class="orbitron-medium">{props.top_artist_items[2].name}</div>
              </div>
              <div className = "flex flex-col">
              <img
                  style= {{border: props.image_link === props.top_artist_items[3].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[3].images[0].url} 
                  alt= "ArtistTwo"
                  onClick = {(e) => handleImageInput(props.top_artist_items[3].images[0].url)}
                />
                <div class="orbitron-medium">{props.top_artist_items[3].name}</div>
              </div>
              <div className = "flex flex-col">
              <img
                  style= {{border: props.image_link === props.top_artist_items[4].images[0].url ? "4px solid purple" : ""}} 
                  className="items-center" 
                  src={props.top_artist_items[4].images[0].url} 
                  alt= "ArtistTwo"
                  onClick = {(e) => handleImageInput(props.top_artist_items[4].images[0].url)}
                />
                <div class="orbitron-medium">{props.top_artist_items[4].name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        
  );
}

export default TopArtists;