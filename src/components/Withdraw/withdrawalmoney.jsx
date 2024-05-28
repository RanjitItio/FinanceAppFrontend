import {Main, DrawerHeader} from '../Content';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';


const steps = ['Create Withdrawal', 'Confirm Withdrawal'];



function WithdrawalForm1({...props}) {

  

  const handlePaymentMethodChange = (event)=> {
    props.updatepaymentMethod(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('withdrawalmoneypaymentmethod', encoded_value)
      const expirationTime = 2 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('withdrawalmoneypaymentmethod')
        }, expirationTime);
    }
  };

  const handleCurrencyChange = (event)=> {
    props.updateCurrency(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('withdrawalmoneycurrency', encoded_value)
      const expirationTime = 2 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('withdrawalmoneycurrency')
        }, expirationTime);
    }
  };


  const handleAmountChange = (event)=> {
    props.updateAmount(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('withdrawalmoneyamount', encoded_value)

      const expirationTime = 2 * 60 * 1000;// 2 minutes in milliseconds

      setTimeout(() => {
          localStorage.removeItem('withdrawalmoneyamount')
      }, expirationTime);
    }
  };
  
  

  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Accumulated wallet funds can simply be withdrawn at any time, 
            to your paypal ID or bank account. Setting up the withdrawal 
            settings is must before proceeding to make a withdraw. 
      </small>
      <div style={{marginLeft: '8%', marginRight: '3%', marginTop: '6%'}}>

      <Grid container spacing={2}>
        <Grid item xs={12}>
            <FormControl size='small' 
                 sx={{
                    width:{xs:'90%', lg: '90%',
                    }}}>
                <InputLabel id="payment-method-select-label">Payment Method</InputLabel>
                <Select
                    labelId="payment-method-select-label"
                    id="payment-method-select"
                    value={props.paymentMethod}
                    label="Payment Method" 
                    onChange={handlePaymentMethodChange}
                >
                    <MenuItem value={'Paypal'}>Paypal</MenuItem>
                    <MenuItem value={"Bank"}>Bank</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        
        <Grid item xs={12}>
            <FormControl fullWidth size='small' 
                       sx={{ width:{xs:'90%', lg:'90%'},  
                             marginTop:{xs:'3%', lg: '2%'}}}>
                <InputLabel id="currency-select-label">Currency</InputLabel>
                <Select
                labelId="currency-select-label"
                id="currency-select"
                value={props.Currency}
                label="Currency"
                onChange={handleCurrencyChange}
                >
                    <MenuItem value={"GBP"}>GBP</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
                <FormHelperText><b>Fee</b> 5%+10 Total Fee:  55</FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField 
                id="amount" 
                label="Amount" 
                variant="outlined" 
                size='small' 
                sx={{width: '90%'}}
                onChange={handleAmountChange}
                />
        </Grid>
      </Grid>

      {props.error &&
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                {props.error}
        </Alert>
        }
    </div>
    </>
  )
};



function WithdrawalForm2() {
  const [userTypedCurrency, setUserTypedCurrency] = React.useState('');
  const [userTypedAmount, setUserTypedAmount] = React.useState('');
  const [userTypedPaymentMethod, setUserTypedPaymentMethod] = React.useState('');
  const [fees, setFees] = React.useState(1.5);
  const [totalFee, setTotalFee] = React.useState('');


  useEffect(()=> {
        const StoredCurrency = localStorage.getItem('withdrawalmoneycurrency');
        const StoredAmount = localStorage.getItem('withdrawalmoneyamount');
        const StoredPaymentMethod = localStorage.getItem('withdrawalmoneypaymentmethod');

    if(StoredCurrency) {
        const decodedCurrency = atob(StoredCurrency)
        setUserTypedCurrency(decodedCurrency);
    }
    if(StoredAmount) {
      const decoded_Amount = atob(StoredAmount)
      setUserTypedAmount(decoded_Amount);
    }
    if(StoredPaymentMethod) {
      const decod_value = atob(StoredPaymentMethod)
      setUserTypedPaymentMethod(decod_value);
    }
  }, [])

//   const handleChange = (event)=> {
//       setFees(event.target.value)
//   };


    useEffect(() => {
    if(userTypedAmount) {
      const TotalFeeAmount = (parseInt(userTypedAmount) + fees)
      setTotalFee(TotalFeeAmount)
    }
  }, [userTypedAmount])
  

  return(
    <>
    <small className='text-muted d-flex justify-content-center my-4' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Please take a look before you confirm. After the confirmation the administrator review the withdrawal 
            and fund amount to your Paypal or Bank account. 
    </small>

    <div style={{marginLeft: '2%', marginRight: '1%'}}>

      <p className='text-primary d-flex justify-content-center mb-1'>
        <b>Withdrawal Details</b>
      </p>
      <p className='text-primary d-flex justify-content-center mb-4'>
        <p>Payment method: {userTypedPaymentMethod}</p>
      </p>

      <div className='mx-4'>
        <div className='d-flex justify-content-between mb-2'>
          <small>Withdrawal Amount</small>
          <small>{userTypedCurrency} {userTypedAmount}</small>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <small>Fee</small>
          <small value={fees}>{userTypedCurrency} {fees}</small>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p><b>Total</b></p>
          <p><b>{userTypedCurrency} {totalFee}</b></p>
        </div>
      </div>
    </div>
    </>
  );
};




