import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { selectedFolderIdSelector } from './foldersSlice';

interface Note {
    id: string;
    title: string;
    content: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
}

export interface NotesState {
    notes: Note[];
    selectedNoteId: string | null;
}

const initialState: NotesState = {
    notes: [],
    selectedNoteId: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote(state, action: PayloadAction<Note>) {
            state.notes.push(action.payload);
            state.selectedNoteId = action.payload.id;
        },
        updateNote(state, action: PayloadAction<Note>) {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        selectNote(state, action: PayloadAction<string>) {
            state.selectedNoteId = action.payload;
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        deleteNoteFromFolder: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.folderId !== action.payload);
        },
    },
});

export const { addNote, updateNote, selectNote, deleteNote, deleteNoteFromFolder } = notesSlice.actions;

const selectSelf = (state: RootState) => state.notes;
export const selectNotesSelector = createDraftSafeSelector(selectSelf, (state) => state.notes);


export const selectNotesInSelectedFolder = createDraftSafeSelector(
    // Input selectors
    [(state: RootState) => selectNotesSelector(state), selectedFolderIdSelector],
    // Output selector (combiner function)
    (notes, selectedFolderId) => {
        if (!selectedFolderId) return [];
        return notes.filter(note => note.folderId === selectedFolderId);
    }
);

export default notesSlice.reducer;
