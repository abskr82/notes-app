// @ts-nocheck
export function debounce(func, delay = 300) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay);
    }
}


export const defaultFolderId = 'defaultFolderId';

export const getDefaultNote = (selectedFolderId?: string) => {
    return (
        {
            id: Date.now().toString(),
            title: 'New Note',
            content: '',
            folderId: selectedFolderId || defaultFolderId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    )

}

export const defaultFolder = { id: defaultFolderId, name: "Notes" };