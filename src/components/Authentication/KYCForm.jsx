import { useState } from 'react';






const KYCForm = () => {
  const [step, setStep] = useState(1);

  const [basicDetails, setBasicDetails] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
  });

  const [contactDetails, setContactDetails] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    landmark: '',
    city: '',
    zipCode: '',
    stateOrUt: '',
    country: '',
  });

  const [personalDetails, setPersonalDetails] = useState({
    nationality: '',
    idType: '',
    idNumber: '',
    idExpiryDate: '',
    document: null,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e, section) => {
    const { name, value, files } = e.target;
    const details = { ...section };

    if (files) {
      details[name] = files[0];
    } else {
      details[name] = value;
    }

    switch (section) {
      case 'basic':
        setBasicDetails(details);
        break;
      case 'contact':
        setContactDetails(details);
        break;
      case 'personal':
        setPersonalDetails(details);
        break;
      default:
        break;
    }
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
                  value={basicDetails.firstName}
                  onChange={(e) => handleChange(e, 'basic')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={basicDetails.lastName}
                  onChange={(e) => handleChange(e, 'basic')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={basicDetails.dob}
                  onChange={(e) => handleChange(e, 'basic')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={basicDetails.gender}
                  onChange={(e) => handleChange(e, 'basic')}
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
                  value={basicDetails.maritalStatus}
                  onChange={(e) => handleChange(e, 'basic')}
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
                  value={contactDetails.email}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={contactDetails.phoneNumber}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={contactDetails.address}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={contactDetails.landmark}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City/Town</label>
                <input
                  type="text"
                  name="city"
                  value={contactDetails.city}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={contactDetails.zipCode}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">State/UT</label>
                <input
                  type="text"
                  name="stateOrUt"
                  value={contactDetails.stateOrUt}
                  onChange={(e) => handleChange(e, 'contact')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={contactDetails.country}
                  onChange={(e) => handleChange(e, 'contact')}
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
                  value={personalDetails.nationality}
                  onChange={(e) => handleChange(e, 'personal')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID Type</label>
                <select
                  name="idType"
                  value={personalDetails.idType}
                  onChange={(e) => handleChange(e, 'personal')}
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
                  value={personalDetails.idNumber}
                  onChange={(e) => handleChange(e, 'personal')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID Expiry Date</label>
                <input
                  type="date"
                  name="idExpiryDate"
                  value={personalDetails.idExpiryDate}
                  onChange={(e) => handleChange(e, 'personal')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Document</label>
                <input
                  type="file"
                  name="document"
                  onChange={(e) => handleChange(e, 'personal')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded-md mr-2">Previous</button>
              <button className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
            </div>
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
          <div class="w-full bg-gray-200 rounded-full dark:bg-gray-200">
            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full " style={{ width: `${(step - 1) * 33.33}%` }}> Progress: {(step - 1) * 33.33}%</div>
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};


export default KYCForm;
