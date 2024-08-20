import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../store/slices/notesSlice';
import { defaultFolderId, getDefaultNote } from '../../utils/utils';
import { selectedFolderIdSelector } from '../../store/slices/foldersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import './Header.css';

export const Header = () => {
    const dispatch = useDispatch();
    const selectedFolderId = useSelector(selectedFolderIdSelector);
    const handleCreateNote = () => {
        dispatch(addNote(getDefaultNote(selectedFolderId || defaultFolderId)));
    };

    return (
        <header className="header-container">
            <button onClick={handleCreateNote}>
                <FontAwesomeIcon icon={faPlus} className="search-icon" />
                Create Note
            </button>
        </header>
    );
};

