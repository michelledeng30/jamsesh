import React, { Component } from "react";
import * as $ from "jquery";

import { authEndpoint, clientId, redirectUri, scopes } from "./const";
import { track_uri, artist_uri, short_uri, medium_uri, long_uri } from "./const"
import { pause_uri, play_uri, next_uri, prev_uri } from "./const";
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
        duration_ms: 0,
      },
      is_playing: false,
      progress_ms: 0,
      no_data: false,

      // short
      top_track_items_short_term: [{
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
        }
      }],

      retrieved_tracks: false,
      
      top_artist_items_short_term: [{
        genres: [],
        images: [{ url: "" }],
        name: ""
      }],
      
      retrieved_artists: false,

      // medium
      top_track_items_medium_term: [{
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
        }
      }],
      top_artist_items_medium_term: [{
        genres: [],
        images: [{ url: "" }],
        name: ""
      }],
      
      // medium

      top_track_items_long_term: [{
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
        }
      }],
      top_artist_items_long_term: [{
        genres: [],
        images: [{ url: "" }],
        name: ""
      }],

      // other
      time_range: short_uri,

      current_color: sage,
      retrieved_device: false,
      device_info: '',
      image_link: '',
      first_image: false,
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.pausePlayer = this.pausePlayer.bind(this);
    this.playPlayer = this.playPlayer.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.prevSong = this.prevSong.bind(this);
    this.tick = this.tick.bind(this);
    
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTimeRange = this.handleTimeRange.bind(this);

    this.setSage = this.setSage.bind(this);
    this.setRetro = this.setRetro.bind(this);
    this.setBubblegum = this.setBubblegum.bind(this);
    // this.brown = this.brown.bind(this);
  }



  handlePause() {
    this.pausePlayer(this.state.token);
    // this.setState({
    //   is_playing: false,
    // });
    // console.log('handle pause');
  }

  handlePlay() {
    // this.setState({
    //   is_playing: true,
    // });
    // console.log('handle play');
    this.playPlayer(this.state.token);
  }

  handleNext() {
    this.setState({
      is_playing: true,
    });
    this.nextSong(this.state.token);
  }

  handlePrev() {
    this.setState({
      is_playing: true,
    });
    this.prevSong(this.state.token);
  }

  handleImageChange(image_link){
    this.setState({ 
      image_link: image_link,
    });
    console.log(image_link)
  }

  handleTimeRange(time_range){
    this.setState({
      time_range: time_range,
    });
    console.log(time_range)
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

  // runs after first render() lifecycle
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    var uris = [short_uri, medium_uri, long_uri]

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });

      this.getCurrentlyPlaying(_token);
      for (var i = 0; i < uris.length; i++) {
        this.getTopTracks(_token, uris[i])
        this.getTopArtists(_token, uris[i])
      }
      this.getDeviceInfo(_token)
    }
    
    // set interval for polling every 2 seconds
    this.interval = setInterval(() => this.tick(), 100);
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
        // console.log('currently playing');
      }
    });
  }

  getTopTracks(token, length) {
    // make a call using the token
    var item_name = `top_track_items_${length}`;
    $.ajax({
      url: track_uri + length,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          retrieved_tracks: true,
          [item_name]: data.items,
        })
      }
    });
    
  }

  getTopArtists = async(token, length) => {
    var item_name = `top_artist_items_${length}`;
    try{
      const response = await axios.get(artist_uri + length, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      this.setState({
        retrieved_artists: true,
        [item_name]: response.data.items,
      })
    } catch(error){
      console.log(error);
    }
  };

  getDeviceInfo(token) {
    // make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/devices",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        for (var i = 0; i < data.devices.length; i++) {
          if (data.devices[i]["is_active"] === true) {
            this.setState({
              device_info: data.devices[i].id,
              retrieved_device: true
            })
          }
        }
      }
    });
  }

  pausePlayer(token) {
    $.ajax({
      url: pause_uri + this.state.device_info,
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          is_playing: false,
        })
        // console.log('pause')
      }
    });
  }

  playPlayer(token) {
    $.ajax({
      url:  'https://api.spotify.com/v1/me/player/play',
      headers: { 'Authorization': 'Bearer ' + token },
      method: 'PUT',
      dataType: 'json',
      body: {
          // "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
          "offset": {"position": 5}
        },
      success: data => {
        this.setState({
          is_playing: true,
        })
        // console.log('play')
      }
    })
  }

  nextSong(token) {
    $.ajax({
      url: next_uri + this.state.device_info,
      type: "POST",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          is_playing: true,
        })
      }
    });
  }

  prevSong(token) {
    $.ajax({
      url: prev_uri + this.state.device_info,
      type: "POST",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          is_playing: true,
        })
      }
    });
  }

  render() {
    var top_track_items = `top_track_items_${this.state.time_range}`;
    var top_artist_items = `top_artist_items_${this.state.time_range}`;

    if(this.state.retrieved_tracks === true && this.state.first_image === false) {
      this.setState({
        image_link: this.state.top_artist_items_short_term[0].images[0].url,
        first_image: true,
      })
    }

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
                          handlePlay={this.handlePlay}
                          handleNext={this.handleNext}
                          handlePrev={this.handlePrev}
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
              image_link={this.state.image_link}
              handleImageChange={this.handleImageChange}
              handleTimeRange={this.handleTimeRange}
              top_artist_items_short_term={this.state.top_artist_items_short_term}
              top_artist_items_medium_term={this.state.top_artist_items_medium_term}
              top_artist_items_long_term={this.state.top_artist_items_long_term}
            />
          )}

          {/* testing!! */}

          {this.state.token && this.state.retrieved_artists &&(  
            <TopArtists
              top_artist_items={this.state[top_artist_items]}
              image_link={this.state.image_link}
              handleImageChange={this.handleImageChange}
            />
          )}

          {this.state.token && this.state.retrieved_tracks &&(  
            <TopSongs
              top_track_items={this.state[top_track_items]}
              current_color={this.state.current_color}
            />
          )}
          

          {/* genres */}

          {this.state.token &&this.state.retrieved_artists &&(
            <Genres
              top_artist_items={this.state[top_artist_items]}
              current_color={this.state.current_color}
            />
          )}
          
        </header>
      </div>
      
    );
  }
}

export default App;