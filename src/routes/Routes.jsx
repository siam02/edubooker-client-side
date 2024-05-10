import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoutes from "./PrivateRoutes";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import UpdateBook from "../pages/UpdateBook";
import Categories from "../pages/Categories";
import AddCategory from "../pages/AddCategory";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path: '/',
                element:<Home></Home>,
                loader: () => fetch(`http://localhost:5000/book?page=0&size=5`)
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
            },
            {
                path:'/update-book/:id',
                element:<PrivateRoutes><UpdateBook></UpdateBook></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`)
            },
            {
                path:'/categories',
                element:<PrivateRoutes><Categories></Categories></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/category')
            },
            {
                path:'/add-category',
                element:<PrivateRoutes><AddCategory></AddCategory></PrivateRoutes>
            }
        ]
    }
])

export default routes;