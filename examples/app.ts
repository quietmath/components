import { createAudioPlayer } from '../dist/index';

createAudioPlayer('audio-player', 'https://archive.org/download/apotheosis-trailer/apotheosis-trailer.mp3')
    .withPlaylist('playlist');
