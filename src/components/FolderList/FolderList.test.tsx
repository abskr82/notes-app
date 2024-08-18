import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FolderList from './FolderList';
import { RootState } from '../../store/store';
import { addFolder, selectFolder } from '../../store/slices/foldersSlice';

const mockStore = configureStore<RootState>([]);

describe('FolderList', () => {
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
                    { id: 'n1', folderId: '1', content: 'Note 1 in Folder 1' },
                    { id: 'n2', folderId: '1', content: 'Note 2 in Folder 1' },
                    { id: 'n3', folderId: '2', content: 'Note 1 in Folder 2' }
                ]
            }
        };

        store = mockStore(initialState);
    });

    it('renders the list of folders and counts notes correctly', () => {
        render(
            <Provider store={store}>
                <FolderList />
            </Provider>
        );

        const folder1 = screen.getByText('Folder 1 (2)');
        const folder2 = screen.getByText('Folder 2 (1)');

        expect(folder1).toBeInTheDocument();
        expect(folder2).toBeInTheDocument();
    });

    it('highlights the selected folder', () => {
        render(
            <Provider store={store}>
                <FolderList />
            </Provider>
        );

        const selectedFolder = screen.getByText('Folder 1 (2)').closest('.folder-item');
        expect(selectedFolder).toHaveClass('selected');
    });

    it('adds a new folder when the add button is clicked', () => {
        render(
            <Provider store={store}>
                <FolderList />
            </Provider>
        );

        const input = screen.getByPlaceholderText('New Folder Name');
        const addButton = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'New Folder' } });
        fireEvent.click(addButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(addFolder(expect.objectContaining({ name: 'New Folder' })));
    });

    it('selects a folder when it is clicked', () => {
        render(
            <Provider store={store}>
                <FolderList />
            </Provider>
        );

        const folder2 = screen.getByText('Folder 2 (1)');
        fireEvent.click(folder2);

        const actions = store.getActions();
        expect(actions).toContainEqual(selectFolder('2'));
    });
});
