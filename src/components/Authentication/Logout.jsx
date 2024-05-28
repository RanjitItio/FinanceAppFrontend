import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "./axios";



function UserLogout(){
    const navigate = useNavigate();

    useEffect(() => {
		const defaultWallet = 'UserSelectedWalletID'

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			if (key != defaultWallet) {
				localStorage.removeItem(key)

				i--;
			}
		};

		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/signin/');
	});
    return(
        <>
           <p className="text-success my-5">You have been Logged out Successfully</p>
           <Link to={'/signin/'} className="text-center">Please Login</Link>
        </>
    );
};


export default UserLogout;