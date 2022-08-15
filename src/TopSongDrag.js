import React, { useState, useEffect, useRef } from 'react';
import "./Top.css";
import {useDrag} from 'react-use-gesture';
import Draggable, {DraggableCore} from 'react-draggable';




const TopSongDrag = props => {
  const ref = useRef(null);
  const [dragDiv, setDragDiv] = useState(0);
 
    useEffect(() => {
        // You now have access to the height, width etc.
        setDragDiv(ref.current.getBoundingClientRect());
    }, []);



  return (
  
    <Draggable bounds={{top: 0, left: 0, right: props.tracksDivDimensions.width-dragDiv.width, bottom: props.tracksDivDimensions.height-dragDiv.height}} {...props.dragHandlers}>
      <div ref={ref} className="DragBox relative flex justify-center items-center">
          <div className="DragImg">
            <img draggable="false" src={props.AlbumImg} alt="ArtistImage"></img>
          </div>
          <div className="DragText text-xs">
            <div className="flex flex-col">
              <p>
                {props.SongArtist}
              </p>
              <p>
                {props.SongTitle}
              </p>
            </div>
          </div>
      </div>
    </Draggable>
  );
}

export default TopSongDrag;