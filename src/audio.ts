import { s } from '@quietmath/proto';

/**
 * @module quietmath/components
 */

export interface AudioPlayerOptions {
    ContainerID: string;
    DefaultDataSource?: any[];
    DefaultDataSourceURL?: string;
    DefaultSourceURL?: string;
    DefaultImageURL?: string;
    DefaultTitle?: string;
    DefaultPubDate?: string;
    DefaultSummary?: string;
}

const wrapAudioControl = (audioElement: HTMLAudioElement, opts: AudioPlayerOptions): HTMLDivElement => {
    const audio: HTMLAudioElement = audioElement.cloneNode(true) as HTMLAudioElement;
    audio.setAttribute('controls', 'controls');
    const source: HTMLSourceElement = audio.querySelector('source');
    source.setAttribute('src', opts.DefaultSourceURL);
    source.setAttribute('type', 'audio/mpeg');
    audioElement.remove();

    const audioContainer: HTMLDivElement = document.createElement('div');
    audioContainer.setAttribute('id', 'audio-container');
    audioContainer.className = 'audio-player';
    
    const audioPlayer: HTMLDivElement = document.createElement('div');
    audioPlayer.setAttribute('id', 'audio-player');
    audioContainer.appendChild(audioPlayer);
    
    const audioPlayerCover: HTMLDivElement = document.createElement('div');
    audioPlayerCover.setAttribute('id', 'audio-player-cover');
    audioPlayer.appendChild(audioPlayerCover);
    if(opts.DefaultImageURL) {
        const img = document.createElement('img');
        img.src = opts.DefaultImageURL;
        img.alt = opts.DefaultTitle;
        audioPlayerCover.appendChild(img);
    }

    const audioPlayerDetails: HTMLDivElement = document.createElement('div');
    audioPlayerDetails.setAttribute('id', 'audio-player-details');
    audioPlayer.appendChild(audioPlayerDetails);

    const audioPlayerTitle: HTMLDivElement = document.createElement('div');
    audioPlayerTitle.setAttribute('id', 'audio-player-title');
    audioPlayerTitle.innerText = opts.DefaultTitle;
    audioPlayerDetails.appendChild(audioPlayerTitle);

    const audioPlayerDate: HTMLDivElement = document.createElement('div');
    audioPlayerDate.setAttribute('id', 'audio-player-date');
    audioPlayerDate.innerText = opts.DefaultPubDate;
    audioPlayerDetails.appendChild(audioPlayerDate);

    const audioPlayerSummary: HTMLElement = document.createElement('summary');
    audioPlayerSummary.setAttribute('id', 'audio-player-summary');
    audioPlayerSummary.className = 'break';
    audioPlayer.appendChild(audioPlayerSummary);

    audioPlayer.appendChild(audio);

    return audioContainer;
};

const withPlaylist = (audioContainer: HTMLDivElement, opts: AudioPlayerOptions): void => {
    const audioPlayer = audioContainer.querySelector('audio');
    
    //CREATE
    const playlistID = `${ audioContainer.getAttribute('id') }-playlist`;
    const playlist: HTMLDataListElement = document.querySelector(`#${ playlistID }`);
    
    //NEED TO BUILD AND GET DATA

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
            const audioPlayerDate: HTMLDivElement = audioContainer.querySelector('#audio-player-date');
            if(audioPlayerDate) {
                audioPlayerDate.innerText = pubDate;
            }
            const audioPlayerSummary: HTMLDivElement = audioContainer.querySelector('#audio-player-summary');
            if(audioPlayerSummary) {
                audioPlayerSummary.innerText = summary;
            }
            audioPlayer.play();
        });
    });
};

export const wrapAudioWithPlayer = (selector?: string, exclusion?: string, data?: any): void => {
    selector = selector || 'audio';
    exclusion = exclusion || 'data-no-player';
    const audioControls: NodeListOf<HTMLAudioElement> = document.querySelectorAll(selector);
    const arr: HTMLAudioElement[] = Array.from(audioControls);
    arr.filter((e: HTMLAudioElement) => e.getAttribute(exclusion) == null)
        .forEach((audioControl: HTMLAudioElement): void => {
            const ContainerID: string = audioControl.getAttribute('data-id');
            const DefaultDataSourceURL: string = audioControl.getAttribute('data-source-url');
            const DefaultImageURL: string = audioControl.getAttribute('data-image-url');
            const DefaultTitle: string = audioControl.getAttribute('data-title');
            const DefaultPubDate: string = audioControl.getAttribute('data-pub-date');
            const DefaultSummary: string = audioControl.getAttribute('data-summary');
            const controlWithPlaylist: boolean = s(audioControl.getAttribute('data-playlist')).toBool();
            const opts: AudioPlayerOptions = {
                ContainerID: ContainerID,
                DefaultDataSource: data,
                DefaultDataSourceURL: DefaultDataSourceURL,
                DefaultImageURL: DefaultImageURL,
                DefaultTitle: DefaultTitle,
                DefaultPubDate: DefaultPubDate,
                DefaultSummary: DefaultSummary
            };
            const audioControlResult = wrapAudioControl(audioControl, opts);
            if(controlWithPlaylist) {
                withPlaylist(audioControlResult, opts);
            }
        });
};
