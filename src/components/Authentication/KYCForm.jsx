import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, TextField, Button, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import { Grid } from '@mui/material';
import { Alert } from '@mui/material';



// User kyc form
const KYCForm = () => {
  const navigate = useNavigate();
  const currenct_date = new Date().toISOString().split('T')[0]

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
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const first_name = urlParams.get('first_name') || '';
    const last_name = urlParams.get('last_name') || '';
    const contact_no = urlParams.get('contact_number') || '';
    const email = urlParams.get('email') || '';
    const user_ID = urlParams.get('user_id') || '';

    updateFormData({
      ...initialFormData,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: contact_no,
      email: email,
      user_id: parseInt(user_ID),
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let validationError = [];
    const currenct_date = new Date().toISOString().split('T')[0]

    if (!formData.firstName.trim()) validationError.push("Please fill your First Name");
    if (!formData.lastName.trim()) validationError.push("Please fill your Last Name");
    if (!formData.dob.trim()) validationError.push("Please fill your Date of Birth");
    if (!formData.gender.trim()) validationError.push("Please select your Gender");
    if (!formData.maritalStatus.trim()) validationError.push("Please select your Marital Status");
    if (!formData.email.trim()) validationError.push("Please fill your email Address");
    if (!formData.phoneNumber.trim()) validationError.push("Please fill your Phone number");
    if (!formData.address.trim()) validationError.push("Please fill your Address");
    if (!formData.landmark.trim()) validationError.push("Please type your Landmark name");
    if (!formData.city.trim()) validationError.push("Please fill your city name");
    if (!formData.zipCode.trim()) validationError.push("Please fill your Zipcode");
    if (!formData.stateOrUt.trim()) validationError.push("Please fill your State or UT");
    if (!formData.country.trim()) validationError.push("Please fill your Country Name");
    if (!formData.nationality.trim()) validationError.push("Please type your Nationality");
    if (!formData.idType.trim()) validationError.push("Please select your ID Type");
    if (!formData.idNumber.trim()) validationError.push("Please type your ID Number");
    if (!formData.idExpiryDate.trim()) validationError.push("Please fill in ID Expiry Date");

    if (validationError.length > 0) {
      setError(validationError.join(', '));
      return;
    } else {
      setError('');
    }

    const formDataToSend = new FormData();

    formDataToSend.append('user_id', formData.user_id);
    formDataToSend.append('firstname', formData.firstName);
    formDataToSend.append('lastname', formData.lastName);
    formDataToSend.append('dateofbirth', formData.dob);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('marital_status', formData.maritalStatus);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneno', formData.phoneNumber);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('landmark', formData.landmark);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('zipcode', formData.zipCode);
    formDataToSend.append('state', formData.stateOrUt);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('nationality', formData.nationality);
    formDataToSend.append('id_type', formData.idType);
    formDataToSend.append('id_number', formData.idNumber);
    formDataToSend.append('id_expiry_date', formData.idExpiryDate);
    formDataToSend.append('uploaddocument', formData.document);

    try {
      const res = await axiosInstance.post(`api/v1/user/kyc/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        setSuccessMessage(`KYC has been submitted successfully`);
        const queryString = new URLSearchParams({ 'first_name': formData.firstName, 'last_name': formData.lastName });
        setTimeout(() => {
          navigate(`/kyc-submission-report?${queryString}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    updateFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleZipCodeChange = (e) => {
     const input_value = e.target.value
    //  console.log(input_value)

     if (Number.isNaN(Number(input_value))) {
        setError('Please type a number')

     } else {
      setError('')
     }
  };

  // console.log(formData.document)

  const handleDocumentChange = (event) => {
    updateFormData({ ...formData, document: event.target.files[0] });
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
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
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
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
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded-md mr-2">Previous</button>
              <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded-md">Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Address Details</h2>
            <div className="grid grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700">City</label>
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
                  onChange={(event)=> {handleChange(event); handleZipCodeChange(event);}}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {error && <p className='text-red-500'>{error}</p>}

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
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded-md mr-2">Previous</button>
              <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded-md">Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Identity Details</h2>
            <div className="grid grid-cols-2 gap-4">
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
                  <option value="driver_license">Driver License</option>
                  <option value="national_id">National ID</option>
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
                  min={currenct_date}
                  onChange={(event)=> {handleChange(event); }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {error && <p className='text-red-500'>{error}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Document</label>
                <input
                  type="file"
                  name="document"
                  // value={formData.document}
                  onChange={handleDocumentChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded-md mr-2">Previous</button>
              <button onClick={handleFormSubmit} className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card  style={{ marginRight: '10rem', marginLeft: '10rem', marginBottom: '0rem', }}>

      <div className="min-h-screen flex">
        <aside className="w-1/4 bg-blue-200 p-4">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold mb-6 ">Create Account</h1>
            <div className="flex items-center mb-2">
              <div className={`w-5 h-10 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 ">Personal Details</span>
            </div>
            <div className="flex items-center mb-2">
              <div className={`w-5 h-10 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 ">Contact Details</span>
            </div>
            <div className="flex items-center mb-2">
              <div className={`w-5 h-10 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 ">Address Details</span>
            </div>
            <div className="flex items-center mb-2">
              <div className={`w-5 h-10 rounded-full ${step >= 4 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 ">Identity Details</span>
            </div>
          </div>
        </aside>
        <main className="w-3/4 bg-blue-100 p-8">
          {renderStep()}
          {error && <div className="mt-4 text-red-600">{error}</div>}
          {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
        </main>
      </div>
    </Card>

  );
};


export default KYCForm;


