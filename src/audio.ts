/**
 * @module quietmath/components
 */

export const createAudioPlayer = (audioContainerID: string, defaultSource?: string): HTMLDivElement => {
    const audioContainer: HTMLDivElement = document.querySelector(`#${ audioContainerID }`);
    const audioPlayer: HTMLAudioElement = audioContainer.querySelector('audio');
    if(defaultSource != null) {
        audioPlayer.src = defaultSource;
    }
    if(audioPlayer.controls == null) {
        audioPlayer.controls = true;
    }
    audioPlayer.style.display = 'block';
    return audioContainer;
};

export const createPlaylist = (audioContainer: HTMLDivElement, playlistID: string): void => {
    const audioPlayer = audioContainer.querySelector('audio');
    const playlist: HTMLDataListElement = document.querySelector(`#${ playlistID }`);
    const anchorNodes: NodeListOf<HTMLElement> = playlist.querySelectorAll('dt');
    const anchors = Array.from(anchorNodes);
    anchors.forEach((anchor: HTMLDataListElement) => {
        anchor.addEventListener('click', function(): void {
            const source: string = anchor.getAttribute('data-source');
            const img: string = anchor.getAttribute('data-cover-img');
            const title: string = anchor.getAttribute('data-title') || anchor.innerText;
            audioPlayer.pause();
            audioPlayer.src = source;
            const audioPlayerCover: HTMLDivElement = audioContainer.querySelector('#audio-player-cover');
            if(audioPlayerCover) {
                const coverImage: HTMLImageElement = document.createElement('img');
                coverImage.src = img;
                coverImage.title = title;
                coverImage.alt = title;
                audioPlayerCover.innerHTML = '';
                audioPlayerCover.appendChild(coverImage);
            }
            const audioPlayerTitle: HTMLDivElement = audioContainer.querySelector('#audio-player-title');
            if(audioPlayerTitle) {
                audioPlayerTitle.innerText = title;
            }
            audioPlayer.play();
        });
    });
};
