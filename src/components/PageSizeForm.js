import Form from 'react-bootstrap/Form';

const PageSizeForm = ({setPageSize}) => {
    return(
        <Form.Control 
            as='select'
            onChange={(e) => setPageSize(e.target.value)}
            className='form-inline form-control-sm'
            >
            <option value={20}>Show 20</option>
            <option value={40}>Show 40</option>
            <option value={60}>Show 60</option>
            <option value={80}>Show 80</option>
            <option value={100}>Show 100</option>

        </Form.Control>
    )
}

export default PageSizeForm;