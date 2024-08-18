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
            applyStyle('fontSize', size);
        }
    };

    return (
        <div className="toolbar">
            <button className={`bold ${isBold ? 'active' : ''}`} onClick={onBoldClick}>
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button className={`italic ${isItalic ? 'active' : ''}`} onClick={onItalicClick}>
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button className={`underline ${isUnderline ? 'active' : ''}`} onClick={onUnderlineClick}>
                <FontAwesomeIcon icon={faUnderline} />
            </button>
            <select value={fontSize} onChange={handleFontSizeChange}>
                {[9, 12, 16, 20, 24, 28, 32, 48, 72, 100].map(size => (
                    <option key={size} value={size}>{size}px</option>
                ))}
            </select>
            <input
                type="number"
                min="9"
                max="100"
                value={fontSize}
                onChange={handleFontSizeChange}
                style={{ width: '50px', marginLeft: '10px' }}
            />
            <input className='toolbar-color-selector' type="color" onChange={(e) => applyStyle('foreColor', e.target.value)} />
        </div>
    )
}