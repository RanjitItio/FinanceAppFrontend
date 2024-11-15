import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Container, MenuItem, InputLabel, useMediaQuery, useTheme } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios'
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import CurrencyAPI from '@everapi/currencyapi-js';


const freeCurrencyAPIKey = import.meta.env.VITE_FREE_CURRENCY_API
const steps = ['Payment Information','Recipient Details', 'Recipient Payment Details', 'Recipient Address'];


// First Step Form
function HeadForm({...props}) {

  const [currencies, setCurrencies]                          = useState([])   // All Currencies data
  const [senderCurrencyValue, updateSenderCurrencyValue]     = useState('');  // Sender Currency
  const [receiverCurrencyValue, updateReceiverCurrencyValue] = useState('');  // Receiver Currency
  const [sendingPurposeValue, updateSendingPurposeValue]     = useState('')  // Sending Purpose
  const [convertedAmount, setConvertedAmount]                = useState('');  // Currency Conversion Value
  const [currencyConversion, setCurrencyConversion]          = useState(0);  // Currency conversion amount using free API
  
  
   // Call API to convert the Currency Value
   useEffect(() => {
        if (props.formData.receiver_currency, props.formData.send_currency) {
            const freecurrencyapi = new Freecurrencyapi(freeCurrencyAPIKey);
            freecurrencyapi.latest({
              base_currency: props.formData.send_currency,
              currencies: props.formData.receiver_currency 
  
          }).then(response => {
              // console.log(response);
              setCurrencyConversion(response.data[props.formData.receiver_currency])
          });
        }

   }, [props.formData.receiver_currency, props.formData.send_currency]);


   // Calculated Converted amount of receiver
   useEffect(() => {
        const amount_to_convert = parseFloat(props.formData.send_amount)

       if (props.formData.send_amount, currencyConversion) {
           const calculatedAmount = parseFloat(currencyConversion) * amount_to_convert
           setConvertedAmount(calculatedAmount)
       }
   }, [props.formData.send_amount, currencyConversion]);

   

  /// Fetch all available currencies
  useEffect(() => {
    axiosInstance.get(`/api/v2/currency`).then((res) => {
        // console.log(res.data.currencies)
        if (res.data.currencies) {
          setCurrencies(res.data.currencies)
        }

    }).catch((error) => {
        // console.log(error.response)

    })
  }, []);

  
  const handleUpdateSenderCurrencyValue = (event) => {
      updateSenderCurrencyValue(event.target.value)
  };

  const handleUpdateReceiverCurrencyValue = (event) => {
      updateReceiverCurrencyValue(event.target.value)
  };

  const handleSendingPurposeValue = (event)=> {
      updateSendingPurposeValue(event.target.value)
  };

  // Update typed amount
  const handleTransferAmountChange = (e)=> {
    const { name, value } = e.target;

    console.log('length', value.length)

    if (value === '') {
      props.setError('')
      props.updateFormData((prevData)=> ({
        ...prevData,
        [name]: value
      }));

    } else if (Number(value) === 0 || Number(value) < 0) {
        props.setError('Amount should be greater than 0')

    } else if (value.length > 8) {
      props.setError('Amount should be less than 8 digit')

    } else if (/^\d*\.?\d*$/.test(value) || value === '' || Number(value) > 0){
        props.setError('')
        props.updateFormData((prevData)=> ({
          ...prevData,
          [name]: value
        })) 
      
    } else {
        props.setError('Please enter valid amount')
    }
};


return (
    <>
      <Form method='post'>
        <Row className="mb-3" style={{marginTop:20}}>
          <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12 '>
            <TextField fullWidth 
                placeholder="Enter Amount" 
                value={props.formData.send_amount}
                onChange={handleTransferAmountChange}
                variant="outlined"
                name='send_amount'
                />
          </div>

          <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
            <FormControl fullWidth>
              <InputLabel id="send_currency">Currency</InputLabel>
              <Select
                fullWidth
                label='Currency'
                value={senderCurrencyValue}
                name='send_currency'
                onChange={(event)=> {handleUpdateSenderCurrencyValue(event); props.handleFormValueChange(event)}}
              >
                {currencies.map((currency, index) => (
                      <MenuItem value={currency.name} key={index}>{currency.name}</MenuItem>
                ))}
              </Select>
            </FormControl>                                                                                                                                                           
          </div>
        </Row>
        {/* &nbsp; */}

        <Row className="mb-3">
          <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
            <TextField 
                fullWidth 
                autoFocus
                disabled
                type="number" 
                variant="outlined" 
                style={{color: 'white'} } 
                name='receiver_amount'
                label='Recipient will receive'
                value={convertedAmount}
              />
          </div>

          <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
            <FormControl fullWidth>
              <InputLabel id="receipient_currency">Receiver Currency</InputLabel>
              <Select
                fullWidth
                label="Recipient Currency"
                value={receiverCurrencyValue}
                name='receiver_currency'
                onChange={(event) => {handleUpdateReceiverCurrencyValue(event); props.handleFormValueChange(event); }}
              >
                {currencies.map((currency, index) => (
                      <MenuItem value={currency.name} key={`${currency.name}-${index}`}>{currency.name}</MenuItem>
                ))}

              </Select>
            </FormControl>
          </div>

        </Row>


        &nbsp;
        <FormControl fullWidth>
          <InputLabel id="sending_purpose">Sending Purpose</InputLabel>
          <Select fullWidth 
                  labelId='sending_purpose'
                  label="Sending Purpose"
                  name='sending_purpose'
                  onChange={(event)=> {props.handleFormValueChange(event); handleSendingPurposeValue(event)}}
                  value={sendingPurposeValue}
                  >
            <MenuItem value={"Expenses"}>Expenses</MenuItem>
            <MenuItem value={"Insurance"}>Insurance</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>


            <hr />
              <div style={{marginTop:5}}>
                <div className="d-flex justify-content-between" style={{marginBottom:-15}}>
                  <p className=''><b>Send Amount</b></p>
                  <p className=''><b>Payble Fee</b></p>
                  <p className=''><b>Total Amount</b></p>
                </div>

                <div className="d-flex justify-content-between">
                  <p><b>{props?.formData.send_amount || 0} {props.formData?.send_currency || ''}</b></p>
                  <p><b>{props.chargedFee ? props.chargedFee.toFixed(2) : 0} {props.formData?.send_currency || ''}</b></p>
                  <p><b>{props.formData.total_amount ? props.formData.total_amount.toFixed(3) : 0} {props.formData?.send_currency || ''}</b></p>
                </div>
              </div>
            <br />

            {props.error && <p style={{color:'red', display:'flex', justifyContent:'center'}}>{props.error}</p>}
      </Form>

    </>
  )
}



