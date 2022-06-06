import React from "react";
import "./Genres.css";

const Genres = props => {
    let items = props.top_artist_items;
    let genre_array = [];

    for (let i = 0; i < 5; i++) {
        genre_array = genre_array.concat(items[i].genres);
    }

    let counts = {};
    for (let current_genre of genre_array){
        counts[current_genre] = counts[current_genre] ? counts[current_genre] + 1 : 1;
    }

    return (
        <div className="App">
            <div className="genres-wrapper">
                <h2 className="genres-header">top genres</h2>
                <ol className="genres-list">
                    {genre_array.map((current_genre) => (
                        <li>{current_genre}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Genres;