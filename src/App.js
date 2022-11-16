import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Filter from './components/Filter'
import Home from './components/Home'
import NavigationBar from './components/NavigationBar'
import './App.css'

const App = () => {

  return (
    <div id="app">
      <Router>
        <NavigationBar />
        <br/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/games' element={<Filter />}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App;
