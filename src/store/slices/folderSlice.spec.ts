// foldersSlice.spec.ts
import { describe, it, expect } from 'vitest';
import reducer, { addFolder, selectFolder, deleteFolder, foldersSelector, selectedFolderIdSelector } from './foldersSlice';
import { RootState } from '../store';

const initialState = {
    folders: [],
    selectedFolderId: null,
};

describe('foldersSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle addFolder', () => {
        const newFolder = { id: '1', name: 'Test Folder' };
        const actual = reducer(initialState, addFolder(newFolder));
        expect(actual.folders).toContainEqual(newFolder);
    });

    it('should handle selectFolder', () => {
        const actual = reducer(initialState, selectFolder('1'));
        expect(actual.selectedFolderId).toEqual('1');
    });

    it('should handle deleteFolder', () => {
        const stateWithFolders = {
            folders: [{ id: '1', name: 'Test Folder' }, { id: '2', name: 'Another Folder' }],
            selectedFolderId: null,
        };
        const actual = reducer(stateWithFolders, deleteFolder('1'));
        expect(actual.folders).toHaveLength(1);
        expect(actual.folders).not.toContainEqual({ id: '1', name: 'Test Folder' });
    });

    it('should select folders using foldersSelector', () => {
        const state = { folders: { folders: [{ id: '1', name: 'Test Folder' }], selectedFolderId: '1' } } as RootState;
        const folders = foldersSelector(state);
        expect(folders).toHaveLength(1);
        expect(folders[0].name).toBe('Test Folder');
    });

    it('should select selectedFolderId using selectedFolderIdSelector', () => {
        const state = { folders: { folders: [{ id: '1', name: 'Test Folder' }], selectedFolderId: '1' } } as RootState;;
        const selectedFolderId = selectedFolderIdSelector(state);
        expect(selectedFolderId).toBe('1');
    });
});
