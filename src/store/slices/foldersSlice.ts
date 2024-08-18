// src/features/foldersSlice.ts

import { createSlice, PayloadAction, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Folder {
    id: string;
    name: string;
}

export interface FoldersState {
    folders: Folder[];
    selectedFolderId: string | null;
}

const initialState: FoldersState = {
    folders: [],
    selectedFolderId: null,
};

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        addFolder(state, action: PayloadAction<Folder>) {
            state.folders.push(action.payload);
        },
        selectFolder(state, action: PayloadAction<string>) {
            state.selectedFolderId = action.payload;
        },
        deleteFolder: (state, action: PayloadAction<string>) => {
            state.folders = state.folders.filter(folder => folder.id !== action.payload);
        }
    },
});

export const { addFolder, selectFolder, deleteFolder } = foldersSlice.actions;

const selectSelf = (state: RootState) => state.folders
export const foldersSelector = createDraftSafeSelector(selectSelf, (state) => state.folders);
export const selectedFolderIdSelector = createDraftSafeSelector(selectSelf, (state) => state.selectedFolderId);


export default foldersSlice.reducer;
