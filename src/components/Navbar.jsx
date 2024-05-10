import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import logo from "../assets/img/logo.png";

const Navbar = () => {

    const { siteName } = useContext(SiteDetailsContext);

    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success('Logged out success!');
            })
            .catch(error => {
                toast.error(error.messagee);
            })
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/add-book">Add Book</NavLink></li>
        <li><NavLink to="/all-books">All Books</NavLink></li>
        <li><NavLink to="/borrowed-books">Borrowed Books</NavLink></li>
    </>

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-xl">
                        <img src={logo} alt="" width={24} />
                        {siteName}
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    {
                        user ?
                            <div className="flex gap-2 items-center">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn rToolTip btn-ghost btn-circle avatar !flex">
                                        <div className="w-10">
                                            {
                                                user.photoURL ?
                                                    <img className="rounded-full" src={user.photoURL} />
                                                    :
                                                    <FaRegCircleUser className="w-10 text-blue-600 h-10" />
                                            }
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black dark:text-gray-300 rounded-box w-52">
                                        <li>
                                            <Link to="/profile" className="">Profile</Link>
                                        </li>
                                        <li>
                                            <button onClick={handleSignOut} className="">Log Out</button>
                                        </li>
                                    </ul>
                                </div>
                                <Tooltip anchorSelect=".rToolTip" place="bottom">
                                    {user.displayName ?? 'User name not set'}
                                </Tooltip>
                                <div>
                                    <button onClick={handleSignOut} className="btn btn-error">Log Out</button>
                                </div>
                            </div>
                            :
                            <div className="flex gap-3">
                                <Link to="/login" className="btn ">Login</Link>
                                <Link to="/register" className="btn btn-primary">Register</Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;