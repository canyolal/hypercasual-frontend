import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Row,Col,Container } from 'react-bootstrap';
import Home from './components/Home'
import GamesChart from './components/GamesChart'
import NavigationBar from './components/NavigationBar'
import './App.css'

const App = () => {

  return (
    <div id="app">
      <Router>
        <NavigationBar />
        <Container>
          <Row className='justify-content-md-center'>
          <Col xs lg='2'></Col>
          <Col md='auto'>
            <br/>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/games' element={<GamesChart />}/>
            </Routes>
          </Col>
          <Col xs lg='3'></Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}
export default App;
