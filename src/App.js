import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./const";
import { track_uri, artist_uri, short_uri, medium_uri, long_uri } from "./const";
import hash from "./hash";
import Player from "./Player";
import Top from "./Top";
import Toggle from "./Toggle";
import Button from 'react-bootstrap/Button';
import "./App.css";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      retrieved: false,
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,

      top_track_items: [{
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
        }
      }],
  
      no_top_tracks_data: false,
      top_artist_items: [ {name: ""}],
      no_top_artists_data: false,

    };
    // this.getCurrentPlayer = this.getCurrentPlayer.bind(this);
    // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    // this.getTopArtists = this.getTopArtists.bind(this);
    this.tick = this.tick.bind(this);
  }

  // runs after first render() lifecycle
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });

      // this.getCurrentPlayer(this.state.token);
      // this.getCurrentlyPlaying(_token);
      this.getTopTracks(_token);
      // this.getTopArtists(_token);
    }

    // set interval for polling every 2 seconds
    this.interval = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      // this.getCurrentPlayer(this.state.token);
      // this.getCurrentlyPlaying(this.state.token);
      this.getTopTracks(this.state.token);
      // this.getTopArtists(this.state.token);
    }
  }


  // async getCurrentPlayer(token){
  //   try{
  //     const [response1, response2] = await Promise.all([
  //       axios.get("https://api.spotify.com/v1/me/player", {
  //         headers: {
  //           Authorization: 'Bearer ' + token,
  //         }
  //       }),
  //       axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
  //         headers: {
  //           Authorization: 'Bearer ' + token,
  //         }
  //       })
  //     ]);

  //     if (!response1.data) {
  //       this.setState({
  //         no_data: true,
  //       });
  //       return;
  //     }
  //     if (!response2.data) {
  //       this.setState({
  //         no_top_tracks_data: true,
  //       });
  //       return;
  //     }
  //     this.setState({
  //       item: response1.data.item,
  //       is_playing: response1.data.is_playing,
  //       progress_ms: response1.data.progress_ms,
  //       no_data: false,

  //       top_track_items: response2.data.items,
  //       no_top_tracks_data: false,
  //     });
  //   } catch(error){
  //     console.log(error);
  //   }
  // };



  // getCurrentPlayer = async(token) => {
  //   try{
  //     const response = await axios.get("https://api.spotify.com/v1/me/player", {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //       }
  //     });
  //     if (!response.data) {
  //       this.setState({
  //         no_data: true,
  //       });
  //       return;
  //     }
  //     this.setState({
  //       item: response.data.item,
  //       is_playing: response.data.is_playing,
  //       progress_ms: response.data.progress_ms,
  //       no_data: false,
  //     })
  //   } catch(error){
  //     console.log(error);
  //   }
  // };


  getCurrentlyPlaying(token) {
    // make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false
        });
      }
    });
  }

  getTopTracks = async(token) => {
    try{
      const response = await axios.get(track_uri + short_uri, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      if (!response.data) {
        this.setState({
          no_top_tracks_data: true,
        });
        return;
      }
      this.setState({
        retrieved: true,
        top_track_items: response.data.items,
        no_top_tracks_data: false,
      })
    } catch(error){
      console.log(error);
    }
  };

  // getTopTracks(token) {
  //   // make a call using token

  //   $.ajax({
  //     url: track_uri + short_uri,
  //     type: "GET",
  //     beforeSend: xhr => {
  //       xhr.setRequestHeader("Authorization", "Bearer " + token);
  //     },
  //     success: data => {
  //       // Checks if the data is not empty
  //       if(!data) {
  //         this.setState({
  //           no_top_tracks_data: true,
  //         });
  //         return;
  //       }
        
  //       this.setState({
  //         top_track_items: data.items,
  //         no_top_tracks_data: false,
  //       });
  //     }
  //   });
  // }

  getTopArtists(token) {
    // make a call using token
    $.ajax({
      url: artist_uri + short_uri,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_top_artists_data: true,
          });
          return;
        }
        
        this.setState({
          top_artist_items: data.items,
          no_top_artists_data: false,
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="title">
        stats for spotify
        </div>
        <header className="App-header">

          {/* login page */}
          {!this.state.token && (
            <Button className="login" href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}>
              Login to Spotify
            </Button>
          )}

          {
            <p>
              hello
            </p>
          }

          {this.state.retrieved && (
            <p>
              retrieved
            </p>
          )}

          {/* player */}
          {/* {this.state.token && !this.state.no_data && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          )} */}
          {/* {this.state.no_data && (
            <p>
              You're currently not playing anything on Spotify.
            </p>
          )} */}

          {/* toggle button */}

          {this.state.token && (
            <Toggle
              
            />
          )}

          {/* {this.state.token && this.state.no_top_tracks_data && (
            <p>
              No top tracks data :/
            </p>
          )} */}

          {/* {this.state.token && this.state.no_top_artists_data && (
            <p>
              No top artists data :/
            </p>
          )} */}

          {/* stats */}
          {/* {this.state.token && !this.state.no_top_tracks_data && !this.state.no_top_artists_data &&(  
            <Top
              top_track_items={this.state.top_track_items}
              top_artist_items={this.state.top_artist_items}
            />
          )} */}

          {this.state.token && !this.state.no_top_tracks_data && this.state.retrieved &&(  
            <Top
              top_track_items={this.state.top_track_items}
              // top_artist_items={this.state.top_artist_items}
            />
          )}

          
        </header>
      </div>
    );
  }
}

export default App;