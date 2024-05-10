import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Register = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const { createUser, user } = useContext(AuthContext);
    const [registerText, setRegisterText] = useState('Register');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    if (user) {
        return <Navigate to={'/'}></Navigate>;
    }


    const isURL = (str) => {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlPattern.test(str);
    }

    const isEmail = (str) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(str);
    }

    const hasUppercase = (str) => {
        const pattern = /[A-Z]/;
        return pattern.test(str);
    }
    const hasLowercase = (str) => {
        const pattern = /[a-z]/;
        return pattern.test(str);
    }
    const hasValidLength = (str) => {
        return str.length >= 6;
    }

    const handleRegister = e => {
        e.preventDefault();

        setRegisterText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photoURL');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password != confirmPassword) {
            setError('Password and Confirm Password Must be same');
            setRegisterText('Register');
            return null;
        }

        if (!isURL(photo)) {
            setError('Please input a valid photo url');
            setRegisterText('Register');
            return null;
        }

        if (!isEmail(email)) {
            setError('Please input a valid email');
            setRegisterText('Register');
            return null;
        }

        if (!hasUppercase(password)) {
            setError('Password must contain at least one Upper Case');
            setRegisterText('Register');
            return null;
        }

        if (!hasLowercase(password)) {
            setError('Password must contain at least one Lower Case');
            setRegisterText('Register');
            return null;
        }

        if (!hasValidLength(password)) {
            setError('Password must be at least 6 character long');
            setRegisterText('Register');
            return null;
        }

        if (hasUppercase(password) && hasLowercase(password) && hasValidLength(password) && isEmail(email) && isURL(photo)) {
            setError(null);
        }

        createUser(email, password, name, photo)
            .then(() => {
                toast.success('Your account successfully created');
                setRegisterText('Register');
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
                setRegisterText('Register');
            })

    }

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Helmet>
                <title>Create an Account on {siteName}</title>
            </Helmet>

            <div className="mt-8 sm:mx-auto sm:w-full">
                <div className="py-8 px-4 sm:rounded-lg sm:px-10">
                    <div className="sm:max-w-md mx-auto">
                        <div>
                            {
                                error ?
                                    <div role="alert" className="alert p-2 rounded-lg alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span><strong>Error!</strong> {error}</span>
                                    </div>
                                    :
                                    ''
                            }
                            <h2 className="mt-6 mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
                                Create an account
                            </h2>
                        </div>
                        <form className="space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Photo URL
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="photoURL"
                                        name="photoURL"
                                        type="text"
                                        autoComplete="photoURL"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="password"
                                        name="password"
                                        autoComplete="new-password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                        onClick={handleShowPassword}
                                    >
                                        {showPassword ? (
                                            <IoEyeOffOutline className="w-5 h-5" />
                                        ) : (
                                            <IoEyeOutline className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                        onClick={handleShowPassword}
                                    >
                                        {showPassword ? (
                                            <IoEyeOffOutline className="w-5 h-5" />
                                        ) : (
                                            <IoEyeOutline className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {registerText}
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
                                    Already have an account?{" "}
                                    <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-400">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;