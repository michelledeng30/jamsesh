
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "3227ca59f3d647409b90fa761b67d041";
export const redirectUri = "http://localhost:3000/";
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const track_uri = "https://api.spotify.com/v1/me/top/tracks?time_range=";
export const artist_uri = "https://api.spotify.com/v1/me/top/artists?time_range=";
export const short_uri = "short_term";
export const medium_uri = "medium_term";
export const long_uri = "long_term";

export const pause_uri = "https://api.spotify.com/v1/me/player/pause?device_id=";
export const play_uri = "https://api.spotify.com/v1/me/player/play?device_id="