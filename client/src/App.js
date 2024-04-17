import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterProvider from 'react-router-dom'
import { routes } from './router/index'
import Header from './components/Header';
import Page from './components/Page';

function App() {
  return (
    // <>
    //   <Header />
    //   <Page />
    // </>
    <RouterProvider router={routes} />
  );
}

export default App;
