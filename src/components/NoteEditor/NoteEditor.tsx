// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote } from '../../store/slices/notesSlice';
import { RootState } from '../../store/store';
import { debounce } from '../../utils/utils';

import './NoteEditor.css';

export interface NoteEditorProps {
    onSelectionChange: () => void;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
}


export const NoteEditor: React.FC<NoteEditorProps> = ({ onSelectionChange }) => {
    const selectedFolderId = useSelector((state: RootState) => state.folders.selectedFolderId);
    const selectedNote = useSelector((state: RootState) =>
        state.notes.notes.find(note => note.id === state.notes.selectedNoteId)
    );

    const [content, setContent] = useState(selectedNote?.content);

    useEffect(() => {
        setContent(selectedNote?.content);
    }, [selectedNote?.id]);


    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const handleSave = () => {
        const htmlContent = contentRef.current?.innerHTML || '';
        if (selectedNote) {
            dispatch(updateNote({
                ...selectedNote,
                content: htmlContent,
                updatedAt: new Date().toISOString(),
            }));
        } else {
            dispatch(addNote({
                id: Date.now().toString(),
                title: 'New Note',
                content: htmlContent,
                folderId: selectedFolderId || 'default',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }));
        }
    };

    const debouncedSave = debounce(handleSave, 500);
    const handleInput = () => {
        debouncedSave();
        onSelectionChange();
    };

    const handleMouseAndKeyUp = () => {
        onSelectionChange();
    }


    return (
        <div className="note-editor">
            <div
                className="editor-content"
                contentEditable
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: content }}
                onInput={handleInput}
                onMouseUp={handleMouseAndKeyUp}
                onKeyUp={handleMouseAndKeyUp}
            ></div>
        </div>
    );
};
