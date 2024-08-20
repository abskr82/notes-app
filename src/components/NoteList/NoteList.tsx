// src/components/NoteList.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { RootState } from '../../store/store';
import { selectNote, deleteNote, selectNotesInSelectedFolder } from '../../store/slices/notesSlice';

import './NoteList.css';

export const NoteList: React.FC = () => {

    const notes = useSelector(selectNotesInSelectedFolder);
    const selectedNoteId = useSelector((state: RootState) => state.notes.selectedNoteId);
    const dispatch = useDispatch();

    return (
        <div className="note-list note-list-container">
            {notes.map(note => (
                <div
                    key={note.id}
                    className={`note-item ${note.id === selectedNoteId ? 'selected' : ''}`}
                    onClick={() => dispatch(selectNote(note.id))}
                >
                    <div className="note-content">
                        <div className="note-title">{note.title}</div>
                        <div className="note-meta">
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="note-actions">
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents triggering the note selection
                                dispatch(deleteNote(note.id));
                            }}
                            className="delete-icon"
                            data-testid={`delete-note-${note.id}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
