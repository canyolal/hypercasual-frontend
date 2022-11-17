import Form from 'react-bootstrap/Form';

const PageSizeForm = ({setPageSize}) => {
    return(
        <Form.Select 
            onChange={(e) => setPageSize(e.target.value)}
            className='form-inline form-select-sm'
            >
            <option value={20}>Show 20</option>
            <option value={40}>Show 40</option>
        </Form.Select>
    )
}

export default PageSizeForm;