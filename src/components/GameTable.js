import React from 'react'
import Game from './Game'
import '../App.css'

const GameTable = ({games}) => {
    return (
        <div className="table-wrapper">
            <h2>Games</h2>
                <table className='fl-table'>
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
export default GameTable;