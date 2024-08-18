import { useState } from "react";
import { NoteEditor } from "../NoteEditor/NoteEditor";
import { NoteToolbar } from "../NoteToolbar/NoteToolbar";

import './NoteEditorContainer.css';

export const NoteEditorContainer = () => {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const applyStyle = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    const toggleBold = () => {
        applyStyle('bold')
        setIsBold(!isBold);
    }
    const toggleItalic = () => {
        applyStyle('italic')
        setIsItalic(!isItalic)
    };
    const toggleUnderline = () => {
        applyStyle('underline')
        setIsUnderline(!isUnderline);
    }

    const updateStylesFromSelection = () => {
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
    };


    return (
        <div className="note-editor-container">
            <NoteToolbar
                isBold={isBold}
                isItalic={isItalic}
                isUnderline={isUnderline}
                onBoldClick={toggleBold}
                onItalicClick={toggleItalic}
                onUnderlineClick={toggleUnderline}
            />
            <NoteEditor
                onSelectionChange={updateStylesFromSelection}
                isBold={isBold}
                isItalic={isItalic}
                isUnderline={isUnderline}
            />
        </div>
    )
}