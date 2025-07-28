import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Home from './pages/Home.jsx'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App