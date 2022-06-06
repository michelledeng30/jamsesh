import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./const";
import { track_uri, artist_uri, short_uri, medium_uri, long_uri } from "./const";
import hash from "./hash";
import Player from "./Player";
import Top from "./Top";
import ToggleButtons from "./Toggle";
import Button from 'react-bootstrap/Button';
import "./App.css";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // player
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

      // top tracks

      top_track_items: [{
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
        }
      }],
      retrieved_tracks: false,
      
      // top artists
      
      top_artist_items: [ {name: ""}],
      retrieved_artists: false,

      // button

      button1_type: true,
      button2_type: false,
      button3_type: false,

      // other

      time: short_uri,

    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.tick = this.tick.bind(this);
    
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.setTimeRange = this.setTimeRange.bind(this);
  }

  handleClick() {
    this.setTimeRange();
    this.getTopTracks(this.state.token);
    this.getTopArtists(this.state.token);
  }

  handleClick1() {
    this.setState({
        button1_type: true,
        button2_type: false,
        button3_type: false
    });
    this.setTimeRange();
    this.getTopTracks(this.state.token);
    this.getTopArtists(this.state.token);
  }

  handleClick2() {
    this.setState({
        button1_type: false,
        button2_type: true,
        button3_type: false
    });
    this.setTimeRange();
    this.getTopTracks(this.state.token);
    this.getTopArtists(this.state.token);
  }

  handleClick3() {
    this.setState({
        button1_type: false,
        button2_type: false,
        button3_type: true
    });
    this.setTimeRange();
    this.getTopTracks(this.state.token);
    this.getTopArtists(this.state.token);
  }

  // runs after first render() lifecycle
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    // const [active, setActive] = useState(this.state.button_types[0]);

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });

      this.getCurrentlyPlaying(_token);
      this.setTimeRange()
      this.getTopTracks(_token);
      this.getTopArtists(_token);
    }

    // set interval for polling every 2 seconds
    this.interval = setInterval(() => this.tick(), 500);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.setTimeRange()
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  setTimeRange() {
    if (this.state.button1_type) {
      this.setState({
        time: short_uri
      })
      return;
    }
    if (this.state.button2_type) {
      this.setState({
        time: medium_uri
      })
      return;
    }
    if (this.state.button3_type) {
      this.setState({
        time: long_uri
      })
      return;
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
    // make a call using the token
    $.ajax({
      url: track_uri + this.state.time,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          retrieved_tracks: true,
          top_track_items: data.items,
        })
      }
    });
  }

  getTopArtists = async(token) => {
    try{
      const response = await axios.get(artist_uri + this.state.time, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      this.setState({
        retrieved_artists: true,
        top_artist_items: response.data.items,
      })
    } catch(error){
      console.log(error);
    }
  };




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

          {/* toggle button */}

          {this.state.token && (
            <ToggleButtons 
              handleClick={this.handleClick}
              handleClick1={this.handleClick1}
              handleClick2={this.handleClick2}
              handleClick3={this.handleClick3}
              button1_type={this.state.button1_type}
              button2_type={this.state.button2_type}
              button3_type={this.state.button3_type}
            />
          )}
{/*     
          {this.state.token && (
            <ToggleButtons>

            </ToggleButtons>
          )} */}

          {/* stats */}

          {this.state.token && !this.state.no_top_tracks_data && this.state.retrieved_tracks && this.state.retrieved_artists &&(  
            <Top
              top_track_items={this.state.top_track_items}
              top_artist_items={this.state.top_artist_items}
            />
          )}
          
        </header>
      </div>
    );
  }
}

export default App;