import { Link } from "react-router-dom";
import { useState } from "react";



function ForgotPassword() {
    const initialFormData = Object.freeze({
        email: ''
    })

    const [formData, UpdatFormData] = useState(initialFormData)
    const [error, setError] = useState('')

    const handleChange = (e)=> {
        UpdatFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        let validationError = [];
		console.log(formData);

        if(!formData.email) {
            validationError.push("Please fillup the Email");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
        }

        // axiosInstance.post(`userauthentication/user/register`, {
        //     email: formData.email,
        //     username: formData.username,
        //     password: formData.password,
        // })
        // .then((res) => {
        //     // history.push('/login');
        //     console.log(res);
        //     console.log(res.data);
        // });
    }
    return (
        <center>
            <div class="card text-center my-5" style={{maxWidth: "300px"}}>
                <div class="card-header h5 text-white bg-primary">Password Reset</div>
                <div class="card-body px-5">
                    <p class="card-text py-2">
                        Enter your email address and we'll send you an email with instructions to reset your password.
                    </p>
                    <div class="form-outline">
                        <input type="email" id="email" name='email' class="form-control my-3" onChange={handleChange}/>
                        <label class="form-label" for="email">Email input</label>
                    </div>
                    <a href="#" class="btn btn-primary w-100" onClick={handleSubmit}>Reset password</a>
                    {error &&  <p className="text-danger">{error}</p>}
                    <div class="d-flex justify-content-between mt-4">
                        <Link class="" to={'/signin/'}>Login</Link>
                        <Link class="" to={'/signup/'}>Register</Link>
                    </div>
                </div>
            </div>
        </center>
    );
};



export default ForgotPassword;