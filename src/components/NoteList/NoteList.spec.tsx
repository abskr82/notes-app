import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { vi } from 'vitest';
import NoteList from './NoteList';
import { selectNote, deleteNote } from '../../store/slices/notesSlice';

const mockStore = configureStore([]);
const mockNotes = [
    { id: '1', title: 'Note 1', content: 'Content 1', createdAt: '2023-01-01T12:00:00Z', folderId: 'folder1' },
    { id: '2', title: 'Note 2', content: 'Content 2', createdAt: '2023-01-02T12:00:00Z', folderId: 'folder1' },
];

describe('NoteList', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            notes: {
                notes: mockNotes,
                selectedNoteId: null,
                selectedFolderId: 'folder1',
            },
            folders: {
                folders: [{ id: 'folder1', name: 'Folder 1' }],
                selectedFolderId: 'folder1',
            },
        });

        store.dispatch = vi.fn();
    });

    it('renders NoteList with notes', () => {
        render(
            <Provider store={store}>
                <NoteList />
            </Provider>
        );

        // Verify that note titles are rendered
        mockNotes.forEach(note => {
            expect(screen.getByText(note.title)).toBeInTheDocument();
        });
    });

    it('selects a note when clicked', () => {
        render(
            <Provider store={store}>
                <NoteList />
            </Provider>
        );

        const noteItem = screen.getByText('Note 1');

        // Click the note item
        fireEvent.click(noteItem);

        // Verify selectNote action was dispatched with the correct note ID
        expect(store.dispatch).toHaveBeenCalledWith(selectNote('1'));
    });

    it('deletes a note when the delete icon is clicked', () => {
        render(
            <Provider store={store}>
                <NoteList />
            </Provider>
        );

        const deleteIcon = screen.getByTestId('delete-note-1'); // Assumes the first button is the delete icon for 'Note 1'

        // Click the delete icon
        fireEvent.click(deleteIcon);

        // Verify deleteNote action was dispatched with the correct note ID
        expect(store.dispatch).toHaveBeenCalledWith(deleteNote('1'));
    });
});
