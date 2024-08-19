//@ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import foldersReducer from './slices/foldersSlice';
import { loadState } from '../localStorage';
import { defaultFolder, getDefaultNote } from '../utils/utils';
import { vi } from 'vitest';
import { RootState } from './store';

vi.mock('../localStorage');

describe('Redux store', () => {
    let store: ReturnType<typeof configureStore>;


    beforeEach(() => {
        (loadState as vi.Mock).mockReturnValueOnce(undefined); // For notes
        (loadState as vi.Mock).mockReturnValueOnce(undefined); // For folders

        store = configureStore({
            reducer: {
                notes: notesReducer,
                folders: foldersReducer,
            },
            preloadedState: {
                notes: { notes: [getDefaultNote()] },
                folders: { folders: [defaultFolder] },
            },
        });
    });

    it('should initialize with default state', () => {
        const state = store.getState() as RootState;

        expect(state.notes.notes).toHaveLength(1);
        expect(state.notes.notes[0].title).toBe('New Note');
        expect(state.folders.folders).toHaveLength(1);
        expect(state.folders.folders[0].name).toBe('Notes');
    });

});
