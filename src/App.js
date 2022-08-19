import 'animate.css';
import './App.css';
import Login from './Pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import Home from './Pages/Home/Home';
import { Provider } from 'react-redux'
import { store } from './Redux/ConfigStore';
import PlayTemplate from './Templates/PlayTemplate';
function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<PlayTemplate />}>
            <Route path='/' element={<Home/>}/>
                <Route path='home' element={<Home/>}/>
            </Route>
            <Route path='login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
