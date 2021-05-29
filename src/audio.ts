/**
 * @module quietmath/components
 */

export interface AudioPlayerOptions {
    ContainerID: string;
    DefaultSource: string;
}

export class AudioPlayer {
    private _opts: AudioPlayerOptions;
    private _audioContainer: HTMLDivElement;
    constructor(opts: AudioPlayerOptions) {
        this._opts = opts;
        const { ContainerID, DefaultSource } = this._opts;
        const audioContainer: HTMLDivElement = document.querySelector(`#${ ContainerID }`);
        const audioPlayer: HTMLAudioElement = audioContainer.querySelector('audio');
        if(DefaultSource != null) {
            audioPlayer.src = DefaultSource;
        }
        if(audioPlayer.controls == null) {
            audioPlayer.controls = true;
        }
        audioPlayer.style.display = 'block';
        this._audioContainer = audioContainer;
    }
    public withPlaylist(playlistID: string): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const audioPlayer = self._audioContainer.querySelector('audio');
        const playlist: HTMLDataListElement = document.querySelector(`#${ playlistID }`);
        const anchorNodes: NodeListOf<HTMLElement> = playlist.querySelectorAll('dt');
        const anchors = Array.from(anchorNodes);
        anchors.forEach((anchor: HTMLDataListElement) => {
            anchor.addEventListener('click', function(): void {
                const source: string = anchor.getAttribute('data-source');
                const img: string = anchor.getAttribute('data-cover-img');
                const title: string = anchor.getAttribute('data-title') || anchor.innerText;
                const pubDate: string = anchor.getAttribute('data-pub');
                const summary: string = anchor.getAttribute('data-summary');
                audioPlayer.pause();
                audioPlayer.src = source;
                const audioPlayerCover: HTMLDivElement = self._audioContainer.querySelector('#audio-player-cover');
                if(audioPlayerCover) {
                    const coverImage: HTMLImageElement = document.createElement('img');
                    coverImage.src = img;
                    coverImage.title = title;
                    coverImage.alt = title;
                    audioPlayerCover.innerHTML = '';
                    audioPlayerCover.appendChild(coverImage);
                }
                const audioPlayerTitle: HTMLDivElement = self._audioContainer.querySelector('#audio-player-title');
                if(audioPlayerTitle) {
                    audioPlayerTitle.innerText = title;
                }
                const audioPlayerDate: HTMLDivElement = self._audioContainer.querySelector('#audio-player-date');
                if(audioPlayerDate) {
                    audioPlayerDate.innerText = pubDate;
                }
                const audioPlayerSummary: HTMLDivElement = self._audioContainer.querySelector('#audio-player-summary');
                if(audioPlayerSummary) {
                    audioPlayerSummary.innerText = summary;
                }
                audioPlayer.play();
            });
        });
    }
}

export const createAudioPlayer = (audioContainerID: string, defaultSource?: string): AudioPlayer => {
    return new AudioPlayer({ ContainerID: audioContainerID, DefaultSource: defaultSource });
};
