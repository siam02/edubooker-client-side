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
import CategoryDetails from "../pages/CategoryDetails";
import ErrorPage from "../pages/ErrorPage";
import BookDetails from "../pages/BookDetails";
import BorrowedBooks from "../pages/BorrowedBooks";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
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
            },
            {
                path:'/update-book/:id',
                element:<PrivateRoutes><UpdateBook></UpdateBook></PrivateRoutes>,
                loader: ({params}) => fetch(`https://edubooker-server-side.vercel.app/book/${params.id}`)
            },
            {
                path:'/book/:id',
                element:<PrivateRoutes><BookDetails></BookDetails></PrivateRoutes>,
                loader: ({params}) => fetch(`https://edubooker-server-side.vercel.app/book/${params.id}`)
            },
            {
                path:'/categories',
                element:<Categories></Categories>,
                loader: () => fetch('https://edubooker-server-side.vercel.app/category')
            },
            {
                path:'/add-category',
                element:<PrivateRoutes><AddCategory></AddCategory></PrivateRoutes>
            },
            {
                path: '/category/:id',
                element:<PrivateRoutes><CategoryDetails></CategoryDetails></PrivateRoutes>,
                loader: ({params}) => fetch(`https://edubooker-server-side.vercel.app/category/${params.id}`)
            },
            {
                path:'/borrowed-books',
                element:<PrivateRoutes><BorrowedBooks></BorrowedBooks></PrivateRoutes>
            }
        ]
    }
])

export default routes;