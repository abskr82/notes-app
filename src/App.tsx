import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/Header'
import NoteList from './components/NoteList/NoteList';
import FolderList from './components/FolderList/FolderList';

import './App.css';
import { NoteEditorContainer } from './components/NoteEditorContainer/NoteEditorContainer';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="app-container">
        <FolderList />
        <NoteList />
        <NoteEditorContainer />
      </div>
    </Provider>
  );
};

export default App;
