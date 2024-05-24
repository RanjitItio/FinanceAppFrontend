import React, { useState } from 'react';
import axiosInstance from './axios';
import { Link, useNavigate } from 'react-router-dom';
import './tailwind.css';
import { RiUser3Line } from "react-icons/ri";
import { useParams } from 'react-router-dom'
const ResetPassword = () => {
    const { id } = useParams();
    const navigate =  useNavigate();
    console.log(id)
    const initialFormData = Object.freeze({
		password1: '',
		password2: '',
	});

    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
            
		});
	};

    const handleOnSubmit = async (e)=> {
        e.preventDefault();
        let validationError = [];
		console.log(formData);
        console.log(e)

        // if (!formData.password1) {
        //     validationError.push("Please fill the Email");
        // }
        // else if (!formData.password2) {
        //     validationError.push("Please fill the password");
        // }
        if (formData.password1 != formData.password2){
            validationError.push("both password are not matching")
        }
        else if(formData.password1.length <10){
            validationError.push("password should have 10 latter")
        }
        

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
            setSuccessMessage("")
        }


        await axiosInstance.post(`api/v1/user/reset_passwd/`, {
            token: id,
            password1: formData.password1,
            password2: formData.password2,
			})
			.then((res) => {
                if(res.status == 200) {
                    setTimeout(() => {
                        // navigate('/')
                        window.location.href = '/'
                    }, 1000);

                    setSuccessMessage(`Password Change  Successfull`)
                  
                    console.log(res);
                    // console.log(res.data);
                }
            //  localStorage.clear();
			}).catch((error)=> {
                console.log(error.response.data.error)
                if (error.response.status == 500){
                    setError("Invalid or expired token");
                    return;
                }
                else if (error.response.status == 400){
                    setError("Password did not match");
                    return;
                }
                else {
                    setError('')
                }

            })
    }

   return(
    <>

    <div className="min-h-screen flex bg-blue-300">
        {/* First flex container with a blue color palette */}
        <div className="flex-[50%] bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center">
        <img src="https://script.viserlab.com/paymenthub/assets/images/frontend/login_register/641872cda99f91679323853.png" alt="Logo" className="h-80 w-80 drop-shadow-2xl " />
        
      
        </div>
  
        {/* Second flex container with a green color palette */}
        <div className="flex-[80%] bg-white-200 flex items-center justify-center  bg-white  ">
          <div className="max-w-md w-full space-y-8">
          <div className="col-span-1 shadow-2xl p-4 rounded-md">
            <div className='col-span-1  rounded-full'>
              <center>
            {/* <p className='text-7xl' ><RiUser3Line/>  </p> */}
            <h2 className="text-2xl font-semibold mb-4 ">Reset Password</h2>
              </center>
            </div>
          
          <form className="space-y-4 ">
          <div className="grid grid-cols-1 gap-x-4 gap-y-2">

    
            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Password"
                name="password1"
                onChange={handleChange} 
              />
            </div>

            

            <div>
              <label className="block text-gray-600 font-medium">Confirm Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Confirm Password"
                name='password2'
                onChange={handleChange}
              />
            </div>

          </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleOnSubmit}
            >
              Submit
            </button>

                {error &&  <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
          </form>
          <div className='cols col-span-1 flex justify-between items-center'>

          <p className='font-extralight'>If you don't have any account <Link to={'/signup/'}>  Signup</Link></p>
          <p className='font-extralight'> <Link to={'/signin/'}>Login</Link></p>
          </div>
        </div>
            
          </div>        
        </div>
      </div>

        {/* <section className="bg-light py-3 py-md-5 my-3">
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
                                {successMessage && <p className="text-success">{successMessage}</p>}
                            </div>
                            </div>
                            <div className="col-12">
                            <p className="m-0 text-secondary text-center">Don't have an account? <Link to={'/signup/'} className="link-primary text-decoration-none">Sign up</Link></p>
                        </div>

                    </div>
                    </form>
               
                </div>
                </div>
            </div>
            </div>
        </div>
        </section> */}
    </>
   );
};

export default ResetPassword;
