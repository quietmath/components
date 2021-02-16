/**
 * @module quietmath/components
 */

export const createAudioPlayer = (elementID: string): void => {
    const audio: HTMLAudioElement = document.querySelector(`${ elementID }`);
};

export const createPlaylist = (elementID: string): void => {
    const playlistContainer: HTMLDivElement = document.querySelector(`${ elementID }`);
};
