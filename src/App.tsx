import { Provider } from 'react-redux';
import store from './store/store';
import { Notes } from './features/Notes/Notes';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Notes />
    </Provider>
  );
};

export default App;