export default function WithdrawalMoneyForm({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  
  const [Currency, updateCurrency] = React.useState('');
  const [Amount, updateAmount] = React.useState('');
  const [paymentMethod, updatepaymentMethod] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  // {
  //   "currency": "Currency",
  //   "deposit_amount": Amount,
  //   "fee": 0,
  //   "total_amount": Amount,
  //   "payment_mode": "paymentMethod",
  //   "note": "string"
  // }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

        if (activeStep == 0) {
          if (!Currency || !Amount || !paymentMethod) {
            setError('Please fill all the above fields');
            return;
          }
        };
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;

    if (activeStep == 0) {
      if (!Currency || !Amount || !paymentMethod) {
        setError('Please fill all the above fields');
        return;
      }
      // else {
      //   newCompleted[activeStep] = true;
      //   setCompleted(newCompleted);
      // }
    } 
    axiosInstance.post(`api/v1/user/reset_passwd/`, {
      currency: Currency,
      deposit_amount: Amount,
      fee: 0,
      total_amount: Amount,
      payment_mode: paymentMethod,
      note: "string"
      
}).then((res) => {
  if(res.status == 200) {
      setTimeout(() => {
          // navigate('/')
          window.location.href = '/payout-payment/'
      }, 1000);
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);

    
      console.log(res);
      // console.log(res.data);
  }
//  localStorage.clear();
})
    
    // else {
    //     newCompleted[activeStep] = true;
    //     setCompleted(newCompleted);
    // }
    
  //   if (completedSteps() === totalSteps()) {
  //      navigate('/')
  //   }else {
  //     handleNext();
  //   }
  handleNext();
  };

  const handleReset = () => {
    // setActiveStep(0);
    // setCompleted({});
    navigate('/')
  };

  const renderForms = (step) => {
    switch(step){
      case 0:
        return <WithdrawalForm1
                Currency={Currency}
                updateCurrency={updateCurrency}
                Amount={Amount}
                updateAmount={updateAmount}
                paymentMethod={paymentMethod}
                updatepaymentMethod={updatepaymentMethod}
                error={error}
                setError={setError}
            />;
      case 1:
        return <WithdrawalForm2 />;
      default:
        return null;
    }
  }


  return (
    <Main open={open}>
    <DrawerHeader />

    {/* <Paper elevation={8}  
       sx={{height: '150%', display: 'flex', 
         justifyContent: 'center', border: '1px solid #808080', 
         marginLeft: {xs: '0%', sm: '7%'}, width: {xs: '100%', sm: '90%'}
         }}> */}
      
    <Box sx={{ width: {xs: '100%', sm: '80%', md: '50%', lg:'40%'}, 
               marginTop: {xs: '40px', sm: '1rem'},
               borderRadius: '20px',
               backdropFilter: 'blur( 20px )',
               boxShadow: '7px 7px 28px #aaaaaa, -7px -7px 28px #ffffff',
               marginLeft: {xs: '0%', sm: '10%', md:'25%'},
              //  background: 'url("/formBackgroundImage.jpg")',
              backgroundColor: '#E5E4E2',   
              height: {xs:'100%', sm: '120%'}
                }}>
      <p className='fs-3 d-flex justify-content-center my-1'>Withdrawal Money</p> <br />

      <Stepper nonLinear activeStep={activeStep} sx={{marginLeft: '4%'}}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            {/* <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
            </StepButton> */}
            <StepButton color="inherit">
                {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography variant='h1' sx={{ mt: 2, mb: 1 }}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                    Congatulation Your amount has been Withdrew successfully
              </Alert>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Dashboard</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>

            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}

            {renderForms(activeStep)}

            <Box 
                sx={{display: 'flex', marginTop:'9%', marginRight: '27%'}}>
              <Box sx={{ flex: '1 1 auto'}}/>
              
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                                     
                    <Button onClick={handleComplete} variant='contained'  
                         sx={{backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#0081CF',
                            '@media (max-width: 500px)': {
                                fontSize: '0.6rem' // Decrease font size on smaller screens
                            }
                         }} >
                    {completedSteps() === totalSteps() - 1
                      ? 'Confirm & Transfer'
                      : 'Confirm & Proceed'}
                  </Button>
                ))}
                
            </Box>
         </React.Fragment>
        )}
      </div>
    </Box>
    {/* </Paper> */}

    </Main>

  );
};



