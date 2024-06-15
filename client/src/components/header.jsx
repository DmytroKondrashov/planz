import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../hooks/AuthProvider';
import { Link } from 'react-router-dom';

function Header() {
  const { token, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <Navbar bg="dark" variant="dark" className='w-100'>
      <Navbar.Brand href="/">PLANZ</Navbar.Brand>
      <Nav className='w-100'>
        <div className="mr-auto d-flex justify-content-between w-100">
          <div className='d-flex flex-row'>
            <Nav.Link as={Link} to='/lists'>Lists</Nav.Link>
          </div>
          <div className='d-flex flex-row'>
            {/* TODO: find the way to handle it using the context, simply token ? () : () will not work */}
            {/* {token ? (
              <Nav.Link href="#pricing" onClick={handleLogOut()}>Log Out</Nav.Link>
            ) : (
              <>
                <Nav.Link href="#pricing">Sign In</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )} */}
              <Nav.Link href="#pricing" onClick={() => handleLogOut()}>Log Out</Nav.Link>
          </div>
        </div>
      </Nav>
    </Navbar>
  );
}

export default Header;
