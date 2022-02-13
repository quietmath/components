/**
 * @module quietmath/components
 */

function traverseList(elem: HTMLUListElement, level: number, order: string[]): void {
    if(level == 3) {
        level = 0;
    }
    elem.style.listStyleType = order[level];
    const children = elem.querySelectorAll(':scope > li > ul');
    Array.from(children).forEach((el: Element) => traverseList(el as HTMLUListElement, level + 1, order));
}

export const rotateListStyleType = (selector?: string, order?: string[]): void => {
    selector = selector || 'ul';
    order = order || ['disc', 'circle', 'square'];
    const uls: NodeListOf<HTMLUListElement> = document.querySelectorAll(selector);
    const arr: HTMLUListElement[] = Array.from(uls).filter((e: HTMLUListElement) => e.closest('li') == null);
    arr.forEach((elem: HTMLUListElement): void => traverseList(elem, 0, order as string[]));
};
