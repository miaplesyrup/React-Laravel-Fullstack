import { Link } from 'react-router-dom';
import './App.css';
import MyRouter from './router';

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/">About Us</Link>
      <Link to="/">Contact Us</Link>

      <MyRouter />
    </div>
  );
}

export default App;
