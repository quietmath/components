import { createAudioPlayer, createPlaylist } from '../dist/index';

const container = createAudioPlayer('audio-player', 'https://archive.org/download/apotheosis-trailer/apotheosis-trailer.mp3');
createPlaylist(container, 'playlist');