//// Second Form
function Step1Form({...props}) {
  
  ///// Update Mobile Number
  const handleMobileNumberChange = (event)=> {
    const {name, value} = event.target;

    if (value === '') {
        props.updateFormData((prevData)=> ({
          ...prevData,
          [name]: value
      }))

    } else if (Number(value) < 0){
        props.setError('Please type valid number')

    } else if (/^\d+$/.test(value) || value === '' || Number(value) > 0) {
          props.setError('')
          props.updateFormData((prevData)=> ({
              ...prevData,
              [name]: value
          }))
    } else {
      props.setError('Please type valid number')
    }
  };



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

          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
                      label="Mobile Number" 
                      variant="outlined" 
                      value={props.formData.receiver_mobile_number}
                      onChange={(event)=> {handleMobileNumberChange(event)}} 
                      name='receiver_mobile_number'
                      />
          </Grid>

        </Grid>
      </form>

      {props.error && <p style={{color:'red', display:'flex', justifyContent:'center', marginTop:10}}>{props.error}</p>}
    </Container>

  );
}



//// Third Form
function Step2Form({...props}) {
  const [paymentOption, setPaymentOption] = React.useState('');
  
  // Payment option change
  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  // Receiver Email address
  const handleReceiverEmailChange = (event)=> {
       const { name, value } = event.target;

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       if (emailRegex.test(value) || value === '') {

           props.setError('')
           props.updateFormData((prevData)=> ({
            ...prevData,
            [name]: value
           }))

       } else {
          props.setError('Please provide valid email address')
       }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form method='post'>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12}>
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
            
          </Grid>

          {paymentOption !== 'Wallet' ? (
            <>
                <Grid item xs={12} sm={6} >
                  <TextField 
                        fullWidth 
                        label="Bank Name" 
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
          ) : (
            <Grid item xs={12} sm={6} md={6}>
              <TextField 
                  fullWidth 
                  size='small'
                  label="Recipient Email" 
                  variant="outlined" 
                  onChange={(event)=> {handleReceiverEmailChange(event)}} 
                  name='receiver_email'
                  />
          </Grid> 
          )}
        
        </Grid>

        {props.error && <p style={{color:'#c34a36'}}>{props.error}</p>}
      </form>

    </Container>
  );
}


/// Fourth step form
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
};






