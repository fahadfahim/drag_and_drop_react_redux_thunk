import { Provider } from 'react-redux';
import './App.css';
import Todo from './component/Todo';
import store from './store';
function App() {

  return (
    <Provider store={store}>
      <div className='container'>
        <Todo />
      </div>
    </Provider>
  );
}

export default App;
