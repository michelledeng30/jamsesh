
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "3227ca59f3d647409b90fa761b67d041";
export const redirectUri = "http://localhost:3000/";
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read"
];