// Send Money Form
export default function StepWisePaymentForm({open}) {

  // All Form fields
  const initialFormData = {
    send_amount: '',
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


  const theme                       = useTheme();
  const matchesXS                   = useMediaQuery(theme.breakpoints.down('sm'));  
  const [activeStep, setActiveStep] = React.useState(0);  // Currenct Step
  const [skipped, setSkipped]       = React.useState(new Set());
  const [formData, updateFormData]  = React.useState(initialFormData);  // Form Data
  const [error, setError]           = React.useState('');  // Error Message
  const [chargedFee, SetChargedFee] = React.useState(0);  // Fee for Transfer Transaction
  const [emailCheck, setEmailCheck] = React.useState(false);   // Email authentication for wallet transfer
  const [emailCheckMsg, setEmailCheckMsg] = React.useState(''); 
  const [WalletBalanceChecK, setWalletBalanceCheck]       = useState(false);
  const [WalletbalanceCheckMsg, setWalletBalanceCheckMsg] = useState('');  // Wallet Balance check message


  /// Check user email address existence
  useEffect(() => {
    if (formData.receiver_email && formData.receiver_currency) {
        axiosInstance.post(`/api/v1/authenticate/email/`, {
          email: formData.receiver_email,
          currency: formData.receiver_currency

        }).then((res)=> {
            
          if(res.status === 200 && res.data.success === true) {
              setEmailCheck(false)
          } else {
            setEmailCheck(true)
          }

        }).catch((error)=> {

             if (error.response.data.message === 'Email address not found') {
                setEmailCheck(true);
                setEmailCheckMsg('Email address does not exists')
             } else if (error.response.data.message === 'User wallet not found') {
                setEmailCheck(true)
                setEmailCheckMsg('Receiver wallet does not exists')
             } else if (error.response.data.message ===  'Invalid Receiver Currency') {
                setEmailCheck(true);
                setEmailCheckMsg('Invalid Receiver Currency')
             }
        })
    }
  }, [formData.receiver_email, formData.receiver_currency])
  
  

  /// Check user Wallet balance in first step
  useEffect(() => {

    if (formData.send_currency && formData.send_amount)  {

      axiosInstance.post(`/api/v1/user/wallet/balance/check/`, {
         sender_currency: formData.send_currency,
         send_amount: parseFloat(formData.send_amount)
 
      }).then((res)=> {
         // console.log(res)
 
         if (res.status === 200) {
           setWalletBalanceCheck(false);
           setWalletBalanceCheckMsg('');
         }
 
      }).catch((error)=> {
         //  console.log(error)
         if (error.response.data.message === 'Wallet does not exists for given currency') {
             setWalletBalanceCheck(true)
             setWalletBalanceCheckMsg('Wallet does not exists in Selected currency')
         } else if (error.response.data.message === 'Donot have sufficient balance in Wallet') {
             setWalletBalanceCheck(true)
             setWalletBalanceCheckMsg('Do not have sufficient balance in Wallet')
         }
 
      });
      
    }
  }, [formData.send_currency, formData.send_amount]);
  
  
  const isStepSkipped = (step) => {
     return skipped.has(step);
  };


  // Redirect to Next page
  const handleNext = () => {
    let newSkipped = skipped;

    // Check the first Step Validation
    if (activeStep === 0) {
          if (formData.send_amount === '' || formData.send_amount === 0) {
            setError('Please Enter amount')

          } else if (formData.send_currency === '') {
            setError('Please select send currency')

          } else if (formData.receiver_currency === '') {
            setError('Please select receiver currency')

          } else if (formData.sending_purpose === '') {
            setError('Please select sending purpose')

          } else if(WalletBalanceChecK) {
            setError(WalletbalanceCheckMsg);

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
      } else if (formData.rec_payment_mode === 'Wallet') {

        if (formData.receiver_email === '') {
            setError('Please provide email address');

        } else if (emailCheck) {
           setError(emailCheckMsg);

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
              send_amount:         parseFloat(formData.send_amount),
              fee:                 parseFloat(chargedFee),
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
              // console.log(error.response)

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
  
    

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {

  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  // Get the value of the form after the form filled
  const handleFormValueChange = (event) => {
    const { name, value } = event.target;

    updateFormData({
      ...formData,
      [name]: value
    })
  };


  // calculate Total Amount
  useEffect(() => {
    if (formData.send_amount && chargedFee) {

      setTimeout(() => {
        updateFormData((formData)=> ({
          ...formData,
          total_amount: (parseFloat(formData.send_amount) + parseFloat(chargedFee))
        }))
      }, 1000);
    };
  }, [formData.send_amount, chargedFee]);


  // Update the Transaction Fee for Fiat Transfer Transactions
  useEffect(() => {
    if (formData.send_amount) {
        axiosInstance.post(`/api/v2/charged/fee/`, {
          fee_type: 'Fiat Transfer',
          amount: parseFloat(formData.send_amount)

        }).then((res)=> {

            if (res.status === 200 && res.data.success === true){ 
                SetChargedFee(res.data.fee)
            }
        })
    } else {
      SetChargedFee(0)
    }
  }, [formData.send_amount]);



  const renderStepForm = (step) => {
    switch (step) {
      case 0:
        return <HeadForm
                handleFormValueChange={handleFormValueChange}
                formData={formData}
                error={error}
                setError={setError}
                chargedFee={chargedFee}
                updateFormData={updateFormData}
              />;
      case 1:
        return <Step1Form 
                handleFormValueChange={handleFormValueChange}
                error={error}
                formData={formData}
                updateFormData={updateFormData}
                setError={setError}
           />;
      case 2:
        return <Step2Form 
                  handleFormValueChange={handleFormValueChange}
                  error={error}
                  updateFormData={updateFormData}
                  setError={setError}
               />;
      case 3:
        return <Step3Form 
                  handleFormValueChange={handleFormValueChange}
                  error={error}
                  setError={setError}
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