/**
 * @module quietmath/components
 */

export const createAudioPlayer = (elementID: string, defaultSource?: string): void => {
    const audio: HTMLAudioElement = document.querySelector(`${ elementID }`);
    if(defaultSource != null) {
        audio.src = defaultSource;
    }
    if(audio.controls == null) {
        audio.controls = true;
    }
    audio.style.display = 'block';
};

export const createPlaylist = (elementID: string): void => {
    const playlistContainer: HTMLDivElement = document.querySelector(`${ elementID }`);
};
