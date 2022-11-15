import React from 'react'
import Game from './Game'
import Table from 'react-bootstrap/Table'
import '../App.css'

const GameTable = ({games}) => {
    return (
        <div>
            <Table striped bordered hover>
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
            </Table>
        </div>
    )
}
export default GameTable;