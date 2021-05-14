/**
 * @module quietmath/components
 */

export const createAudioPlayer = (audioPlayerID: string, defaultSource?: string): void => {
    const audio: HTMLAudioElement = document.querySelector(`${ audioPlayerID }`);
    if(defaultSource != null) {
        audio.src = defaultSource;
    }
    if(audio.controls == null) {
        audio.controls = true;
    }
    audio.style.display = 'block';
};

export const createPlaylist = (audioPlayer: HTMLAudioElement, playlistContainerID: string, playlistID: string): void => {
    const playlistContainer: HTMLDivElement = document.querySelector(`${ playlistContainerID }`);
    const playlist: HTMLDataListElement = document.querySelector(`${ playlistID }`);
    const anchorNodes: NodeListOf<HTMLElement> = playlist.querySelectorAll('dt');
    const anchors = Array.from(anchorNodes);
    anchors.forEach((anchor: HTMLDataListElement) => {
        anchor.addEventListener('click', function(): void {
            const source = anchor.getAttribute('data-source');
            audioPlayer.pause();
            audioPlayer.src = source;
            audioPlayer.play();
        });
    });
};
