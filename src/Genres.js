import React from "react";
import "./Genres.css";

const Genres = props => {

    function getRankings() {
        let items = props.top_artist_items;
        let genre_array = [];
    
        for (let i = 0; i < 20; i++) {
            genre_array = genre_array.concat(items[i].genres);
        }
    
        let counts_hash = {};
        for (let current_genre of genre_array){
            counts_hash[current_genre] = counts_hash[current_genre] ? counts_hash[current_genre] + 1 : 1;
        }
        let result_hash = {};
        let keys = Object.keys(counts_hash);
        keys.sort(function(a, b) {
            return counts_hash[a] - counts_hash[b]
        }).reverse().forEach(function(k){
            result_hash[k] = counts_hash[k];
        });
        return result_hash;
    }

    let freq_hash = getRankings();
    let rankings = (Object.keys(freq_hash)).slice(0, 10);

    return (
        <div className="App">
            <div className="genres-wrapper">
                <h2 className="genres-header">top genres</h2>
                <ol className="genres-list">
                    {rankings.map((current_genre) => (
                        <li>{current_genre}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Genres;