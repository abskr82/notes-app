// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import notesReducer, { NotesState } from './slices/notesSlice';
import foldersReducer, { FoldersState } from './slices/foldersSlice';
import { loadState, saveState } from '../localStorage';
import { defaultFolder, getDefaultNote } from '../utils/utils';

interface RootState {
    notes: NotesState;
    folders: FoldersState;
}

const persistedNotes = loadState<NotesState>('notes');
const persistedFolders = loadState<FoldersState>('folders');

const store = configureStore({
    reducer: {
        notes: notesReducer,
        folders: foldersReducer,
    },
    preloadedState: {
        notes: persistedNotes || { notes: [getDefaultNote()] },
        folders: persistedFolders || { folders: [defaultFolder] },
    },
});

store.subscribe(() => {
    saveState('notes', store.getState().notes);
    saveState('folders', store.getState().folders);
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
export default store;
