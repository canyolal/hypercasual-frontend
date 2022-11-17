import {Nav, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NavigationBar = () => {
    return (
        <div className='NavBar'>
        <Nav variant='tabs'>
            <NavLink eventKey='1' as={Link} to="/">
                <i className="fas fa-home"></i>
            </NavLink>
            <NavLink eventKey='2' as={Link} to="/games">
                Hypercasual Games
            </NavLink>
        </Nav>
        </div>
    )
}

export default NavigationBar;