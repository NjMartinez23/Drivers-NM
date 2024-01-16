/* Style */
// import './App.css'

/* Components to render */
import NavBar from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';

/* Dependencies */
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {

  const { pathname } = useLocation();

  return (
    <div>
       { pathname !== '/' && <NavBar  />}
      <Routes>        
        <Route path='/' element={ <Landing/> } />
        <Route path='/home' element={ <Home/> } />
        <Route path='/detail/:id' element={ <Detail/> } />
        <Route path='/create' element={ <Form/> } />
      </Routes>
    </div>
  )
}

export default App;