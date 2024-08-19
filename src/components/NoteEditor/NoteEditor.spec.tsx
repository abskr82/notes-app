import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NoteEditor, NoteEditorProps } from './NoteEditor';
import { updateNote, addNote } from '../../store/slices/notesSlice';
import { RootState } from '../../store/store';
import { vi } from 'vitest';

const mockStore = configureStore([]);
const mockOnSelectionChange = vi.fn();

const initialState: Partial<RootState> = {
    folders: {
        folders: [
            { id: '1', name: 'Folder 1' },
            { id: '2', name: 'Folder 2' }
        ],
        selectedFolderId: 'folder1'
    },
    notes: {
        notes: [
            {
                id: 'note1',
                title: 'Note 1',
                content: '<p>Initial Content</p>',
                folderId: 'folder1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
            },
        ],
        selectedNoteId: 'note1',
    },
};

describe('NoteEditor', () => {
    let store: any;
    beforeEach(() => {
        vi.useFakeTimers();
        store = mockStore(initialState);
        store.dispatch = vi.fn();
    });

    const renderComponent = (props: Partial<NoteEditorProps> = {}) => {
        const mockedProps = { isBold: false, isItalic: false, isUnderline: false };
        return render(
            <Provider store={store}>
                <NoteEditor
                    onSelectionChange={mockOnSelectionChange}
                    {...mockedProps}
                    {...props}
                />
            </Provider>
        );
    };

    it('renders the editor with initial content', () => {
        renderComponent();

        const editor = screen.getByTestId('notes-editor');
        expect(editor.innerHTML).toBe('<p>Initial Content</p>');
    });

    it('calls onSelectionChange when input is provided', () => {
        renderComponent();

        const editor = screen.getByTestId('notes-editor');
        fireEvent.input(editor, { target: { innerHTML: '<p>Updated Content</p>' } });

        expect(mockOnSelectionChange).toHaveBeenCalled();
    });

    it('dispatches updateNote action when content changes', () => {
        renderComponent();

        const editor = screen.getByTestId('notes-editor');
        fireEvent.input(editor, { target: { innerHTML: '<p>Updated Content</p>' } });

        // Simulate debounce delay
        vi.advanceTimersByTime(500);

        expect(store.dispatch).toHaveBeenCalledWith(updateNote({
            id: 'note1',
            title: 'Note 1',
            content: '<p>Updated Content</p>',
            folderId: 'folder1',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: expect.any(String),
        }));
    });

    it('dispatches addNote action if no selected note is found', () => {
        store = mockStore({
            ...initialState,
            notes: {
                ...initialState.notes,
                selectedNoteId: null,
            },
        });
        store.dispatch = vi.fn();

        renderComponent();

        const editor = screen.getByTestId('notes-editor');
        fireEvent.input(editor, { target: { innerHTML: '<p>New Note Content</p>' } });

        // Simulate debounce delay
        vi.advanceTimersByTime(500);

        expect(store.dispatch).toHaveBeenCalledWith(addNote({
            id: expect.any(String),
            title: 'New Note',
            content: '<p>New Note Content</p>',
            folderId: 'folder1',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        }));
    });
});
