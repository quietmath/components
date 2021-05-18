(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * @module quietmath/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylist = exports.createAudioPlayer = void 0;
const createAudioPlayer = (audioContainerID, defaultSource) => {
    const audioContainer = document.querySelector(`#${audioContainerID}`);
    const audioPlayer = audioContainer.querySelector('audio');
    if (defaultSource != null) {
        audioPlayer.src = defaultSource;
    }
    if (audioPlayer.controls == null) {
        audioPlayer.controls = true;
    }
    audioPlayer.style.display = 'block';
    return audioContainer;
};
exports.createAudioPlayer = createAudioPlayer;
const createPlaylist = (audioContainer, playlistID) => {
    const audioPlayer = audioContainer.querySelector('audio');
    const playlist = document.querySelector(`#${playlistID}`);
    const anchorNodes = playlist.querySelectorAll('dt');
    const anchors = Array.from(anchorNodes);
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', function () {
            const source = anchor.getAttribute('data-source');
            const img = anchor.getAttribute('data-cover-img');
            const title = anchor.getAttribute('data-title') || anchor.innerText;
            audioPlayer.pause();
            audioPlayer.src = source;
            const audioPlayerCover = audioContainer.querySelector('.audio-player-cover');
            if (audioPlayerCover) {
                const coverImage = document.createElement('img');
                coverImage.src = img;
                coverImage.title = title;
                coverImage.alt = title;
                audioPlayerCover.innerHTML = '';
                audioPlayerCover.appendChild(coverImage);
            }
            const audioPlayerTitle = audioContainer.querySelector('.audio-player-title');
            if (audioPlayerTitle) {
                audioPlayerTitle.innerText = title;
            }
            audioPlayer.play();
        });
    });
};
exports.createPlaylist = createPlaylist;

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
const rotateListStyleType = (order) => {
    order = order || ['disc', 'circle', 'square'];
    const prose = document.querySelector('.ProseMirror');
    if (prose != null) {
        const uls = prose.querySelectorAll('ul');
        const arr = Array.from(uls).filter((e) => e.closest('li') == null);
        arr.forEach((elem) => traverseList(elem, 0, order));
    }
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
const container = index_1.createAudioPlayer('audio-player', 'https://archive.org/download/apotheosis-trailer/apotheosis-trailer.mp3');
index_1.createPlaylist(container, 'playlist');

},{"../dist/index":4}]},{},[5])
//# sourceMappingURL=bundle.js.map
