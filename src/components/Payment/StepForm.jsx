import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Container, Select, MenuItem, InputLabel, useMediaQuery, useTheme } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios'




function HeadForm({...props}) {

  const [currencies, setCurrencies]                          = useState([])
  const [senderCurrencyValue, updateSenderCurrencyValue]     = useState('')
  const [receiverCurrencyValue, updateReceiverCurrencyValue] = useState('')
  const [sourceFundValue, updatesourceFundValue]             = useState('')
  const [sendingPurposeValue, updateSendingPurposeValue]     = useState('')
  const [convertedAmount, setConvertedAmount]                = useState('');

  // Call API to convert the Currency Value
  useEffect(() => {
    if (props.formData.receiver_currency && props.formData.send_currency && props.formData.send_amount){
      const convert_amount = parseInt(props.formData.send_amount)

      axiosInstance.post(`api/v2/convert/currency/`, {
        from_currency: props.formData.send_currency,
        to_currency:   props.formData.receiver_currency,
        amount     :   convert_amount

      }).then((res)=> {
        // console.log(res.data.converted_amount)
        setConvertedAmount(res.data.converted_amount)

      }).catch((error)=> {
        console.log(error.response)

      })
    }
  }, [props.formData.receiver_amount, props.formData.receiver_currency, props.formData.send_currency, props.formData.send_amount])


  useEffect(() => {
    axiosInstance.get(`/api/v2/currency`).then((res) => {
        // console.log(res.data.currencies)
        if (res.data.currencies) {
          setCurrencies(res.data.currencies)
        }

    }).catch((error) => {
        console.log(error.response)

    })
  }, [])

  const handleUpdateSenderCurrencyValue = (event) => {
    updateSenderCurrencyValue(event.target.value)
  }

  const handleUpdateReceiverCurrencyValue = (event) => {
    updateReceiverCurrencyValue(event.target.value)
  }

  const handleSourceFundValue = (event)=> {
    updatesourceFundValue(event.target.value)
  }
  
  const handleSendingPurposeValue = (event)=> {
    updateSendingPurposeValue(event.target.value)
  }

  

  return (
    <>

      <Form method='post'>
        <Row className="mb-3">
          <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12 '  controlId="formGridSend">
            <InputLabel >Send</InputLabel>
            <TextField fullWidth autoFocus 
                       label="Enter Amount" 
                       type="number"  
                       onChange={(event)=>{props.handleFormValueChange(event)}}
                       variant="outlined"
                       name='send_amount'
                       />
          </Form.Group>

          <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">

            <InputLabel id="demo-simple-select-standard-label ">Currency</InputLabel>
            <Select
              fullWidth
              autoFocus
              label="Currency"
              value={senderCurrencyValue}
              name='send_currency'
              onChange={(event)=> {handleUpdateSenderCurrencyValue(event); props.handleFormValueChange(event)}}
            >
              <MenuItem value="">
                <em>Choose...</em>
              </MenuItem>
          
              {currencies.map((currency, index) => (
                    <MenuItem value={currency.name} key={index}>{currency.name}</MenuItem>
              ))}

            </Select>

          </Form.Group>

        </Row>
        {/* &nbsp; */}
        <Row className="mb-3">

        <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
            <InputLabel>Recipient will receive</InputLabel>

            <TextField fullWidth autoFocus
                        type="number" 
                        variant="outlined" 
                        style={{color: 'white'} } 
                        name='receiver_amount'
                        // onChange={(event)=>{props.handleFormValueChange(event)}}
                        value={convertedAmount}
                        />
          </Form.Group>

          <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">

            <InputLabel id="demo-simple-select-standard-label ">Currency</InputLabel>
            <Select
              fullWidth
              autoFocus
              label="Currency"
              value={receiverCurrencyValue}
              name='receiver_currency'
              onChange={(event)=>{handleUpdateReceiverCurrencyValue(event); props.handleFormValueChange(event)}}
            >
              <MenuItem value="">
                <em>Choose...</em>
              </MenuItem>
          
              {currencies.map((currency, index) => (
                    <MenuItem value={currency.name} key={`${currency.name}-${index}`}>{currency.name}</MenuItem>
              ))}

            </Select>
          </Form.Group>

        </Row>

        {/* <Form.Group as={Col} controlId="formGridState">
          <InputLabel id="demo-simple-select-standard-label" >Source Fund</InputLabel>
          <Select fullWidth autoFocus 
                label="Source Fund"
                name='source_fund'
                onChange={(event) => {props.handleFormValueChange(event); handleSourceFundValue(event)}}
                value={sourceFundValue}
                >
            <MenuItem value="">
              <em>Choose...</em>
            </MenuItem>
            <MenuItem value={"Wallet"}>Wallet</MenuItem>
            <MenuItem value={"Bank"}>Bank</MenuItem>
            <MenuItem value={"Paypal"}>Paypal</MenuItem>
            <MenuItem value={"Paytm"}>Paytm</MenuItem>

          </Select>
        </Form.Group> */}

        &nbsp;
        <Form.Group as={Col} controlId="formGridState">
          <InputLabel id="demo-simple-select-standard-label" >Sending Purpose</InputLabel>
          <Select fullWidth autoFocus 
                  label="Sending Purpose"
                  name='sending_purpose'
                  onChange={(event)=> {props.handleFormValueChange(event); handleSendingPurposeValue(event)}}
                  value={sendingPurposeValue}
                  >
            <MenuItem value="">
              <em>Choose...</em>
            </MenuItem>
            <MenuItem value={"Expenses"}>Expenses</MenuItem>
            <MenuItem value={"Insurance"}>Insurance</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>

        </Form.Group>


        <hr />
        <div className="d-flex justify-content-between">
          <p className=''><b>Send Amount</b></p>
          <p className=''><b>Payble Fee</b></p>
          <p className=''><b>Total Amount</b></p>
        </div>
        <div className="d-flex justify-content-between">
          <p><b>{props.formData.send_amount} {props.formData.send_currency}</b></p>
          <p><b>{props.formData.transaction_fee} {props.formData.send_currency}</b></p>
          <p><b>{props.formData.total_amount} {props.formData.send_currency}</b></p>
        </div>
        <br />

        {props.error && <p className='text-warning'>{props.error}</p>}
      </Form>

    </>
  )
}


