import { useContext, useState } from "react";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { Helmet } from "react-helmet";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {

    const { signIn, user, signInWithGoogle, signInWithGitHub } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const { siteName } = useContext(SiteDetailsContext);
    const [loginText, setLoginText] = useState('Login');
    const [loginWithGoogleText, setloginWithGoogleText] = useState('Google');
    const [loginWithGithubText, setLoginWithGithubText] = useState('GitHub');
    const location = useLocation();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to={location?.state ? location.state : '/'}></Navigate>;
    }

    const handleLogin = e => {
        e.preventDefault();

        setLoginText(
            <span className="loading loading-spinner loading-xs"></span>
        )
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        if (email === '') {
            setError('Please enter your email')
        }

        if (password === '') {
            setError('Please enter your password')
        }

        signIn(email, password)
            .then(() => {
                toast.success("Logged in success");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast.error(error.message);
                setLoginText('Login');
            })
    }

    const handleLoginWithGoogle = () => {
        setloginWithGoogleText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        signInWithGoogle()
            .then(() => {
                toast.success("Logged in success");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast.error(error.message);
                setloginWithGoogleText('Google');
            })
    }

    const handleLoginWithGitHub = () => {
        setLoginWithGithubText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        signInWithGitHub()
            .then(() => {
                toast.success("Logged in success");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast.error(error.message);
                setLoginWithGithubText('GitHub');
            })
    }

    return (
        <div>
            <Helmet>
                <title>Login - {siteName}</title>
            </Helmet>
            <div className="flex items-center justify-center my-16 bg-white dark:bg-slate-950 rounded-2xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
                            Log in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {
                            error ?
                                <div role="alert" className="alert p-2 rounded-lg alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span><strong>Error!</strong> {error}</span>
                                </div>
                                :
                                ''
                        }
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                </span>
                                {loginText}
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <span className="block text-sm text-gray-600 dark:text-gray-300">
                                Or sign in with
                            </span>
                            <div className="mt-1 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={handleLoginWithGoogle}
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                                    </svg>
                                    {loginWithGoogleText}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLoginWithGitHub}
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                    {loginWithGithubText}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Don&apos;t have an account?
                        </span>{" "}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 dark:text-indigo-400"
                        >
                            Register here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;