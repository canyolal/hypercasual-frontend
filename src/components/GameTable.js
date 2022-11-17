import React from 'react'
import Game from './Game'

const GameTable = ({games}) => {
    return (
        <>
            <table className='table table-hover align-middle mb-0 bg-light'>
                <thead className='table-secondary gameTable'>
                    <tr>
                        <th> Game </th>
                        <th> Genre </th>
                        <th> Publisher </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider table-divider-color">
                    {
                        games.map(game =>
                            <Game key={game.id} game={game} />
                            )
                        }     
                </tbody>
            </table>
        </>
    )
}
export default GameTable;