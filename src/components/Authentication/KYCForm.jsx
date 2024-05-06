import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';




const KYCForm = () => {
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    email: '',
    phoneNumber: '',
    address: '',
    landmark: '',
    city: '',
    zipCode: '',
    stateOrUt: '',
    country: '',
    nationality: '',
    idType: '',
    idNumber: '',
    idExpiryDate: '',
    document: '',
    user_id: '',
  });

  const [step, setStep] = useState(1);
  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('');


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const first_name = urlParams.get('first_name') || '';
    const last_name  = urlParams.get('last_name') || '';
    const contact_no = urlParams.get('contact_number') || '';
    const email      = urlParams.get('email') || '';
    const user_ID    = urlParams.get('user_id') || '';

    updateFormData({
      firstName: first_name,
      lastName: last_name,
      phoneNumber: contact_no,
      email: email,
      dob: '',
      gender: '',
      maritalStatus: '',
      address: '',
      landmark: '',
      city: '',
      zipCode: '',
      stateOrUt: '',
      country: '',
      nationality: '',
      idType: '',
      idNumber: '',
      idExpiryDate: '',
      document: '',
      user_id: parseInt(user_ID)
    })
   
  }, [])

  
  // Submit Data
  const handleFormSubmit = async (e)=> {
    // console.log(typeof(formData.firstName))
      

    let validationError = [];

    if (formData.firstName == '') {
        validationError.push("Please fill your First Name");
    }else if (formData.lastName == ''){
        validationError.push("Please fill your Last Name");
    }else if (formData.dob == ''){
        validationError.push("Please fill your Date of Birth");
    } else if (formData.gender == '') {
        validationError.push("Please select your Gender");
    }else if (formData.maritalStatus == '') {
        validationError.push("Please select your Marital Status");
    }else if (formData.email == '') {
        validationError.push("Please fill your email Address");
    }else if (formData.phoneNumber == '') {
        validationError.push("Please fill your Phone number");
    }else if (formData.address == '') {
        validationError.push("Please fill your Address");
    }else if (formData.landmark == '') {
        validationError.push("Please type your Landmark name");
    }else if (formData.city == '') {
        validationError.push("Please fill your city name");
    }else if (formData.zipCode == '') {
        validationError.push("Please fill your Zipcode");
    }else if (formData.stateOrUt == '') {
        validationError.push("Please fill your State or UT");
    }else if (formData.country == '') {
        validationError.push("Please fill your Country Name");
    }else if (formData.nationality == '') {
        validationError.push("Please type your Nationality");
    }else if (formData.idType == '') {
        validationError.push("Please select your ID Type");
    }else if (formData.idNumber == '') {
        validationError.push("Please type your ID Number");
    }else if (formData.idExpiryDate == '') {
        validationError.push("Please fill in ID Expiry Date");
    }

    if (validationError.length > 0) {
      setError(validationError.join(''));
      return;
    } else{
      setError(''); 
    } 

        await axiosInstance.post(`api/v1/user/kyc/`,{
          user_id: formData.user_id,
          firstname: formData.firstName ,
          lastname: formData.lastName,
          dateofbirth: formData.dob,
          gander: formData.gender,
          marital_status: formData.maritalStatus,
          email: formData.email,
          phoneno: formData.phoneNumber,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          zipcode: formData.zipCode,
          state: formData.stateOrUt,
          country: formData.country,
          nationality: formData.nationality,
          id_type: formData.idType,
          id_number: formData.idNumber,
          id_expiry_date: formData.idExpiryDate,
          uploaddocument: 'none'
        }).then((res) => {
              // console.log(res.data)
              if(res.status == 200) {
                  setSuccessMessage(`Kyc has been submitted successfully `)
                  const queryString = new URLSearchParams({'first_name':formData.firstName, 'last_name':formData.lastName});
                  setTimeout(() => {
                    navigate(`/kyc-submission-report?${queryString}`);
                }, 2000);
              }
          }).catch((error)=> {
            console.log(error.response)
          });
  }
  
  console.log(formData)

  const handleChange = (e) => {
    updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});

    // const { name, value, files } = e.target;
    // const details = { ...section };
    // console.log(details)
    
    // if (files) {
    //   details[name] = files[0];
    // } else {
    //   details[name] = value;
    // }

    // switch (section) {
    //   case 'basic':
    //     setBasicDetails(details);
    //     break;
    //   case 'contact':
    //     setContactDetails(details);
    //     break;
    //   case 'personal':
    //     setPersonalDetails(details);
    //     break;
    //   default:
    //     break;
    // }
  };
  
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Basic Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button disabled className="bg-gray-400 text-white p-2 rounded-md mr-2">Previous</button>
              <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded-md">Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Contact Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City/Town</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">State/UT</label>
                <input
                  type="text"
                  name="stateOrUt"
                  value={formData.stateOrUt}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded-md mr-2">Previous</button>
              <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded-md">Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Personal Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID Type</label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select ID Type</option>
                  <option value="passport">Passport</option>
                  <option value="driving_license">Driving License</option>
                  <option value="national_id">National ID</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID Expiry Date</label>
                <input
                  type="date"
                  name="idExpiryDate"
                  value={formData.idExpiryDate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Document</label>
                <input
                  type="file"
                  name="document"
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded-md mr-2">Previous</button>
              <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleFormSubmit}>Submit</button>
            </div>
            {error &&  <p className="text-danger">{error}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <div className="mb-6">
          <div className="bg-blue-200 rounded-full">
            <div
              className={`bg-blue-500 text-white rounded-full w-${(step - 1) * 33.33}%`}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Step {step} of 3</span>
            <span className="text-xs text-gray-500">Progress: {(step - 1) * 33.33}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-200">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full " style={{ width: `${(step - 1) * 33.33}%` }}> Progress: {(step - 1) * 33.33}%</div>
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};


export default KYCForm;
