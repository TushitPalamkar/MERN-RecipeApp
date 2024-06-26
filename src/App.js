import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Home} from './pages/home';
import {Auth} from './pages/auth'
import {Create_recipe} from "./pages/create_recipe.js";
import { Saved_recipe } from './pages/saved_recipe.js';
import { Navbar } from './components/navbar';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/create_recipe' element={<Create_recipe/>}/>
          <Route path='/saved_recipe' element={<Saved_recipe/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
