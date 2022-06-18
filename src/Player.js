import React, { Component } from "react";
import "./Player.css";

export class Player extends Component {
  render () {
    const progressBarStyles = {
      width: (this.props.progress_ms * 100 / this.props.item.duration_ms) + '%'
    };
  
    const player_color = this.props.current_color[0];

    return (
      <div className="App">
        
        <div className="player-wrapper">
  
            <div className="now-playing__img">
              <img src={this.props.item.album.images[0].url} />
            </div>
            <div className="now-playing__side">
              <div className="now-playing__name">{this.props.item.name}</div>
              <div className="now-playing__artist">
                {this.props.item.artists[0].name}
              </div>
              <div className="now-playing__status">
                {this.props.is_playing ? "playing" : "paused"}
              </div>
              <div className="progress">
                <div className="progress__bar" style={progressBarStyles} />
              </div>
              <div className="pause-header">
                <button className="pause-button" onClick={this.props.handlePause}>
                  pause
                </button>
                <button className="play-button" onClick={this.props.handlePlay}>
                  play
                </button>
              </div>
            </div>
          </div>
  
      </div>
    );
  }

  
}

export default Player;


