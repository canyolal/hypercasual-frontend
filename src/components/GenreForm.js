import Form from 'react-bootstrap/Form'

const GenreForm = ({setGenre}) => {
    return (
        <Form.Control
            as='select'
            onChange={(e) => setGenre(e.target.value)}
            className='form-inline form-control-sm'
            >
            <option value=''>Select Genre</option>
            <option value='Action'>Action</option>
            <option value='Adventure'>Adventure</option>
            <option value='Board'>Board</option>
            <option value='Card'>Card</option>
            <option value='Casual'>Casual</option>
            <option value='Education'>Education</option>
            <option value='Family'>Family</option>
            <option value='Games'>Games</option>
            <option value='Music'>Music</option>
            <option value='Puzzle'>Puzzle</option>
            <option value='Racing'>Racing</option>
            <option value='Role'>Role Playing</option>
            <option value='Sports'>Sports</option>
            <option value='Strategy'>Startegy</option>
            <option value='Simulation'>Simulation</option>
            <option value='Trivia'>Trivia</option>
            <option value='Word'>Word</option>
        </Form.Control>
    )
}

export default GenreForm;