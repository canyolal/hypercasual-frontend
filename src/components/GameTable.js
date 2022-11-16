import React from 'react'
import Game from './Game'
import Table from 'react-bootstrap/Table'
import '../App.css'

const GameTable = ({games}) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Game </th>
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
        </>
    )
}
export default GameTable;