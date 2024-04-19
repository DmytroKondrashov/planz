import Header from './Header';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../hooks/AuthProvider';
import { useAuth } from '../hooks/AuthProvider';
import SignUpOrLogIn from './SignUpOrLogIn';

function Layout() {
  const token = useAuth();

  return(
    <>
      <AuthProvider>
        <Header />
        {
          token ? (
          <Outlet />
          ) : (
            <SignUpOrLogIn/>
          ) 
        }
      </AuthProvider>
    </>
  )
}

export default Layout;
