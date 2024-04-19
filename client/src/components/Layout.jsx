import Header from './Header';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../hooks/AuthProvider';
import { useAuth } from '../hooks/AuthProvider';
import SignUpForm from './SignUpForm';

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
              <h3 className='w-100 mt-5 text-center'>Please log in</h3>
              <SignUpForm />
            </>
          ) 
        }
      </AuthProvider>
    </>
  )
}

export default Layout;
