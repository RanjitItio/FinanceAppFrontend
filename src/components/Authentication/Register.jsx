// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from './axios';
import '/src/styles/register.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";






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
    
    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');


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
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
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
            setSuccessMessage(`Dear ${formData.first_name} ${formData.last_name} you have been Registered Successfully Please fill the KYC details`)
            const queryString = new URLSearchParams(filteredFormData).toString();
            // console.log(queryString)
            setTimeout(() => {
                navigate(`/kyc?${queryString}`);
            }, 3000);
        }
        
        // await axiosInstance.post(`register/`, {
        //     email: formData.email,
        //     username: formData.username,
        //     password: formData.password,
        // })
        // .then((res) => {
        //     // history.push('/login');
        //     console.log(res);
        //     console.log(res.data);
        // });

	};

    return(
        <>
        <section className="vh-100 bg-image" style={{backgroundImage: "url('/src/images/signupbg.jpg')"}}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{borderRadius: "15px"}}>
                        <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                       {/* Form Start */}
                        <form method='post'>

                            <div className="form-outline mb-2">
                                <input type="text" id="username" name='first_name' className="form-control form-control-lg" required onChange={handleChange} />
                                <label className="form-label" htmlFor="username">First Name</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input type="text" id="username" name='last_name' className="form-control form-control-lg" required onChange={handleChange} />
                                <label className="form-label" htmlFor="username">Last Name</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input type="number" id="contact_number" name='contact_number' className="form-control form-control-lg" required onChange={handleChange} value={formData.contact_number} />
                                <label className="form-label" htmlFor="contact_number">Mobile No.</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input type="email" id="email" name='email' className="form-control form-control-lg"  required  onChange={handleChange} value={formData.email} />
                                <label className="form-label" htmlFor="email">Your Email</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input type="password" id="password" name='password' className="form-control form-control-lg" required onChange={handleChange} />
                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input type="password" id="confirm_password" name='confirm_password' className="form-control form-control-lg" required onChange={handleChange} />
                                <label className="form-label" htmlFor="confirm_password">Confirm password</label>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" onClick={handleSubmit}
                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                            </div>

                            {error &&  <p className="text-danger">{error}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}

                            &nbsp;
                            <div className="form-check d-flex justify-content-center mb-5">
                               <Link to={'/forgot-password/'} className="text-body"><u>Forgot Password</u></Link>
                            </div>

                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to={'/signin/'}
                                className="fw-bold text-body"><u>Login here</u></Link></p>
                        </form>

                        {/* Form Ends */}

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
          
        </>
    );
};



export default Register;

