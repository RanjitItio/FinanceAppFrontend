import {Main, DrawerHeader} from '../Content';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axiosInstance from '../Authentication/axios';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';
import StepLabel from '@mui/material/StepLabel';
import InputAdornment from '@mui/material/InputAdornment';



const steps                   = ['Step 1', 'Step 2'];
const user_selected_wallet    = localStorage.getItem('UserSelectedWalletID')
const user_selected_wallet_id = parseInt(user_selected_wallet, 10)


/// Currency Icon inside Amount fileds
const getCurrencyIcon = (currency)=> {
     if (currency) {
      switch (currency) {
        case 'USD':
          return '$'
        case 'INR':
          return '₹'
        case 'GBP':
          return '£'
        case 'EUR':
          return '€'
      
        default:
          return '$'
      }
     }
}


// First Form
function Form1({currency, setCurrency, paymentMethod, setPaymentMethod, amount, setAmount, setError, error, setTransactionFee}) {

  const [currencies, setCurrencies] = React.useState([]);  // Currencies
  const [chargedFee, SetChargedFee] = React.useState(0);  // Fee for Deposit Transaction


  // Get selected Currency value
  const handleCurrencyChange = (event)=> {

    if(!event.target.value) {
      setError('Please fill all the above fields')
    }else {
      setError('')
      setCurrency(event.target.value);
    }
  };


  // Capture selected payment method
  const handlePaymentMethodChange = (event)=> {

    if(!event.target.value) {
      setError('Please fill all the above fields')

    }else {
      setError('')
      setPaymentMethod(event.target.value)
    }
  };


    // Selected Amount
    const handleAmountChange = (event)=> {
      const {name, value} = event.target;

      if (value === '') {
        setError('')
        setAmount(value)
      } else if (Number(value) === 0 || Number(value) < 0){
          setError('Please type valid number')
      } else if (/^\d*\.?\d*$/.test(value) || value === '' || Number(value) > 0) {
        setError('');
        setAmount(value);
      } else {
        setError('Please type valid number')
      }
    };


    // Fetch all the available currency from API
    useEffect(() => {
      axiosInstance.get(`api/v2/currency/`).then((res)=> {
        // console.log(res.data.currencies)
        if (res.data && res.data.currencies){
            setCurrencies(res.data.currencies)
        }

      }).catch((error)=> {
        // console.log(error.response)
      });

    }, []);

    // Get assigned fee for Fiat Deposit Transaction
    useEffect(() => {
      if (amount) {
        axiosInstance.post(`/api/v2/charged/fee/`, {
           fee_type: 'Fiat Deposit',
           amount: amount

        }).then((res)=> {

           if (res.status === 200 && res.data.success === true){ 
               SetChargedFee(res.data.fee)
               setTransactionFee(res.data.fee)
           }
        })
      } else {
        SetChargedFee(0)
        setTransactionFee(0)
      }
   }, [amount]);



  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
        You can deposit to your wallets using our popular 
        payment methods. Fill the details correctly & the amount you want to deposit.
      </small>

      <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '6%'}}>

        <Grid container>
           <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '20px' }} size="small">
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Select
                    id="currency-select"
                    value={currency}
                    label="Currency"
                    onChange={handleCurrencyChange}
                  >
                    {currencies.map((curr)=> (
                        <MenuItem key={curr.id} value={curr.name}>
                          {curr.name}
                        </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Fee: {chargedFee ? chargedFee.toFixed(3) : 0} {currency}</FormHelperText>
              </FormControl>
           </Grid>
        </Grid>

        <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={6} sx={{mt:1.2}}>
              <Button 
                fullWidth 
                variant="contained"
                disableElevation
                sx={{
                  justifyContent:'flex-start',
                  padding:1.1,
                  ml:1,
                  width:{xs:'95%', sm:'100%'}
                }}
                >
                  Amount:
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <TextField
                  hiddenLabel
                  id="amount"
                  variant="filled"
                  size="small"
                  value={amount}
                  placeholder='Amount'
                  sx={{ marginTop: '10px', width: '95%', marginLeft: '10px'}}
                  onChange={(e)=> handleAmountChange(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getCurrencyIcon(currency)}
                      </InputAdornment>
                    ),
                  }}
                />
            </Grid>
        </Grid>

        <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '30px' }} size="small">
          <InputLabel id="payment-method-label">Payment Method</InputLabel>
          <Select
            labelId="payment-method-label"
            id="payment-method-select"
            value={paymentMethod}
            label="Payment Method"
            onChange={handlePaymentMethodChange}
          >
            <MenuItem value={'Stripe'}>Stripe</MenuItem>
            <MenuItem value={'Bank'}>Bank</MenuItem>
            <MenuItem value={'Paypal'}>Paypal</MenuItem>
          </Select>
            &nbsp;
          {error && <Alert severity="error">{error}</Alert>}
        </FormControl>

      </div>
    </>

  );
};


