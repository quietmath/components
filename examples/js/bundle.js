(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * @module quietmath/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioPlayer = exports.AudioPlayer = void 0;
class AudioPlayer {
    constructor(opts) {
        this._opts = opts;
        const { ContainerID, DefaultSource } = this._opts;
        const audioContainer = document.querySelector(`#${ContainerID}`);
        const audioPlayer = audioContainer.querySelector('audio');
        if (DefaultSource != null) {
            audioPlayer.src = DefaultSource;
        }
        if (audioPlayer.controls == null) {
            audioPlayer.controls = true;
        }
        audioPlayer.style.display = 'block';
        this._audioContainer = audioContainer;
    }
    withPlaylist(playlistID) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const audioPlayer = self._audioContainer.querySelector('audio');
        const playlist = document.querySelector(`#${playlistID}`);
        const anchorNodes = playlist.querySelectorAll('dt');
        const anchors = Array.from(anchorNodes);
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', function () {
                const source = anchor.getAttribute('data-source');
                const img = anchor.getAttribute('data-cover-img');
                const title = anchor.getAttribute('data-title') || anchor.innerText;
                const pubDate = anchor.getAttribute('data-pub');
                const summary = anchor.getAttribute('data-summary');
                audioPlayer.pause();
                audioPlayer.src = source;
                const audioPlayerCover = self._audioContainer.querySelector('#audio-player-cover');
                if (audioPlayerCover) {
                    const coverImage = document.createElement('img');
                    coverImage.src = img;
                    coverImage.title = title;
                    coverImage.alt = title;
                    audioPlayerCover.innerHTML = '';
                    audioPlayerCover.appendChild(coverImage);
                }
                const audioPlayerTitle = self._audioContainer.querySelector('#audio-player-title');
                if (audioPlayerTitle) {
                    audioPlayerTitle.innerText = title;
                }
                const audioPlayerDate = self._audioContainer.querySelector('#audio-player-date');
                if (audioPlayerDate) {
                    audioPlayerDate.innerText = pubDate;
                }
                const audioPlayerSummary = self._audioContainer.querySelector('#audio-player-summary');
                if (audioPlayerSummary) {
                    audioPlayerSummary.innerText = summary;
                }
                audioPlayer.play();
            });
        });
    }
}
exports.AudioPlayer = AudioPlayer;
const createAudioPlayer = (audioContainerID, defaultSource) => {
    return new AudioPlayer({ ContainerID: audioContainerID, DefaultSource: defaultSource });
};
exports.createAudioPlayer = createAudioPlayer;

},{}],2:[function(require,module,exports){
"use strict";
/**
 * @module quietmath/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateListStyleType = void 0;
function traverseList(elem, level, order) {
    if (level == 3) {
        level = 0;
    }
    elem.style.listStyleType = order[level];
    const children = elem.querySelectorAll(':scope > li > ul');
    Array.from(children).forEach((el) => traverseList(el, level + 1, order));
}
const rotateListStyleType = (selector, order) => {
    selector = selector || 'ul';
    order = order || ['disc', 'circle', 'square'];
    const uls = document.querySelectorAll(selector);
    const arr = Array.from(uls).filter((e) => e.closest('li') == null);
    arr.forEach((elem) => traverseList(elem, 0, order));
};
exports.rotateListStyleType = rotateListStyleType;

},{}],3:[function(require,module,exports){
"use strict";
/**
 * @module quietmath/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapImageWithFigure = void 0;
const wrapImageWithFigure = (selector, exclusion) => {
    selector = selector || 'img';
    exclusion = exclusion || 'data-no-caption';
    const imgs = document.querySelectorAll(selector);
    const arr = Array.from(imgs);
    arr.filter((e) => e.getAttribute(exclusion) == null)
        .forEach((img) => {
        const caption = img.getAttribute('title') || img.getAttribute('alt');
        if (caption != null) {
            const figure = document.createElement('figure');
            const figCaption = document.createElement('figcaption');
            figCaption.innerText = caption;
            figure.appendChild(img.cloneNode(true));
            figure.appendChild(figCaption);
            img.replaceWith(figure);
        }
    });
};
exports.wrapImageWithFigure = wrapImageWithFigure;

},{}],4:[function(require,module,exports){
"use strict";
/**
 * @module quietmath/components
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./audio"), exports);
__exportStar(require("./bullets"), exports);
__exportStar(require("./figure"), exports);

},{"./audio":1,"./bullets":2,"./figure":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dist/index");
index_1.createAudioPlayer('audio-player', 'https://archive.org/download/apotheosis-trailer/apotheosis-trailer.mp3')
    .withPlaylist('playlist');

},{"../dist/index":4}]},{},[5])
//# sourceMappingURL=bundle.js.map
