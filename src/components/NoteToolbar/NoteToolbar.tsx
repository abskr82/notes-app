import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';

import './NoteToolbar.css';

export interface NoteToolbarProps {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    onBoldClick: () => void;
    onItalicClick: () => void;
    onUnderlineClick: () => void;
}


export const NoteToolbar: React.FC<NoteToolbarProps> = ({ isBold, isItalic, isUnderline, onBoldClick, onItalicClick, onUnderlineClick }) => {

    const [fontSize, setFontSize] = useState('16');

    const applyStyle = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const size = e.target.value;
        if (parseInt(size) >= 9 && parseInt(size) <= 100) {
            setFontSize(size);

            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = document.createElement('span');
                span.style.fontSize = `${size}px`;
                range.surroundContents(span);
            }
        }
    };

    return (
        <div className="toolbar">
            <button className={`bold ${isBold ? 'active' : ''}`} onClick={onBoldClick} data-testid="button-bold">
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button className={`italic ${isItalic ? 'active' : ''}`} onClick={onItalicClick} data-testid="button-italic">
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button className={`underline ${isUnderline ? 'active' : ''}`} onClick={onUnderlineClick} data-testid="button-underline">
                <FontAwesomeIcon icon={faUnderline} />
            </button>
            <select value={fontSize} onChange={handleFontSizeChange}>
                {[9, 12, 16, 20, 24, 28, 32, 48, 72, 100].map(size => (
                    <option key={size} value={size}>{size}px</option>
                ))}
            </select>
            <input className='toolbar-color-selector' type="color" onChange={(e) => applyStyle('foreColor', e.target.value)} data-testid="color-picker" />
        </div>
    )
}