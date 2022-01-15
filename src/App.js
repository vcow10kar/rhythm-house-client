import './App.css';
import { Button } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import AppRoutes from './components/Routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <AppRoutes/>
    </div>
  );
}

export default App;
