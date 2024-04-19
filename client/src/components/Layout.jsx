import Header from './Header';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../AuthProvider';

function Layout() {
  return(
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </>
  )
}

export default Layout;
