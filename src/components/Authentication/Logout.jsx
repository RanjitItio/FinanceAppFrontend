import { Link } from "react-router-dom";



function UserLogout(){
    return(
        <>
           <p class="text-success my-5">You have been Logged out Successfully</p>
           <Link to={'/signin/'} className="text-center">Please Login</Link>
        </>
    );
};


export default UserLogout;