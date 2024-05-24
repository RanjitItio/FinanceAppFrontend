import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './tailwind.css';
import axiosInstance from './axios';




function ForgotPassword() {

    const initialFormData = Object.freeze({
        email: ''
    })

    const [formData, UpdatFormData] = useState(initialFormData)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChange = (e)=> {
        UpdatFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        let validationError = [];
		// console.log(formData);

        if(formData.email === '') {
            validationError.push("Please fillup the Email");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
        }

        axiosInstance.post(`api/v1/user/reset_passwd/mail/`, {
            email: formData.email,
          
        })
        .then((res) => {
            // console.log(res)
            if (res.data.msg == 'Password reset instructions have been sent to your email address.') {
              setSuccessMessage('Password reset mail has been sent to the given email, Please check your mail')
              setIsButtonDisabled(true);

            } else{
              setSuccessMessage('')
            }

        }).catch((error)=> {
          console.log(error)

          if (error.response.data.msg == 'Requested mail ID does not exist') {
            setError('Requested user does not exist')

          } else if (error.response.data.msg == 'Unable to get the user') {
            setError('Unable to get The user details please retry')

          } else if (error.response.data.msg == 'Server error') {
            setError('Unknow error occured please retry after some time')

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


    return (
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
            <h2 className="text-2xl font-semibold mb-4 "> Forget password </h2>
              </center>
              <p className='font-extralight'>To reset your password please provide the registered email ID to get the link of reset password </p>
            </div>
          
          <form className="space-y-4 ">
          <div className="grid grid-cols-1 gap-x-4 gap-y-2">

    
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Email"
                name='email'
                onChange={handleChange}
              />
            </div>

            
          </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              Submit
            </button>
            {error &&  <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
          </form>

          <div className='cols col-span-1 flex justify-between items-center'>

        <p className='font-extralight'>If you don-t have any account <Link to={'/signup/'}>  Signup</Link></p>
        <p className='font-extralight'> <a href='/forgetpasswdpage'> Forget password</a></p>
        </div>
        </div>
            
          </div>        
        </div>
      </div>
        // <center>
        //     <div class="card text-center my-5" style={{maxWidth: "300px"}}>
        //         <div class="card-header h5 text-white bg-primary">Password Reset</div>
        //         <div class="card-body px-5">
        //             <p class="card-text py-2">
        //                 Enter your email address and we'll send you an email with instructions to reset your password.
        //             </p>
        //             <div class="form-outline">
        //                 <input type="email" id="email" name='email' class="form-control my-3" onChange={handleChange}/>
        //                 <label class="form-label" for="email">Email input</label>
        //             </div>
        //             <a href="#" class="btn btn-primary w-100" onClick={handleSubmit}>Reset password</a>
        //             {error &&  <p className="text-danger">{error}</p>}
        //             <div class="d-flex justify-content-between mt-4">
        //                 <Link class="" to={'/signin/'}>Login</Link>
        //                 <Link class="" to={'/signup/'}>Register</Link>
        //             </div>
        //         </div>
        //     </div>
        // </center>
    );
};



export default ForgotPassword;