function Step1Form({...props}) {

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth autoFocus label="Full Name"  
                        variant="outlined" 
                        onChange={(event)=> {props.handleFormValueChange(event)}} 
                        name='receiver_full_name'
                        />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth label="Email" 
                       variant="outlined" 
                       onChange={(event)=> {props.handleFormValueChange(event)}} 
                       name='receiver_email'
                       />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
                      label="Mobile Number" 
                      type="number"
                      variant="outlined" 
                      onChange={(event)=> {props.handleFormValueChange(event)}} 
                      name='receiver_mobile_number'
                      />
          </Grid>

        </Grid>
      </form>

      {props.error && <p className='text-warning'>{props.error}</p>}
    </Container>

  );
}

function Step2Form({...props}) {
  const [paymentOption, setPaymentOption] = React.useState('');

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form method='post'>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12} md={12}>
            <InputLabel id="demo-simple-select-label">Wallet or Bank Transfer</InputLabel>
            <Select 
                  labelId="demo-simple-select-label" 
                  id="demo-simple-select" 
                  value={paymentOption} 
                  label="age" 
                  fullWidth size='small' 
                  name='rec_payment_mode'
                  onChange={(event)=> {handleChange(event); props.handleFormValueChange(event); }} 
                  >
              <MenuItem value={'Wallet'}>Wallet</MenuItem>
              <MenuItem value={'Bank'}>External Bank Transfer</MenuItem>
              <MenuItem value={'Others'}>Others</MenuItem>
            </Select>
            {paymentOption === 'Wallet' && <p className='text-warning'>Receiver email should be registered</p> }
          </Grid>

          {paymentOption !== 'Wallet' && (
            <>
                <Grid item xs={12} sm={6} >
                  <TextField 
                        fullWidth 
                        label="Card/Bank Name" 
                        variant="outlined" 
                        type='text' 
                        required 
                        name='rec_bank_name'
                        onChange={(event)=> {props.handleFormValueChange(event);}}
                        />
                </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                      fullWidth 
                      label="IBAN/AC/ACH Number" 
                      type="text" 
                      variant="outlined" 
                      required 
                      name='rec_bank_acc_no'
                      onChange={(event)=> {props.handleFormValueChange(event);}}
                      />
              </Grid>

              <Grid item xs={12} sm={6} >
                <TextField 
                      fullWidth 
                      label="Routing/IFSC/BIC/SwiftCode" 
                      type='text' 
                      variant="outlined" 
                      required 
                      name='rec_bank_ifsc_code'
                      onChange={(event)=> {props.handleFormValueChange(event);}}
                      />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                    fullWidth 
                    label="Additional Info" 
                    type="text" 
                    variant="outlined" 
                    required
                    name='rec_add_info'
                    onChange={(event)=> {props.handleFormValueChange(event);}}
                    />
              </Grid>
            </>
          )}
        
        </Grid>

        {props.error && <p className='text-warning'>{props.error}</p>}
      </form>

    </Container>
  );
}

