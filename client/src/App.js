import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom'
import { routes } from './router/index'

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