function Form2({...props}) {

  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3'>
        Check your deposit information before confirmation.
      </small>

      <div style={{marginLeft: '6%', marginRight: '6%', marginTop: '8%'}}>
        <div className="my-4">
          <div className="d-flex justify-content-between">
              <p>Deposit Amount</p> 
              <p>{props.currency} {props.amount}</p>
          </div>
          <hr className='mb-3'/>
        </div>

        <div className="d-flex justify-content-between">
            <p>Fee</p> 
            <p>{props.currency} {props.transactionFee.toFixed(3)}</p>
        </div>
        <hr className='mb-4'/>

        <div className="d-flex justify-content-between">
          <p><b>Total</b></p> <p><b>{props.currency} {props.totalAamount}</b></p>
        </div>
        <hr className='mb-4'/>
      </div>

      {props.error && <Alert severity="error">{props.error}</Alert>}
    </>

  );
};



// Deposit Money
export default function DepositForm({open}) {

  const navigate = useNavigate()  
  const [activeStep, setActiveStep] = React.useState(0);  // Currenct step
  const [completed, setCompleted]   = React.useState({}); // Completed step

  const [currency, setCurrency]           = React.useState('');     // Selected Currency value
  const [paymentMethod, setPaymentMethod] = React.useState('');  // Payment Mode
  const [amount, setAmount]               = React.useState('');    // Amount
  const [error, setError]                 = React.useState('');      // Error Message
  const [totalAamount, setTotalAmount]    = React.useState('');  // Total amount
  const [transactionFee, setTransactionFee] = React.useState(0.00);  // Transaction Fee

   
  // Total Steps
  const totalSteps = () => {
    return steps.length;
  };

   // Success step
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  // Last step check
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  // All step completed check
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };


   // Switch to Next step
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

        if (activeStep == 0) {
          if (!currency || !amount || !paymentMethod) {
            setError('Please fill all the above fields');
            return;
          }
        };
    setActiveStep(newActiveStep);
  };

  // Switch to previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

   
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // Final Step method
  const handleComplete = () => {
    const newCompleted = completed;

    if (activeStep == 0) {
      if (!currency || !amount || !paymentMethod) {
        setError('Please fill all the above fields');
        return;

      } else {
        setError('')
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };

    } else {
      // console.log(totalAamount)
      // console.log(amount)
      axiosInstance.post(`api/v1/user/deposit/`, {
        currency: currency,
        deposit_amount: parseFloat(amount),
        fee: transactionFee,
        total_amount: totalAamount,
        selected_wallet: user_selected_wallet_id,
        payment_mode: paymentMethod,

      }).then((res)=> {
        // console.log(res)

          if(res.data.msg == 'Deposit successful') {
              newCompleted[activeStep] = true;
              setCompleted(newCompleted);
              handleNext();

          } else if(res.data.msg == 'Token has expired'){
              setError("Session has expired please try to login")

          } else if(res.data.msg == 'Invalid token') {
              setError("Invalid Session please try to login")
          } else {
            setError('')
          };

        }).catch((error)=> {
          // console.log(error)

          if(error.response.data.msg == 'Invalid currency'){
              setError("Requested Currency is not available")

          } else if(error.response.data.msg == 'Wallet not found') {
              setError("Donot have wallet please create your wallet")

          } else if(error.response.data.msg == 'Error depositing funds') {
              setError("Error while depositing money")

          } else if(error.response.data.msg == 'Wallet not found') {
              setError("Wallet is not available please create a wallet first")

          } else if(error.response.data.msg == 'Authentication Failed Please provide auth token') {
              setError("Authentication Failed")

          } else if(error.response.data.msg == 'Authentication Failed') {
              setError("Authentication error")

          } else if(error.response.data.msg == 'Currency error') {
              setError("Error while fetching the value of currency")

          } else if(error.response.data.msg == 'Wallet error') {
              setError("Wallet error")

          } else if(error.response.data.msg == 'Error depositing funds') {
              setError("Server Error")
          } else {
              setError('')
          };
        })
    };
    
    // console.log(amount)
    // if (completedSteps() === totalSteps()) {
    //    navigate('/')
    // }else {
    //  handleNext();
    // }
  };

  const handleReset = () => {
    // setActiveStep(0);
    // setCompleted({});
    navigate('/')
  };


  // Swicth between forms
  const renderForms = (step) => {
    switch(step){
      case 0:
        return <Form1
                  currency={currency}
                  setCurrency={setCurrency}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  amount={amount}
                  setAmount={setAmount}
                  error={error}
                  setError={setError}
                  transactionFee={transactionFee}
                  setTransactionFee={setTransactionFee}
              />;
      case 1:
        return <Form2 
                  error={error}
                  setError={setError}
                  totalAamount={totalAamount}
                  amount={amount}
                  currency={currency}
                  transactionFee={transactionFee}
                />;
      default:
        return null;
    }
  };


  // Calculate the transaction Fee and the Total amount
  React.useEffect(() => {
    if(transactionFee && amount) {
      const TotalAmount = (parseFloat(amount) + parseFloat(transactionFee))
      setTotalAmount(TotalAmount)
    }
  }, [transactionFee, amount]);



  return (
    <Main open={open}>
      <DrawerHeader />
      <Box sx={{ 
              width: {xs: '100%', sm: '80%', md:'50%'},
              marginTop: {xs: '40px', sm: '1rem'},
              marginLeft: {xs: '0%', sm: '10%', md:'20%'},
              background: '#F0F8FF',
              backdropFilter: 'blur( 20px )',
              boxShadow: '7px 7px 9px #5a5a5a, -7px -7px 9px #ffffff',
              borderRadius: '5%',
              height: {xs:'100%', sm: '98%'},
              overflowY:'auto'
              }}
            >
        <p className='fs-3 d-flex justify-content-center' style={{paddingTop:15}}>Deposit Money</p> <br />

        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography variant='div' sx={{ mt: 2, mb: 1 }}>
                {/* All steps completed - you&apos;re finished */}
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                      Thank you for your deposit! Your transaction is currently in pending, After approval from admin your amount will get deposited to your account. 
                      We'll notify you once your deposit has been approved.
                </Alert>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* <Button onClick={handleReset}>Reset</Button> */}
                <Button onClick={handleReset}>Go back to dashboard</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>


              {renderForms(activeStep)}

              <Box sx={{ display: 'flex', flexDirection: 'row', mb: {xs:2, sm:2, md:0}, marginTop:'3%', justifyContent:'center' }}>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete} variant='contained' 
                        sx={{marginRight: '4%'}}
                      >
                        {completedSteps() === totalSteps() - 1
                          ? 'Confirm & Deposit'
                          : 'Confirm & Proceed'}
                      </Button>
                    ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </Main>
  );
};