function Step3Form({...props}) {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form method='post'>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12}>
            <TextField fullWidth 
                        autoFocus 
                        label="Address Line" 
                        variant="outlined" 
                        name='rec_address'
                        onChange={(event)=> {props.handleFormValueChange(event)}}
                        />
          </Grid>
          
        </Grid>

        {props.error && <p className='text-warning'>{props.error}</p>}
      </form>
    </Container>
  );
}

function Step4Form() {
  const [payvia, setPayvia] = React.useState('');

  const handleChange = (event) => {
    setPayvia(event.target.value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12} md={12}>
            <InputLabel id="demo-simple-select-label">Payment Via</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={payvia} label="age" fullWidth size='small' onChange={handleChange} >
              <MenuItem value={'USD Wallet'}>USD Wallet</MenuItem>
              <MenuItem value={'Bank Transfer'}>Bank Transfer</MenuItem>
              <MenuItem value={'Swift'}>Swift</MenuItem>
              <MenuItem value={'Sepa'}>Sepa</MenuItem>
            </Select>
          </Grid>

          {/* Button */}
          {/* <Grid item xs={3}>
                <Button variant="contained" color="primary" fullWidth>
                Submit
                </Button>
            </Grid> */}

        </Grid>
      </form>
    </Container>
  );
}


const steps = ['Payment Information','Recipient Details', 'Recipient Payment Details', 'Recipient Address'];

