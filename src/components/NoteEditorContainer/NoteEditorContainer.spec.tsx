import { render, screen, fireEvent } from '@testing-library/react';
import { NoteEditorContainer } from './NoteEditorContainer';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { RootState } from '../../store/store';
import { Provider } from 'react-redux';

const mockStore = configureStore<RootState>([]);
describe('NoteEditorContainer', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        const initialState: Partial<RootState> = {
            folders: {
                folders: [
                    { id: '1', name: 'Folder 1' },
                    { id: '2', name: 'Folder 2' }
                ],
                selectedFolderId: '1'
            },
            notes: {
                notes: [
                    { id: 'n1', folderId: '1', content: 'Note 1 in Folder 1', title: '', createdAt: '', updatedAt: '' },
                    { id: 'n2', folderId: '1', content: 'Note 2 in Folder 1', title: '', createdAt: '', updatedAt: '' },
                    { id: 'n3', folderId: '2', content: 'Note 1 in Folder 2', title: '', createdAt: '', updatedAt: '' }
                ],
                selectedNoteId: ''
            }
        };

        // @ts-ignore
        store = mockStore(initialState);
        document.execCommand = vi.fn();
    });
    // Mock document.execCommand

    it('renders NoteEditorContainer with toolbar and editor', () => {
        render(<Provider store={store}>
            <NoteEditorContainer />
        </Provider>);

        // Verify toolbar buttons are present
        expect(screen.getByTestId('button-bold')).toBeInTheDocument();
        expect(screen.getByTestId('button-italic')).toBeInTheDocument();
        expect(screen.getByTestId('button-underline')).toBeInTheDocument();

        // Verify editor is present
        expect(screen.getByTestId('notes-editor')).toBeInTheDocument();
    });

    it('toggles bold style when Bold button is clicked', () => {
        render(<Provider store={store}>
            <NoteEditorContainer />
        </Provider>);

        const boldButton = screen.getByTestId('button-bold');

        // Click Bold button
        fireEvent.click(boldButton);

        // Verify document.execCommand was called with 'bold'
        expect(document.execCommand).toHaveBeenCalledWith('bold', false, undefined);

        // Verify isBold state is true
        expect(boldButton).toHaveClass('active');
    });

    it('toggles italic style when Italic button is clicked', () => {
        render(<Provider store={store}>
            <NoteEditorContainer />
        </Provider>);

        const italicButton = screen.getByTestId('button-italic');

        // Click Italic button
        fireEvent.click(italicButton);

        // Verify document.execCommand was called with 'italic'
        expect(document.execCommand).toHaveBeenCalledWith('italic', false, undefined);

        // Verify isItalic state is true
        expect(italicButton).toHaveClass('active');
    });

    it('toggles underline style when Underline button is clicked', () => {
        render(<Provider store={store}>
            <NoteEditorContainer />
        </Provider>);

        const underlineButton = screen.getByTestId('button-underline');

        // Click Underline button
        fireEvent.click(underlineButton);

        // Verify document.execCommand was called with 'underline'
        expect(document.execCommand).toHaveBeenCalledWith('underline', false, undefined);

        // Verify isUnderline state is true
        expect(underlineButton).toHaveClass('active');
    });
});
