import React, { useState, useEffect, useRef } from 'react';
import "./Top.css";
import songTab from './images/SongsTab.png';
import DragBox from "./TopSongDrag";
 
 
const TopSongs = props => {
    const ref = useRef(null);
    const [tracksDiv, setTrackDiv] = useState(0);
 
    useEffect(() => {
        // You now have access to the height, width etc.
        setTrackDiv(ref.current.getBoundingClientRect());
    }, []);


 
    return (
        <div className="App">
            <div className="tracks-box" style={{backgroundImage: `url(${songTab})`}}>
                <div ref={ref} className="top-tracks">
                    <DragBox
                        SongTitle={props.top_track_items[0].name}
                        SongArtist={props.top_track_items[0].artists[0].name}
                        AlbumImg={props.top_track_items[0].album.images[0].url}
                        dragHandlers= {props.dragHandlers}
                        tracksDivDimensions = {tracksDiv}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default TopSongs;
