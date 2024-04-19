import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className='w-100'>
      <Navbar.Brand to="/">PLANZ</Navbar.Brand>
      <Nav className='w-100'>
        <div className="mr-auto d-flex justify-content-between w-100">
          <div className='d-flex flex-row'>
            <Nav.Link to="#lists">Lists</Nav.Link>
          </div>
          <div className='d-flex flex-row'>
            <Nav.Link to="#pricing">Sign in</Nav.Link>
            <Nav.Link to="/signup">Sign up</Nav.Link>
          </div>
        </div>
      </Nav>
    </Navbar>
  );
}

export default Header;
