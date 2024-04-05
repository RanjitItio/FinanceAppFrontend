// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import axiosInstance from './axios';
import { Link } from 'react-router-dom';



function Login(){
    const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')


    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

    const handleOnSubmit = async (e)=> {
        e.preventDefault();
        let validationError = [];
		// console.log(formData);
        // console.log(e)

        if (!formData.email) {
            validationError.push("Please fill the Email");
        }
        else if (!formData.password) {
            validationError.push("Please fill the password");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
        }

        //await axiosInstance.post(`token/`, {
		// 		email: formData.email,
		// 		password: formData.password,
		// 	})
		// 	.then((res) => {
        //      localStorage.clear();
		// 		localStorage.setItem('access_token', res.data.access);
		// 		localStorage.setItem('refresh_token', res.data.refresh);
		// 		axiosInstance.defaults.headers['Authorization'] =
		// 			'JWT ' + localStorage.getItem('access_token');
		// 		history.push('/');
		// 		//console.log(res);
		// 		//console.log(res.data);
		// 	});
    }

   return(
    <>
        <section className="bg-light py-3 py-md-5 my-3">
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="text-center mb-3">
                    <a href="#!">
                        <img src="" alt="Put Logo Here" width="175" height="57" />
                    </a>

                    </div>
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>

                {/* Login From starts here */}
                    <form action="#!">
                    <div className="row gy-2 overflow-hidden">
                        <div className="col-12">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" onChange={handleChange} required />
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>
                        </div>

                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" name="password" id="password"  placeholder="Password" onChange={handleChange} required />
                                <label htmlFor="password" className="form-label">Password</label>
                            </div>
                        </div>

                        <div className="col-12">
                        <div className="d-flex gap-2 justify-content-between">
                            <Link to={'/forgot-password/'} className="link-primary text-decoration-none">Forgot password?</Link>
                        </div>
                        </div>

                        <div className="col-12">
                            <div className="d-grid my-3">
                                <button className="btn btn-primary btn-lg" type="submit" onClick={handleOnSubmit}>Log in</button>
                                {error &&  <p className="text-danger">{error}</p>}
                            </div>
                            </div>
                            <div className="col-12">
                            <p className="m-0 text-secondary text-center">Don't have an account? <Link to={'/signup/'} className="link-primary text-decoration-none">Sign up</Link></p>
                        </div>

                    </div>
                    </form>
                {/* Login form ends here */}
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    </>
   );
};



export default Login;