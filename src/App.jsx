import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Home from './pages/Home.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Home />
        <Footer />
      </div>
    </Provider>
  );
}

export default App