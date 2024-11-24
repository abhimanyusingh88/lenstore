
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Store from "./pages/Store";
import About from './pages/About';
import Contact from './pages/Contacts';




// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/contact",
    element:<Contact/>
  }
]);

function App() {
  return (
    <div className="text-xl h-full w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
