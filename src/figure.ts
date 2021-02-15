/**
 * @module quietmath/components
 */

export const wrapImageWithFigure = (selector?: string, exclusion?: string): void => {
    selector = selector || 'img';
    exclusion = exclusion || 'data-no-caption';
    const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(selector);
    const arr: HTMLImageElement[] = Array.from(imgs);
    arr.filter((e: HTMLImageElement) => e.getAttribute(exclusion) == null)
        .forEach((img: HTMLImageElement): void => {
            const caption: string = img.getAttribute('title') || img.getAttribute('alt');
            if(caption != null) {
                const figure: HTMLElement = document.createElement('figure');
                const figCaption: HTMLElement = document.createElement('figcaption');
                figCaption.innerText = caption;
                figure.appendChild(img.cloneNode(true));
                figure.appendChild(figCaption);
                img.replaceWith(figure);
            }
        });
};
