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
        const audioContainer = document.querySelector(`#${ ContainerID }`) as HTMLDivElement;
        const audioPlayer = audioContainer.querySelector('audio') as HTMLAudioElement;
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
        const audioPlayer = self._audioContainer.querySelector('audio') as HTMLAudioElement;
        const playlist = document.querySelector(`#${ playlistID }`) as HTMLDataListElement;
        const anchorNodes: NodeListOf<HTMLElement> = playlist.querySelectorAll('dt');
        const anchors = Array.from(anchorNodes);
        anchors.forEach((anchor: HTMLElement) => {
            anchor.addEventListener('click', function(): void {
                const source = anchor.getAttribute('data-source') as string;
                const img = anchor.getAttribute('data-cover-img') as string;
                const title = anchor.getAttribute('data-title') || anchor.innerText as string;
                const pubDate = anchor.getAttribute('data-pub') as string;
                const summary = anchor.getAttribute('data-summary') as string;
                audioPlayer.pause();
                audioPlayer.src = source;
                const audioPlayerCover = self._audioContainer.querySelector('#audio-player-cover') as HTMLDivElement;
                if(audioPlayerCover) {
                    const coverImage: HTMLImageElement = document.createElement('img');
                    coverImage.src = img;
                    coverImage.title = title;
                    coverImage.alt = title;
                    audioPlayerCover.innerHTML = '';
                    audioPlayerCover.appendChild(coverImage);
                }
                const audioPlayerTitle = self._audioContainer.querySelector('#audio-player-title') as HTMLDivElement;
                if(audioPlayerTitle) {
                    audioPlayerTitle.innerText = title;
                }
                const audioPlayerDate = self._audioContainer.querySelector('#audio-player-date') as HTMLDivElement;
                if(audioPlayerDate) {
                    audioPlayerDate.innerText = pubDate;
                }
                const audioPlayerSummary = self._audioContainer.querySelector('#audio-player-summary') as HTMLDivElement;
                if(audioPlayerSummary) {
                    audioPlayerSummary.innerText = summary;
                }
                audioPlayer.play();
            });
        });
    }
}

export const createAudioPlayer = (audioContainerID: string, defaultSource?: string): AudioPlayer => {
    return new AudioPlayer({ ContainerID: audioContainerID, DefaultSource: defaultSource as string });
};
