import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { NoteToolbar, NoteToolbarProps } from './NoteToolbar';
import configureStore from 'redux-mock-store';
import { RootState } from '../../store/store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('NoteToolbar', () => {
    document.execCommand = vi.fn();
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
    const store: ReturnType<typeof mockStore> = mockStore(initialState);;


    const setup = (propsOverride?: Partial<NoteToolbarProps>) => {
        const props: NoteToolbarProps = {
            isBold: false,
            isItalic: false,
            isUnderline: false,
            onBoldClick: vi.fn(),
            onItalicClick: vi.fn(),
            onUnderlineClick: vi.fn(),
            ...propsOverride,
        };

        render(<Provider store={store}>
            <NoteToolbar {...props} />
        </Provider>
        );

        return props;
    };


    it('calls onBoldClick when bold button is clicked', () => {
        const props = setup();

        const boldButton = screen.getByTestId('button-bold');
        fireEvent.click(boldButton);

        expect(props.onBoldClick).toHaveBeenCalledTimes(1);
    });

    it('calls onItalicClick when italic button is clicked', () => {
        const props = setup();

        const italicButton = screen.getByTestId('button-italic');
        fireEvent.click(italicButton);

        expect(props.onItalicClick).toHaveBeenCalledTimes(1);
    });

    it('calls onUnderlineClick when underline button is clicked', () => {
        const props = setup();

        const underlineButton = screen.getByTestId('button-underline');
        fireEvent.click(underlineButton);

        expect(props.onUnderlineClick).toHaveBeenCalledTimes(1);
    });

    it('changes font size when a new size is selected from the dropdown', () => {
        setup();

        const fontSizeDropdown = screen.getByRole('combobox');
        fireEvent.change(fontSizeDropdown, { target: { value: '24' } });

        expect(fontSizeDropdown).toHaveValue('24');
    });

    it('changes text color when a new color is selected', () => {
        setup();

        const colorInput = screen.getByTestId('color-picker');
        fireEvent.change(colorInput, { target: { value: '#ff0000' } });

        expect(colorInput).toHaveValue('#ff0000');
    });

    it('buttons have active class when respective styles are applied', () => {
        setup({ isBold: true, isItalic: true, isUnderline: true });

        expect(screen.getByTestId('button-bold')).toHaveClass('active');
        expect(screen.getByTestId('button-italic')).toHaveClass('active');
        expect(screen.getByTestId('button-underline')).toHaveClass('active');
    });
});
