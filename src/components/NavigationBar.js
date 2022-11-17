import {Nav, Navbar, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Nav variant='tabs'>
            <NavLink eventKey='1' as={Link} to="/">Home</NavLink>
            <NavLink eventKey='2' as={Link} to="/games">Hypercasual</NavLink>
        </Nav>
    )
}

export default NavigationBar;