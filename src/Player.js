import React, { Component } from "react";
import "./Player.css";
import pause_button from './images/PauseButton.png';
import play_button from './images/PlayButton.png';
import skip_button from './images/SkipButton.jpg';
import prev_button from './images/PrevButton.png'

export class Player extends Component {
  render () {
    const progressBarStyles = this.props.item.duration_ms ? { 
      width: (this.props.progress_ms * 100 / this.props.item.duration_ms) + '%'
    } : {
      width: 0
    };
  
    const player_color = this.props.current_color[0];

    let button;
    if (this.props.is_playing) {
      button = <button className="pause-button" onClick={this.props.handlePause}>
      <img src={pause_button} />
    </button>
    } else {
      button = <button className="play-button" onClick={this.props.handlePlay}>
      <img src={play_button} />
    </button>
    }


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
                {this.props.is_playing}
              </div>

              <div className="progress">
                <div className="progress__bar" style={progressBarStyles} />
              </div>

             

              <div className="buttons-wrapper">
                <div className="prev-header">
                  <button onClick={this.props.handlePrev}>
                    <img src={prev_button}></img>
                  </button>
                </div>
                <div className="pause-play-header">
                  {button}
                </div>

                <div className="next-header">
                  <button onClick={this.props.handleNext}>
                    <img src={skip_button}></img>
                  </button>
                </div>
              </div>

              
              
            </div>
          </div>
  
      </div>
    );
  }

  
}

export default Player;


