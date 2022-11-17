import Form from 'react-bootstrap/Form';

const PageSizeForm = ({setPageSize}) => {
    return(
        <Form.Control 
            as='select'
            onChange={(e) => setPageSize(e.target.value)}
            className='form-inline form-control-sm'
            >
            <option value={25}>Show 25</option>
            <option value={50}>Show 50</option>
        </Form.Control>
    )
}

export default PageSizeForm;