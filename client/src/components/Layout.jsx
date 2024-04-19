import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import SignUpOrLogIn from './SignUpOrLogIn';

function Layout() {
  const { token } = useAuth();

  return(
    <>
      <Header />
      {
        token ? (
        <Outlet />
        ) : (
          <SignUpOrLogIn/>
        ) 
      }
    </>
  )
}

export default Layout;
