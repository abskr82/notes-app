import { FolderList } from "../../components/FolderList/FolderList"
import { Header } from "../../components/Header/Header"
import { NoteEditorContainer } from "../../components/NoteEditorContainer/NoteEditorContainer"
import { NoteList } from "../../components/NoteList/NoteList"

import './Notes.css';

export const Notes = () => {
    return (
        <div className="notes-container">
            <Header />
            <main className="notes">
                <FolderList />
                <NoteList />
                <NoteEditorContainer />
            </main>
        </div>
    )
}