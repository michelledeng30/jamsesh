import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./const";
import hash from "./hash";
import Player from "./Player";
import Top from "./Top";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
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
      no_top_artists_data: false
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.tick = this.tick.bind(this);
  }

  // runs after first render() lifecycle
  
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      
      this.getCurrentlyPlaying(_token);
      this.getTopTracks(_token);
      this.getTopArtists(_token);
    }
    this.getTopTracks(this.state.token);
    this.getTopArtists(this.state.token);

    // set interval for polling every 2 seconds
    this.interval = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
      // this.getTopTracks(this.state.token);
      // this.getTopArtists(this.state.token);
    }
  }

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

  getTopTracks(token) {
    // make a call using token
    $.ajax({
      // url: "https://api.spotify.com/v1/me/top/tracks?limit=5",
      // url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5",
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_top_tracks_data: true,
          });
          return;
        }
        
        this.setState({
          top_track_items: data.items,
          no_top_tracks_data: false,
        });
      }
    });
  }

  getTopArtists(token) {
    // make a call using token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
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
        spotify stats
        </div>
        <header className="App-header">

          {/* login page */}
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}

          {/* player */}
          {this.state.token && !this.state.no_data && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          )}
          {this.state.no_data && (
            <p>
              You're currently not playing anything on Spotify.
            </p>
          )}

          {/* stats */}
          {this.state.token && !this.state.no_top_tracks_data && !this.state.no_top_artists_data &&(  
            <Top
              top_track_items={this.state.top_track_items}
              top_artist_items={this.state.top_artist_items}
            />
          )}

          {this.state.no_top_tracks_data && (
            <p>
              No top tracks data :/
            </p>
          )}
          {this.state.no_top_artists_data && (
            <p>
              No top tracks data :/
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default App;