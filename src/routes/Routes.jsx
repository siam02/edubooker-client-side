import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoutes from "./PrivateRoutes";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path:'/profile',
                element:<PrivateRoutes><Profile></Profile></PrivateRoutes>
            },
            {
                path:'/add-book',
                element:<PrivateRoutes><AddBook></AddBook></PrivateRoutes>
            },
            {
                path:'/all-books',
                element:<PrivateRoutes><AllBooks></AllBooks></PrivateRoutes>
            }
        ]
    }
])

export default routes;