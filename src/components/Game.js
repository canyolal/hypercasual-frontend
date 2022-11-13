import React from 'react'

const Game = ({game}) => {
    
    return (<tr>
        <td>{game.name}</td>
        <td>{game.genre}</td>
        <td>{game.publisher_name}</td>
    </tr>
    )
}
export default Game