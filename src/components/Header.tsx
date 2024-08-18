import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../store/slices/notesSlice';
import { getDefaultNote } from '../utils/utils';
import { selectedFolderIdSelector } from '../store/slices/foldersSlice';

const Header = () => {
    const dispatch = useDispatch();
    const selectedFolderId = useSelector(selectedFolderIdSelector);
    const handleCreateNote = () => {
        dispatch(addNote(getDefaultNote(selectedFolderId || 'default')));
    };

    return (
        <header className="header">
            <h1>Notes App</h1>
            <button onClick={handleCreateNote}>Create Note</button>
        </header>
    );
};

export default Header;
