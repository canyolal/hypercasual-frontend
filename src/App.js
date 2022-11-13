import React, { useState, useEffect } from 'react'
import gameService  from './services/gameService'
import Game from './components/Game'
import './App.css'

const App = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    gameService.getAll()
    .then(games => 
      setGames(games.games))
  },[])

  return (
    <div class="table-wrapper">
      <h2>Games</h2>
      <table class='fl-table'>
        <thead>
          <tr>
            <th> Name </th>
            <th> Genre </th>
            <th> Publisher </th>
          </tr>
        </thead>
        <tbody>
          {
            games.map(game =>
              <Game key={game.id} game={game} />
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;
