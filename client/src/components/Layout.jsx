import Header from './Header';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../hooks/AuthProvider';
import { useAuth } from '../hooks/AuthProvider';
import SignUpForm from './SignUpForm';
import SignUpOrLogIn from './SignUpOrLogIn';

function Layout() {
  const user = useAuth();

  return(
    <>
      <AuthProvider>
        {
          user?.token ? (
            <>
            <Header />
            <Outlet />
            </>
          ) : (
            <>
              <Header />
              <SignUpOrLogIn/>
            </>
          ) 
        }
      </AuthProvider>
    </>
  )
}

export default Layout;
