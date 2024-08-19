// notesSlice.spec.ts
import { describe, it, expect } from 'vitest';
import reducer, { addNote, updateNote, selectNote, deleteNote, deleteNoteFromFolder, selectNotesInSelectedFolder } from './notesSlice';
import { RootState } from '../store';

const initialState = {
    notes: [],
    selectedNoteId: null,
};

describe('notesSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle addNote', () => {
        const newNote = { id: '1', title: 'Test Note', content: '', folderId: '1', createdAt: '', updatedAt: '' };
        const actual = reducer(initialState, addNote(newNote));
        expect(actual.notes).toContainEqual(newNote);
        expect(actual.selectedNoteId).toEqual(newNote.id);
    });

    it('should handle updateNote', () => {
        const stateWithNote = { notes: [{ id: '1', title: 'Test Note', content: '', folderId: '1', createdAt: '', updatedAt: '' }], selectedNoteId: '1' };
        const updatedNote = { id: '1', title: 'Updated Note', content: 'Updated', folderId: '1', createdAt: '', updatedAt: '' };
        const actual = reducer(stateWithNote, updateNote(updatedNote));
        expect(actual.notes[0].title).toBe('Updated Note');
    });

    it('should handle selectNote', () => {
        const stateWithNote = { notes: [{ id: '1', title: 'Test Note', content: '', folderId: '1', createdAt: '', updatedAt: '' }], selectedNoteId: null };
        const actual = reducer(stateWithNote, selectNote('1'));
        expect(actual.selectedNoteId).toEqual('1');
    });

    it('should handle deleteNote', () => {
        const stateWithNote = { notes: [{ id: '1', title: 'Test Note', content: '', folderId: '1', createdAt: '', updatedAt: '' }], selectedNoteId: '1' };
        const actual = reducer(stateWithNote, deleteNote('1'));
        expect(actual.notes).toHaveLength(0);
    });

    it('should handle deleteNoteFromFolder', () => {
        const stateWithNotes = { notes: [{ id: '1', title: 'Test Note', content: '', folderId: '1', createdAt: '', updatedAt: '' }, { id: '2', title: 'Another Note', content: '', folderId: '2', createdAt: '', updatedAt: '' }], selectedNoteId: '1' };
        const actual = reducer(stateWithNotes, deleteNoteFromFolder('1'));
        expect(actual.notes).toHaveLength(1);
        expect(actual.notes[0].folderId).toBe('2');
    });

    it('should select notes in selected folder using selectNotesInSelectedFolder', () => {
        const state = {
            notes: {
                notes: [
                    { id: '1', title: 'Test Note 1', content: '', folderId: '1', createdAt: '', updatedAt: '' },
                    { id: '2', title: 'Test Note 2', content: '', folderId: '2', createdAt: '', updatedAt: '' },
                ],
                selectedNoteId: null,
            },
            folders: { selectedFolderId: '1' },
        } as RootState;
        const notes = selectNotesInSelectedFolder(state);
        expect(notes).toHaveLength(1);
        expect(notes[0].folderId).toBe('1');
    });
});
