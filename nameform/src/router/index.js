import { Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';

function MyRouter(){
  return(
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about-us" element={<About />}></Route>
      <Route path="/contact-us" element={<Contact />}></Route>
    </Routes>
  )
}

export default MyRouter;