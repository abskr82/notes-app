import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addFolder, selectFolder, deleteFolder } from '../../store/slices/foldersSlice';
import { deleteNoteFromFolder } from '../../store/slices/notesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { defaultFolderId, getDefaultNote } from '../../utils/utils';
import { addNote } from '../../store/slices/notesSlice';

import './FolderList.css';

export const FolderList: React.FC = () => {
    const folders = useSelector((state: RootState) => state.folders.folders);
    const selectedFolderId = useSelector((state: RootState) => state.folders.selectedFolderId);
    const notes = useSelector((state: RootState) => state.notes.notes);
    const [newFolderName, setNewFolderName] = useState('');
    const dispatch = useDispatch();

    const handleAddFolder = () => {
        if (newFolderName.trim()) {
            const id = Date.now().toString();
            dispatch(addFolder({ id, name: newFolderName.trim() }));
            dispatch(addNote(getDefaultNote(id)));
            setNewFolderName('');
        }
    };

    const handleDelete = (id: string) => {
        dispatch(deleteFolder(id));
        dispatch(deleteNoteFromFolder(id));
    }

    return (
        <div className="folder-list folder-list-container">
            <div className="folders">
                {folders.map(folder => {
                    const noteCount = notes.filter(note => note.folderId === folder.id).length;
                    return (
                        <div
                            key={folder.id}
                            className={`folder-item ${folder.id === selectedFolderId ? 'selected' : ''}`}
                            onClick={() => dispatch(selectFolder(folder.id))}
                        >
                            <div className="folder-content">
                                <FontAwesomeIcon icon={faFolder} /> {folder.name} ({noteCount})
                            </div>
                            <div className="folder-actions" data-testid="folder-delete">
                                {folder.id !== defaultFolderId ? <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(folder.id);
                                    }}
                                    className="delete-icon"
                                /> : null}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="add-folder">
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New Folder Name"
                />
                <button onClick={handleAddFolder}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

