import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './components/shared/MainLayout';
import ErrorPage from './components/shared/ErrorPage';
import Home from './components/home/Home';
import Recipes from './components/recipes/Recipes';


const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path:  "recipes",
        element: <Recipes />,
      }
    ]
  }
]);



export default function App() {
  {/* <HeaderMegaMenu />
        <ToggleThemeComp /> */}
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  )
} 