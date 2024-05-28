import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { Link } from 'react-router-dom';
import './tailwind.css';




const ResetPassword = () => {

    const url_data             = new URLSearchParams(window.location.search)
    const password_reset_token = url_data.get('token') || ''

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


        if (formData.password1 === '') {
            validationError.push("Please fill the Password");

        } else if (formData.password2 === '') {
            validationError.push("Please fill the Confirm Password");

        } else if (formData.password1 !== formData.password2){
            validationError.push("Password did not match")

        } else if(formData.password1.length < 10){
            validationError.push("Password should be 10 digit long")

        } else if(formData.password2.length < 10){
            validationError.push("Confirm password should be 10 digit long")
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
            setSuccessMessage("")
        }

        await axiosInstance.post(`api/v1/user/reset_passwd/`, {
            token: password_reset_token,
            password1: formData.password1,
            password2: formData.password2,
			})
			.then((res) => {
                if(res.data.msg == 'Password has been reset successfully') {
                    setSuccessMessage(`Password has been changed successfully please try to login`)
                    // console.log(res);
                    setTimeout(() => {
                      window.location.href = '/signin/'
                    }, 2000);

                } else {
                  setSuccessMessage('')
                }

			}).catch((error)=> {
                console.log(error)

                if (error.response.data.msg == 'Password did not match'){
                    setError("Password did not match");

                } else if (error.response.status == 400){
                    setError("Missing Input data")
                    
                } else if (error.response.data.msg == 'Invalid token or user does not exist'){
                    setError("Password reset Timeout")

                } else if (error.response.data.msg == 'User fetch error'){
                    setError("Some unknown error occure please retry")

                } else if (error.response.data.msg == 'Server Error'){
                    setError("Password reset time expired please retry");

                } else {
                    setError('')
                };

            })
    };


    useEffect(() => {

      if (error || successMessage) {
        const timer = setTimeout(() => {
          setError('');
          setSuccessMessage('');
        }, 4000); 
  
        return () => clearTimeout(timer);
      }
    }, [error, successMessage]);


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
            <h2 className="text-2xl font-semibold mb-4 ">Reset Forgot Password</h2>
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

    </>
   );
};

export default ResetPassword;
