/**
 * @module quietmath/components
 */

function traverseList(elem: HTMLUListElement, level: number, order: string[]): void {
    if(level == 3) {
        level = 0;
    }
    elem.style.listStyleType = order[level];
    const children = elem.querySelectorAll(':scope > li > ul');
    Array.from(children).forEach((el: HTMLUListElement) => traverseList(el, level + 1, order));
}

export const rotateListStyleType = (order?: string[]): void => {
    order = order || ['disc', 'circle', 'square'];
    const prose: HTMLElement = document.querySelector('.ProseMirror');
    if(prose != null) {
        const uls: NodeListOf<HTMLUListElement> = prose.querySelectorAll('ul');
        const arr: HTMLUListElement[] = Array.from(uls).filter((e: HTMLUListElement) => e.closest('li') == null);
        arr.forEach((elem: HTMLUListElement): void => traverseList(elem, 0, order));
    }    
};
