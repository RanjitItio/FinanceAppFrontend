import React, { useState, useEffect} from 'react';
import { Button, TextField, Grid,
         MenuItem, Box, Typography, FormControl, 
         Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';



const steps = ['Personal Details', 'Contact Details', 'Address Details', 'Identity Details'];

// Content inside every step
const StepContent = ({ step, formData, handleChange, handleZipCodeChange, handleDocumentChange }) => {

  switch (step) {
    case 0:
      return (
        <Box display="flex" flexDirection="column" gap={3}>

          {/* First Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  size='small' 
                  label="First Name" 
                  fullWidth 
                  />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  size='small' 
                  label="Last Name" 
                  fullWidth 
                  />
            </Grid>
          </Grid>

          {/* Second Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size='small'
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small-label">Gender</InputLabel>
                  <Select
                    labelId="demo-select-gender-label"
                    id="demo-select-gender"
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
          </Grid>

          {/* 3rd Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small-label">Marital Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Marital Status</MenuItem>
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
          </Grid>

        </Box>
      );
    case 1:
      return (
        <Box display="flex" flexDirection="column" gap={2}>
          {/* First Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    name="email"
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    label="Email" 
                    fullWidth 
                    size='small' 
                    />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    label="Phone Number" 
                    fullWidth 
                    size='small' 
                    />
            </Grid>
          </Grid>
        </Box>
      );
    case 2:
      return (
        <Box display="flex" flexDirection="column" gap={2}>

          {/* First Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    size='small' 
                    label="Address" 
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleChange} 
                    />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    size='small' 
                    label="Land Mark" 
                    fullWidth 
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    />
            </Grid>
          </Grid>

          {/* Second Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    label="City" 
                    fullWidth 
                    size='small' 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    label="State/UT" 
                    fullWidth 
                    size='small'
                    name="stateOrUt"
                    value={formData.stateOrUt}
                    onChange={handleChange} 
                    />
            </Grid>
          </Grid>


          {/* Second Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    label="Zip Code" 
                    fullWidth 
                    size='small' 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleZipCodeChange}
                    />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    label="Country" 
                    fullWidth 
                    size='small' 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    />
            </Grid>
          </Grid>

          {/* Third Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <TextField 
                    label="Nationality" 
                    fullWidth 
                    size='small' 
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    />
            </Grid>
          </Grid>

        </Box>
      );
    case 3:
      return (
        <Box display="flex" flexDirection="column" gap={2}>
           {/* First Row */}
           <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small-label">ID Type</InputLabel>
                  <Select
                    labelId="demo-id-type-small-label"
                    id="demo-id-type-small"
                    label="ID Type"
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select ID Type</MenuItem>
                    <MenuItem value="aadhaar">Aadhaar</MenuItem>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="driving_license">Driving License</MenuItem>
                    <MenuItem value="voter_id">Voter ID</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <TextField 
                    label="ID Number" 
                    fullWidth 
                    size='small' 
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    />
            </Grid>
          </Grid>

          {/* Second Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <label htmlFor='idExpiry'>&nbsp;</label>
                <TextField
                  label="ID Expiry Date"
                  id='idExpiryDate'
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size='small'
                  name="idExpiryDate"
                  value={formData.idExpiryDate}
                  onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <label htmlFor='idProof'>Upload Document</label>
                <TextField 
                    type='file' 
                    id='idProof' 
                    fullWidth 
                    size='small' 
                    InputLabelProps={{ shrink: true }}
                    name="document"
                    onChange={handleDocumentChange}
                    />
            </Grid>
          </Grid>
        </Box>
      );
    default:
      return null;
  }
};



// User kyc form
export default function KYCForm() {

    const initialFormData = {
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
      document: null,
      user_id: '',
    };

    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);  // Steps state
    const [formData, updateFormData] = useState(initialFormData);  // All Fields value state
    const [error, setError]          = useState('');   // Error message 
    const [successMessage, setSuccessMessage] = useState('');   // Success Message

     // Capture all the query params when page loads
  useEffect(() => {
    const urlParams  = new URLSearchParams(window.location.search);
    const first_name = urlParams.get('first_name') || '';
    const last_name  = urlParams.get('last_name') || '';
    const contact_no = urlParams.get('contact_number') || '';
    const email = urlParams.get('email') || '';
    const user_ID = urlParams.get('user_id') || '';

    // Update the form values
    updateFormData({
      ...initialFormData,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: contact_no,
      email: email,
      user_id: parseInt(user_ID),
    });
  }, []);


   // Submit button method
   const handleFormSubmit = async (e) => {
    e.preventDefault();

    if(!formData.firstName.trim()) {
      setError('Please fill your First Name')
    } else if (!formData.lastName.trim()) {
      setError('Please fill your Last Name')
    } else if (!formData.dob.trim()) {
      setError('Please fill your Date of Birth')
    } else if (!formData.gender.trim()) {
      setError('Please select your Gender')
    } else if (!formData.maritalStatus.trim()) {
      setError('Please select your Marital Status')
    } else if (!formData.email.trim())  {
      setError('Please fill your email Address')
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setError('Please enter valid email address')
    } else if (!formData.phoneNumber.trim()) {
      setError('Please fill your Phone number')
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      setError('Please enter valid phone number')
    } else if (!formData.address.trim()) {
      setError('Please fill your Address')
    } else if (!formData.landmark.trim()) {
      setError('Please type your Landmark name')
    } else if (!formData.city.trim()) {
      setError('Please fill your city name')
    } else if (!formData.zipCode.trim()) {
      setError('Please fill your Zipcode')
    } else if (!formData.stateOrUt.trim()) {
      setError('Please fill your State or UT')
    } else if (!formData.country.trim()) {
      setError('Please fill your Country Name')
    } else if (!formData.nationality.trim()) {
      setError('Please fill your Nationality')
    } else if (!formData.idType.trim()) {
      setError('Please select your ID Type')
    } else if (!formData.idNumber.trim()) {
      setError('Please type your ID Number')
    } else if (!formData.idExpiryDate.trim()) {
      setError('Please fill in ID Expiry Date')
    } else if (formData.document && formData.document.size > 1024 * 1024) {
      setError('Document size must be less than 1MB')
    } else {
      setError('');

      const formDataToSend = new FormData();

      formDataToSend.append('user_id', parseInt(formData?.user_id || 0));
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

      // Call api for Kyc Submission
      try {
        const res = await axiosInstance.post('api/v1/user/kyc/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        if (res.status === 200) {

          setSuccessMessage(`KYC has been submitted successfully`);
          const queryString = new URLSearchParams({ first_name: formData.firstName, last_name: formData.lastName });

          // Redirect to success page after successfull submission
          setTimeout(() => {
            navigate(`/kyc/success/?${queryString}`);
          }, 2000);
          
        }
      } catch (error) {
        // console.log(error);
        if (error.response.data.msg === 'Please upload document') {
            setError('Please upload document');
        } else if (error.response.data.message === 'Kyc already applied') {
          setError('KYC already applied, can not reapply');
        } else if (error.response.status === 413) {
          setError('File size too large')
        } else if (error.response.data.message === 'User not found') {
          setError('Invalid User, Please register first')
        }
      }
  }
};

  // Typed form values
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    updateFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };


  // Zipcode value format
  const handleZipCodeChange = (e) => {
    const input_value = e.target.value;

    if (Number.isNaN(Number(input_value))) {
      setError('Please type a number');
    } else {
      setError('');
    }
  };

  // Document capture method
  const handleDocumentChange = (event) => {
    updateFormData({ ...formData, document: event.target.files[0] });
  };


  // Next button method
  const handleNext = () => {
    // console.log(activeStep)

    // First Step validation
    if (activeStep === 0) {
      if (formData.firstName === '') {
        setError('Please fill First name')
      } else if (formData.lastName === '') {
        setError('Please fill Last name')
      } else if (formData.dob === '') {
        setError('Please select DOB')
      } else if (formData.gender === '') {
        setError('Please select your gender')
      } else if (formData.maritalStatus === '') {
        setError('Please select your marital status')
      } else {
        setError('')
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    };

    // Second step validation
    if (activeStep === 1) {
        if (formData.email === '') {
          setError('Please fill your email ID')
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
          setError('Please enter valid email Address')
        } else if (formData.phoneNumber === '') {
          setError('Please fill your Phone Number')

        } else if (!/^\d+$/.test(formData.phoneNumber)) {
          setError('Please enter valid Pnone Number')
        } else {
          setError('')
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
    };

    // Third step validation
    if (activeStep === 2) {
      if (formData.address === '') {
        setError('Please fill your Address')
      } else if (formData.landmark === '') {
        setError('Please fill your Landmark')
      } else if (formData.city === '') {
        setError('Please fill your City')
      } else if (formData.stateOrUt === '') {
        setError('Please fill your State/UT')
      } else if (formData.zipCode === '') {
        setError('Please fill your ZipCode')
      } else if (formData.country === '') {
        setError('Please fill your Country Name')
      } else if (formData.nationality === '') {
        setError('Please fill your Nationality')
      } else {
        setError('')
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    };

    // Fourth step validation

    if (activeStep === 3) {
      if (formData.idType === '') {
        setError('Please select ID Type')
      } else if (formData.idNumber === '') {
        setError('Please type ID Number')
      } else if (formData.idExpiryDate === '') {
        setError('Please select ID Expiry Date')
      } else if (formData.document === null) {
        setError('Please upload your document')
      } else {
        setError('')
      };

    };

  };

  // Back button method
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Reset Button Method
  const handleReset = () => {
    setActiveStep(0);
  };


  return (
      <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
          <Box width="80%" height={550} maxWidth="1000px" display="flex" flexDirection="row" >
              <Box
                display={{ xs: 'none', md: 'flex' }}
                flexDirection="column"
                alignItems="center"
                p={2}
                bgcolor="#e3f2fd"
                borderRadius={2}
              >
                {steps.map((label, index) => (
                  <Box
                    key={label}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={1}
                    width="150px"
                    mb={1}
                    borderRadius="20px"
                    bgcolor={activeStep === index ? '#1e88e5' : '#cfd8dc'}
                    color={activeStep === index ? '#ffffff' : '#000000'}
                    fontWeight={activeStep === index ? 'bold' : 'normal'}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
              <Box
                flex={1}
                p={3}
                borderRadius={2}
                boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                bgcolor="#ffffff"
              >
                <Typography variant="h5" mb={2}>
                  {steps[activeStep]}
                </Typography>

                {/* Step Content */}
                <StepContent 
                    step={activeStep} 
                    formData={formData} 
                    handleChange={handleChange}
                    handleZipCodeChange={handleZipCodeChange}
                    handleDocumentChange={handleDocumentChange}
                    />

                <Box mt={2} display="flex" justifyContent="space-between" marginTop={6}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="contained"
                    color="inherit"
                  >
                    Previous
                  </Button>

                  <Button
                    // onClick={activeStep === steps.length ? handleReset : handleNext}
                    onClick={activeStep === steps.length - 1 ? handleFormSubmit : handleNext}
                    variant="contained"
                    color="primary"
                  >
                    {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
                  </Button>
                </Box>

                  {/* Error and Success Message */}
                  {error && (
                    <Typography variant="body1" color="error" sx={{display:'flex', justifyContent:'center'}}>
                      {error}
                    </Typography>
                  )}
                  {successMessage && (
                    <Typography variant="body1" sx={{display:'flex', justifyContent:'center', color:'green'}}>
                      {successMessage}
                    </Typography>
                  )}
              </Box>
          </Box>
     </Box>
    );
};


