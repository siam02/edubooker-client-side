import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { siteName } = useContext(SiteDetailsContext);
    const [updateText, setUpdateText] = useState('Update Details');
    const [userPhotoURL, setUserPhotoURL] = useState(user.photoURL);
    const [error, setError] = useState(null);

    const handleUpdate = e => {
        e.preventDefault();

        setUpdateText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoURL = form.get('photoURL');

        updateUserProfile(name, photoURL)
            .then(() => {
                toast.success("Profile updated");
                setUserPhotoURL(photoURL);
                setUpdateText('Update Details');
            })
            .catch(error => {
                toast.error(error.message);
                setError(error.message);
                setUpdateText('Update Details');
            })
    }

    return (
        <div className="my-16">
            <Helmet>
                <title>Update Profile - {siteName}</title>
            </Helmet>

            <div className="shrink-0 w-full max-w-xl mx-auto bg-base-100">
                <form className="card-body" onSubmit={handleUpdate}>
                    <div className="card-title text-4xl justify-center">
                        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">Update Profile</h1>
                    </div>
                    {
                        error ?
                            <div role="alert" className="alert p-2 rounded-lg alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span><strong>Error!</strong> {error}</span>
                            </div>
                            :
                            ''
                    }
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input type="email" value={user.email}
                            className="appearance-none mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            disabled />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your Name
                        </label>
                        <input type="text" placeholder="Your Name" defaultValue={user.displayName} name="name"
                            className="appearance-none mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Photo URL
                        </label>
                        <input type="text" placeholder="Your Photo URL" name="photoURL" defaultValue={userPhotoURL}
                            className="appearance-none mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your Current Photo
                        </label>
                        <img src={userPhotoURL} width={150} height={150} alt="" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">{updateText}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;