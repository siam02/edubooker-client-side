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
        <div className="my-24">
            <Helmet>
                <title>Update Profile - {siteName}</title>
            </Helmet>

            <div className="shrink-0 w-full max-w-xl mx-auto bg-base-100">
                <form className="card-body" onSubmit={handleUpdate}>
                    <div className="card-title">
                        <h1>Update Profile</h1>
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
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" value={user.email} className="input input-disabled input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input type="text" placeholder="Your Name" defaultValue={user.displayName} name="name" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" placeholder="Your Photo URL" name="photoURL" defaultValue={userPhotoURL} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Current Photo</span>
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