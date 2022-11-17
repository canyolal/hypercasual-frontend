import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home'
import GamesComponent from './components/GamesComponent'
import NavigationBar from './components/NavigationBar'
import FooterComp from './components/FooterComp';

const App = () => {

  return (
    <div id="app">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/games' element={<GamesComponent />}/>
        </Routes>
        <FooterComp />
      </Router>
    </div>
  )
}
export default App;
