import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./const";
import { track_uri, artist_uri, short_uri, medium_uri, long_uri } from "./const"
import { pause_uri, play_uri } from "./const";
import { sage, retro, bubblegum } from "./colors"
import hash from "./hash";
import Player from "./Player";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import ToggleButtons from "./Toggle";
import Genres from "./Genres"
import Color from "./Color";
import Button from 'react-bootstrap/Button';
import radio from './images/Radio.png';
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
      is_playing: "paused",
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
      
      top_artist_items: [{
        genres: [],
        images: [{ url: "" }],
        name: ""
      }],
      retrieved_artists: false,

      // other

      time_range: short_uri,

      current_color: sage,
      device_info: '',

    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.pausePlayer = this.pausePlayer.bind(this);
    this.playPlayer = this.playPlayer.bind(this);
    this.tick = this.tick.bind(this);
    
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);

    this.setSage = this.setSage.bind(this);
    this.setRetro = this.setRetro.bind(this);
    this.setBubblegum = this.setBubblegum.bind(this);
    // this.brown = this.brown.bind(this);

    
  }

  handleClick1() {
    this.getTopTracks(this.state.token, short_uri);
    this.getTopArtists(this.state.token, short_uri);
    this.setState({
      time_range: short_uri
    });
  }

  handleClick2() {
    this.getTopTracks(this.state.token, medium_uri);
    this.getTopArtists(this.state.token, medium_uri);
    this.setState({
      time_range: medium_uri
    });
  }

  handleClick3() {
    this.getTopTracks(this.state.token, long_uri);
    this.getTopArtists(this.state.token, long_uri);
    this.setState({
      time_range: long_uri
    });
  }

  handlePause() {
    this.pausePlayer(this.state.token);
    this.setState({
      is_playing: 'paused',
    });
  }

  handlePlay() {
    this.playPlayer(this.state.token);
    this.setState({
      is_playing: 'playing',
    });
  }

  setSage() {
    this.setState({
      current_color: sage
    });
  }

  setRetro() {
    this.setState({
      current_color: retro
    });
  }

  setBubblegum() {
    this.setState({
      current_color: bubblegum
    });
  }

  // brown() {
  //   this.setState({
  //     color: 'brown'
  //   });
  // }

  // runs after first render() lifecycle
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });

      this.getCurrentlyPlaying(_token);
      this.getTopTracks(_token, short_uri);
      this.getTopArtists(_token, short_uri);
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
      this.getCurrentlyPlaying(this.state.token);
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

  getTopTracks(token, length) {
    // make a call using the token
    $.ajax({
      url: track_uri + length,
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

  getTopArtists = async(token, length) => {
    try{
      const response = await axios.get(artist_uri + length, {
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

  pausePlayer(token) {
    // make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/devices",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          device_info: data
        })
      }
    });

    // function getDeviceID() {
    //   for (let i = 0; i < this.state.device_info.length; i++) {
    //     if (this.state.device_info[i]["is_active"] == true) {
    //       return this.state.device_info[i]["id"];
    //     }
    //   }
    // }

    // const device_id = getDeviceID();

    $.ajax({
      url: pause_uri + "b0be3c62624f61009a1f3b4ca4b447dd3a036b9d",
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          is_playing: 'paused',
        })
      }
    });
  }

  playPlayer(token) {
    $.ajax({
      url: play_uri + "b0be3c62624f61009a1f3b4ca4b447dd3a036b9d",
      data: '{"uri":"}',
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      
      success: data => {
        this.setState({
          is_playing: 'playing',
        })
      }
    });
  }

  render() {
    return (

      <div className="App" style={{backgroundColor: this.state.current_color[1]}}>

        <header className="App-header">
        <div className="title">
        JamSesh
        </div>
          

          {/* login page */}
          {!this.state.token && (
            <Button className="login" href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}>
              Login to Spotify
            </Button>
          )}

          {/* color toggle */}

          {this.state.token && (
            <Color

              setSage={this.setSage}
              setRetro={this.setRetro}
              setBubblegum={this.setBubblegum}
              // brown={this.brown}
              current_color={this.state.current_color}
            />
          )}

          {/* player */}
          
          {this.state.token && !this.state.no_data && (
              <div className="pb-14 flex flex-col items-center h-full w-full">
                <div className="radioPlayer h-4/5 w-3/4 container relative">
                    <img className="absolute w-auto h-auto" src={radio} alt="radio"></img>
                    <div className="pt-20 object-contain max-w-fit max-h-fit">
                        <Player
                          item={this.state.item}
                          is_playing={this.state.is_playing}
                          progress_ms={this.state.progress_ms}
                          current_color={this.state.current_color}
                          handlePause={this.handlePause}
                        />
                    </div>
                </div>
              </div>

          )}
          {this.state.no_data && (
            <p>
              You're currently not playing anything on Spotify.
            </p>
          )}

          {/* toggle button */}

          {this.state.token && (
            <ToggleButtons 
              time_range={this.state.time_range}
              handleClick1={this.handleClick1}
              handleClick2={this.handleClick2}
              handleClick3={this.handleClick3}
            />
          )}

          {/* stats */}

          {this.state.token && this.state.retrieved_artists &&(  
            <TopArtists
              top_artist_items={this.state.top_artist_items}
              current_color={this.state.current_color}
            />
          )}

          {this.state.token && this.state.retrieved_tracks &&(  
            <TopSongs
              top_track_items={this.state.top_track_items}
              current_color={this.state.current_color}
            />
          )}
          

          {/* genres */}

          {this.state.token &&this.state.retrieved_artists &&(
            <Genres
              top_artist_items={this.state.top_artist_items}
              current_color={this.state.current_color}
            />
          )}
          
        </header>
      </div>
      
    );
  }
}

export default App;