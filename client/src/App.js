import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import {BrowserRouter,Route,Link,Switch, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Homescreen/>}/>
    <Route exact path='/cart' element={<Cartscreen/>}/>
    <Route exact path='/register' element={<Registerscreen/>}/>
    <Route exact path='/login' element={<Loginscreen/>}/>
    </Routes>
    </div>
  );
}

export default App;