// Send Money
export default function StepWisePaymentForm() {

  // All Form fields
  const initialFormData = {
    send_amount: 0,
    send_currency: '',
    receiver_amount: 0,
    receiver_currency: '',
    source_fund: '',
    sending_purpose: '',
    transaction_fee: 0,
    total_amount: 0,
    receiver_full_name: '',
    receiver_email: '',
    receiver_mobile_number: '',
    rec_payment_mode: '',
    rec_bank_name: '',
    rec_bank_acc_no: '',
    rec_bank_ifsc_code: '',
    rec_add_info: '',
    rec_address: ''
  };


  const [activeStep, setActiveStep] = React.useState(0);  // Currenct Step
  const [skipped, setSkipped]       = React.useState(new Set());
  const theme                       = useTheme();
  const matchesXS                   = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, updateFormData]  = useState(initialFormData)
  const [error, setError]           = useState('')

  
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    // Check the first Step Validation
    if (activeStep === 0) {
          if (formData.send_amount === 0) {
            setError('Please fillup the Send amount field')

          } else if (formData.send_currency === '') {
            setError('Please select Send Currency')

          } else if (formData.receiver_currency === '') {
            setError('Please select Receiver Currency')

          } else if (formData.sending_purpose === '') {
            setError('Please select Sending Purpose')

          } else {
              setError('')

              if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
              }
            
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
              
            };
    // Check for 2nd step validation
    } else if (activeStep === 1) {
            if (formData.receiver_full_name === '') {
              setError('Please fill up receiver full name')

            } else if (formData.receiver_mobile_number === '') {
              setError('Please fill up receiver Mobile number')
              
            } else if (formData.receiver_email === '') {
              setError('Please fill up receiver Email')

            } else {
              setError('')

              if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
              }
            
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setSkipped(newSkipped);

            }

    // Check for 3rd step validation
    } else if (activeStep === 2) {

      if (formData.rec_payment_mode === '') {
        setError('Please select receiver payment mode')

        // Check the payment mode is Bank or Others
      } else if (formData.rec_payment_mode === 'Bank' || formData.rec_payment_mode === 'Others') {
           if (formData.rec_bank_name === '') {
            setError('Please type receiver bank name')

           } else if (formData.rec_bank_acc_no === '') {
             setError('Please type receiver bank account number')

           } else if (formData.rec_bank_ifsc_code === '') {
            setError('Please type receiver IFSC Code')
           } else {
              setError('')

              if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
              }
            
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);

           }
      } else {
            setError('')

            if (isStepSkipped(activeStep)) {
              newSkipped = new Set(newSkipped.values());
              newSkipped.delete(activeStep);
            }
          
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);

      }

    // Check for 4th step data validation
    } else if (activeStep === 3) {
          if (formData.rec_address === '') {
            setError('Please fillup Receiver Address')

          } else {
            setError('')

            // console.log(formData)
            // Submit the data in API Request
            axiosInstance.post(`/api/v1/user/send/money/`, {
              send_amount:         parseInt(formData.send_amount),
              fee:                 formData.transaction_fee,
              total_amount:        formData.total_amount,
              send_currency:       formData.send_currency,
              sender_payment_mode: formData.source_fund,
              purpose:             formData.sending_purpose,
              rec_currency:        formData.receiver_currency,
              rec_full_name:       formData.receiver_full_name,
              rec_email:           formData.receiver_email,
              rec_phoneno:         formData.receiver_mobile_number,
              rec_add_info:        formData.rec_add_info,
              rec_address:         formData.rec_address,
              rec_pay_mode:        formData.rec_payment_mode,
              rec_bank_name:       formData.rec_bank_name,
              rec_acc_no:          formData.rec_bank_acc_no,
              rec_ifsc:            formData.rec_bank_ifsc_code

            }).then((res)=> {
              if (res.status === 200) {

                if (isStepSkipped(activeStep)) {
                    newSkipped = new Set(newSkipped.values());
                    newSkipped.delete(activeStep);  
                  }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
              };

            }).catch((error)=> {
              console.log(error.response)

              if (error.response.data.msg == 'Sender donot have sufficient balance in wallet') {
                setError('Do not have sufficient wallet in your wallet');
              } else if (error.response.data.message == 'Your account has been suspended please contact admin for Approval') {
                setError('Account has been suspended, Can not perform this action');
              } else if (error.response.data.message == 'Sender currency does not exist') {
                setError('Invalid sender currency');
              } else if (error.response.data.message == 'Receiver currency does not exist') {
                setError('Invalid receiver currency');
              } else if (error.response.data.message == 'Sender do not have wallet') {
                setError('Sender wallet does not exists');
              } else if (error.response.data.message == 'Sender donot have sufficient balance in wallet') {
                setError('Donot have sufficient balance in Wallet');
              } else if (error.response.data.message == 'Recipient email does not exist') {
                setError('Receiver email does not exist, Please provide existing user email');
              } else if (error.response.data.message == 'Recipient wallet not found') {
                setError('Receiver donot have any exsting wallet');
              } else if (error.response.data.message == 'Cannot transfer to same wallet') {
                setError('Money Can not be transfered to same wallet');
              } else {
                setError('')
              };

            })
          }
      } 
    };
    
    
    

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {

      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Get the value of the form after the form filled
  const handleFormValueChange = (event) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  };


  // calculate Total Amount
  useEffect(() => {
    if (formData.send_amount) {

      setTimeout(() => {
        updateFormData((formData)=> ({
          ...formData,
          total_amount: parseFloat(formData.send_amount) + parseFloat(formData.transaction_fee)
        }))
      }, 3000);

    };

  }, [formData.send_amount, formData.send_currency])

  // Update the Transaction Fee after Selecting send amount and currency
  useEffect(() => {
    if (formData.send_amount && formData.send_currency) {
      updateFormData((formData)=> ({
        ...formData,
        transaction_fee: 10
      }))
    }
  }, [formData.send_amount, formData.send_currency])



  const renderStepForm = (step) => {
    switch (step) {
      case 0:
        return <HeadForm
               handleFormValueChange={handleFormValueChange}
               formData={formData}
               error={error}
            />;
      case 1:
        return <Step1Form 
                handleFormValueChange={handleFormValueChange}
                error={error}
           />;
      case 2:
        return <Step2Form 
                  handleFormValueChange={handleFormValueChange}
                  error={error}
               />;
      case 3:
        return <Step3Form 
                  handleFormValueChange={handleFormValueChange}
                  error={error}
              />;
    
      default:
        return null;
    }
  };


  return (
    <Main open={open}>
      <DrawerHeader />
      <div className="container my-4 " style={{ maxWidth: '50rem' }}>
        <div className="card shadow-lg rounded-lg" style={{ background: '#F0F8FF' , borderRadius:'5%'}}>
          <div className="card-body  " style={{ background: '#F0F8FF', borderRadius:'5%'}}>
            
            <Box sx={{ maxWidth: '100%' }}>
              <Container maxWidth="md" style={{ marginTop: '50px' }}>
                <Stepper activeStep={activeStep} orientation={matchesXS ? 'vertical' : 'horizontal'} >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                   
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={index} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Container>

              {activeStep === steps.length ? (
                <>
                  <Container maxWidth="md" style={{ marginTop: '50px' }}>
                    <Typography sx={{ mt: 2, mb: 1 }} variant='div'>
                      <p className="text-success">
                        Thank you for the Transaction! Your transaction is currently in pending, After approval from admin your amount will get credited to receiver account. 
                        We'll notify you once your Transfer Transaction has been approved.
                    </p>
                    </Typography>
                    
                  </Container>
                </>
              ) : (
                <>

                  {renderStepForm(activeStep)}

                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  <Container maxWidth="md" style={{ marginTop: '50px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                      <Box sx={{ flex: '1 1 auto' }} />

                      <Button onClick={handleNext} style={{width:'15rem',backgroundColor:"#1e88e5"}}>
                        {activeStep === steps.length - 1 ? 'Make Payment >' : 'Next >'}
                      </Button>
                    </Box>
                  </Container>

                </>
              )}
            </Box>
          </div>
        </div>
      </div>
    </Main>
  );
}