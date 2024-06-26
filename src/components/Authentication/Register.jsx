// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from './axios';
import '/src/styles/register.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import './tailwind.css';





function Register() {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
      first_name: '',
      last_name: '',
      contact_number: '',
      email: '',
      password: '',
      confirm_password: '',
    });
    
    const [formData, updateFormData]                       = useState(initialFormData);
    const [error, setError]                                = useState('')
    const [successMessage, setSuccessMessage]              = useState('');
    const [diableRegisterButton, setDisableRegisterButton] = useState(false)
    const [selectedAccountColor, setSelectedAccountColor]  = useState('')
    const [isMerchant, updateIsMerchant]                   = useState(false)

    


    const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

    const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => key !== 'password' && key !== 'confirm_password')
      );

    const handleSubmit = async (e) => {
		e.preventDefault();
        let validationError = [];
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
		// console.log(formData);

        if (!formData.email) {
            validationError.push("Please fill your Email Address");
        }
        else if (!formData.last_name) {
            validationError.push("Please fill your Last Name");
        }
        else if (!formData.first_name) {
            validationError.push("Please fill your First Name");
        }
        else if (!formData.contact_number) {
            validationError.push("Please fill the contact number");
        }
        else if (formData.contact_number.length < 10) {
            validationError.push("Mobile number must contain 10 digits");   
        }
        else if (!formData.password) {
            validationError.push("Please fillup the password");
        }
        else if (formData.password.length < 10) {
            validationError.push("Password must contain at least 10 characters");

        } else if (!selectedAccountColor) {
          validationError.push("Please select User account type");
        }
        // else if (!passwordRegex.test(formData.password)) {
        //     validationError.push("Password must contain at least 10 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        // }
        else if (!formData.confirm_password) {
            validationError.push("Please fillup the confirm password");
        }
        else if (formData.password !== formData.confirm_password) {
            validationError.push("Password did not match please correct the password");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError(''); 
        }

        setDisableRegisterButton(true)

        setTimeout(() => {
          setDisableRegisterButton(false)
        }, 4000);

      await axiosInstance.post(`api/v1/user/register/`, {
            firstname: formData.first_name,
            lastname: formData.last_name,
            phoneno: formData.contact_number,
            email: formData.email,
            password: formData.password,
            password1: formData.confirm_password,
            is_merchent: isMerchant
        })
        .then((res) => {
            // console.log(res.data)
            if(res.status == 201) {
                const response_msg = res.data.msg;
                const match        = response_msg.match(/\d+$/);

                if (response_msg) {
                  const user_ID            = parseInt(match[0])
                  filteredFormData.user_id = user_ID;
                  // console.log("User:", user_ID);
                } else {
                  console.log("No number found at the end of the string.");
                }

                setSuccessMessage(`Dear ${formData.first_name} ${formData.last_name} you have been Registered Successfully Please fill the KYC details`)
                const queryString = new URLSearchParams(filteredFormData).toString();

                setTimeout(() => {
                    navigate(`/kyc?${queryString}`);
                }, 3000);
                
            }
        })
        .catch((error) => {
          console.log(error)
            if (error.response.status === 400) {
                setError(error.response.data.msg)
            }
            else if (error.response.data.msg == 'Password is not same Please try again') {
                setError('Password did not match please try again')
            }
            else {
                setError('')
            }
        });

        // fetch("http://127.0.0.1:8000/api/v1/user/register/", {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstname: formData.first_name,
        //         lastname: formData.last_name,
        //         phoneno: formData.contact_number,
        //         email: formData.email,
        //         password: formData.password,
        //         password1: formData.password1
        //     }),
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         console.log(response)
        //         throw new Error('Network response was not ok');
        //     }
            
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // })
	};


  const handelSelectedAccountClick = (event, account) => {
    setSelectedAccountColor(account)

    if (account === 'merchant') {
      updateIsMerchant(true)

    } else {
      updateIsMerchant(false)
    }

    // console.log(event.target.value)
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
            <p className='text-7xl'><RiUser3Line/>  </p>
            <h2 className="text-2xl font-semibold mb-4 "> Sign Up</h2>
              </center>
            </div>
          
          <form className="space-y-4 ">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">

            <div>
              <label className="block text-gray-600 font-medium ">First Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="First Name"
                name='first_name'
                onChange={handleChange} 
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Last Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Last Name"
                name='last_name'
                onChange={handleChange}
              />
            </div>

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

            <div>
              <label className="block text-gray-600 font-medium">Phone No</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Phone No"
                name='contact_number'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="********"
                name='password'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Confirm Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="********"
                name='confirm_password'
                onChange={handleChange}
              />
            </div>
            
            
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow" style={{borderRadius: '20px'}} >
                <div className="flex flex-col items-center pb-10" style={{backgroundColor: selectedAccountColor === 'user' ? '#008CCC' : '', cursor: 'pointer', borderRadius: '20px'}} onClick={(event)=> {handelSelectedAccountClick(event, 'user')}}>
                    <img className="w-24 h-24 mb-1 rounded-full shadow-lg" src="https://python-uat.oyefin.com/media/signup/user.png" alt="User image" style={{marginTop: "20px"}}  />
                    <h5 className="mb-0 text-md font-medium text-gray-900 dark:text-white peer-checked:text-white">User</h5>
                </div>
            </div>

            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow" style={{borderRadius: '20px'}}>
                <div className="flex flex-col items-center pb-10" style={{backgroundColor: selectedAccountColor === 'merchant' ? '#008CCC' : '', cursor: 'pointer', borderRadius: '20px'}} onClick={(event)=> {handelSelectedAccountClick(event, 'merchant')}}>
                    <img className="w-24 h-24 mb-1 rounded-full shadow-lg" src="https://python-uat.oyefin.com/media/signup/merchant.png" alt="Bonnie image" style={{marginTop: '20px'}}/>
                    <h5 className="mb-0 text-md font-medium text-gray-900 dark:text-white">Merchant</h5>
                </div>
            </div>

          </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
              disabled={diableRegisterButton}
            >
              Sign Up
            </button>

            {error &&  <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

          </form>

          <div className='cols col-span-1 flex justify-between items-center'>

          <p className='font-extralight'>If you already have any account <Link to={'/signin/'}>  LOGIN</Link></p>
          <p className='font-extralight'> <Link to={'/forgot-password/'}> Forget password</Link></p>
          </div>
        </div>

          </div>        
        </div>
      </div>


          
        </>
    );
};



export default Register;

