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
		username: '',
        contact_number: '',
		email: '',
		password: '',
		confirm_password: '',
	});
    
    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')


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
		// console.log(formData);

        if (!formData.email) {
            validationError.push("Please fill the Email");
        }
        else if (!formData.username) {
            validationError.push("Please fill the Username");
        }
        else if (!formData.contact_number) {
            validationError.push("Please fill the contact number");
        }
        else if (formData.contact_number.length < 9) {
            validationError.push("Mobile number should be of 10 digit");   
        }
        else if (!formData.password) {
            validationError.push("Please fillup the password");
        }
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
            const queryString = new URLSearchParams(filteredFormData).toString();
            // console.log(queryString)
            navigate(`/kyc?${queryString}`);
        }
        
        // await axiosInstance.post(`userauthentication/user/register`, {
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

                            <div className="form-outline mb-4">
                                <input type="text" id="username" name='username' className="form-control form-control-lg" required onChange={handleChange} value={formData.username}/>
                                <label className="form-label" htmlFor="username">Your Name</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="number" id="contact_number" name='contact_number' className="form-control form-control-lg" required onChange={handleChange} value={formData.contact_number} />
                                <label className="form-label" htmlFor="contact_number">Mobile No.</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="email" id="email" name='email' className="form-control form-control-lg"  required  onChange={handleChange} value={formData.email} />
                                <label className="form-label" htmlFor="email">Your Email</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="password" name='password' className="form-control form-control-lg" required onChange={handleChange} />
                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="confirm_password" name='confirm_password' className="form-control form-control-lg" required onChange={handleChange} />
                                <label className="form-label" htmlFor="confirm_password">Confirm password</label>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" onClick={handleSubmit}
                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                            </div>

                            {error &&  <p className="text-danger">{error}</p>}

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

