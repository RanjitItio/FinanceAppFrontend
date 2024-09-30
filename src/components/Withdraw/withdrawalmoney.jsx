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
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import { Button as JoyButton, Divider } from '@mui/joy';



const steps = ['Create Withdrawal', 'Confirm Withdrawal'];




// First step Form
function WithdrawalForm1({...props}) {
  const [currencies, setCurrencies] = useState([])

  // Method To get Selected Wallet Currency
  const handleWalletCurrencyChange = (event)=> {
    props.updateWalletCurrency(event.target.value)
  };

  // Method To get Withdrawal Currency
  const handleWithdrawalCurrencyChange = (event)=> {
    props.updateWithdrawalCurrency(event.target.value)
  };

   
  // Method to get withdrawal Amount
  const handleAmountChange = (event)=> {
    props.updateAmount(event.target.value)
  };


   // Fetch all the available currency from API
   useEffect(() => {
    axiosInstance.get(`api/v2/currency/`).then((res)=> {
      // console.log(res.data.currencies)
      if (res.data && res.data.currencies){
          setCurrencies(res.data.currencies)
      }

    }).catch((error)=> {
      console.log(error.response)
    });

  }, []);
  
  

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
                <InputLabel id="payment-method-select-label">Wallet Currency</InputLabel>
                <Select
                    id="wallet-currency-select"
                    value={props.walletCurrency}
                    label="Wallet Currency" 
                    onChange={handleWalletCurrencyChange}
                >
                    {currencies.map((curr)=> (
                      <MenuItem key={curr.id} value={curr.name}>
                        {curr.name}
                      </MenuItem>
                  ))}
                </Select>
            </FormControl>
        </Grid>
        

        <Grid item xs={12}>
            <FormControl fullWidth size='small' 
                       sx={{ width:{xs:'90%', lg:'90%'},  
                             marginTop:{xs:'3%', lg: '2%'}}}>
                <InputLabel id="currency-select-label">Withdrawal Currency</InputLabel>
                <Select
                  id="withdrawal-currency-select"
                  value={props.withdrawalCurrency}
                  label="Withdrawal Currency"
                  onChange={handleWithdrawalCurrencyChange}
                >
                    {currencies.map((curr)=> (
                      <MenuItem key={curr.id} value={curr.name}>
                        {curr.name}
                      </MenuItem>
                  ))};
                </Select>
                <FormHelperText><b>Fee</b> 5% of Total Amount</FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField 
                id="amount" 
                label="Withdrawal Amount" 
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


// Second Form
function WithdrawalForm2({...props}) {

  return(
    <>
    <small className='text-muted d-flex justify-content-center my-4' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Please take a look before you confirm. After the confirmation the administrator review the withdrawal 
            and fund amount to your Paypal or Bank account. 
    </small>

    <Box sx={{ marginLeft: '2%', marginRight: '1%' }}>
        <Typography
          variant="h6"
          color="primary"
          align="center"
          sx={{ mb: 1 }}
        >
          <b>Withdrawal Details</b>
        </Typography>

        <Typography
          variant="body1"
          color="primary"
          align="center"
          sx={{ mb: 4 }}
        >
          Selected Wallet: {props.walletCurrency}
        </Typography>

        <Box sx={{ mx: 4 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2">Withdrawal Amount</Typography>

            <Typography variant="body2">
              {props.withdrawalCurrency} {props.Amount}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2">Fee</Typography>

            <Typography variant="body2">
              {props.withdrawalCurrency} {props.fees.toFixed(3)}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1">
              <b>Total</b>
            </Typography>

            <Typography variant="body1">
              <b>{props.withdrawalCurrency} {parseFloat(props.Amount) + parseFloat(props.fees)}</b>
            </Typography>
          </Box>
        </Box>
      </Box>

      {props.error &&
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                {props.error}
        </Alert>
        }
    </>
  );
};



// Withdrawal Money
export default function WithdrawalMoneyForm({open}) {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);  // Currenct Step State
  const [completed, setCompleted]   = useState({}); // Completed Step
  
  const [withdrawalCurrency, updateWithdrawalCurrency] = useState('');  // Withdrawal Currency State
  const [Amount, updateAmount]                         = useState('');  // Withdrawal Amount State
  const [walletCurrency, updateWalletCurrency]         = useState('');  // Wallet Currency State
  const [error, setError]                              = useState('');  // Error Message State
  const [fees, setFees]                                = useState('');  // Fees

 
  // Calculate total Steps
  const totalSteps = () => {
    return steps.length;
  };
  
  // Completed Steps
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  // Check for Last step
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  // Check all steps completed or not
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  // Caluculate Fees
  useEffect(() => {
    if (Amount){
       let calculated_fees = (parseFloat(Amount) / 100) * 5
       setFees(calculated_fees)
    }
  }, [Amount]);
  

  // Redirect to Next Step
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

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
      if (!withdrawalCurrency || !Amount || !walletCurrency) {
        setError('Please fill all the above fields');

      } else {
        setError('')
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };

    } else {

      axiosInstance.post(`/api/v5/user/fiat/withdrawal/`, {
        withdrawalAmount: parseFloat(Amount),
        withdrawalCurrency: withdrawalCurrency,
        wallet_currency: walletCurrency,
        fee: parseFloat(fees)

      }).then((res)=> {
        // console.log(res)

        if(res.status === 200 && res.data.success == true) {
            setError('')
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handleNext();
        }

      }).catch((error)=> {
        // console.log(error)

        if (error.response.data.message === 'Do not have Sufficient balance in Wallet') {
            setError('Do not have sufficient balance in Wallet')

            setTimeout(() => {
              setError('')
            }, 2000);

        } else if (error.response.data.message === 'Invalid Wallet Currency') {
            setError('Invalid Wallet Currency') 

            setTimeout(() => {
              setError('')
            }, 2000);

        } else if (error.response.data.message === 'User wallet does not exists') {
            setError('User wallet does not exist')

            setTimeout(() => {
              setError('')
            }, 2000);

        } else if (error.response.data.message === 'Invalid withdrawal Currency') {
            setError('Invalid withdrawal Currency')

            setTimeout(() => {
              setError('')
            }, 2000);

        } else {
          setError('')
        };
      })
    };
  };


  // Reset
  const handleReset = () => {
    navigate('/')
  };



  const renderForms = (step) => {
    switch(step){
      case 0:
        return <WithdrawalForm1
                withdrawalCurrency={withdrawalCurrency}
                updateWithdrawalCurrency={updateWithdrawalCurrency}
                Amount={Amount}
                updateAmount={updateAmount}
                walletCurrency={walletCurrency}
                updateWalletCurrency={updateWalletCurrency}
                error={error}
                setError={setError}
            />;
      case 1:
        return <WithdrawalForm2 
                  walletCurrency={walletCurrency}
                  withdrawalCurrency={withdrawalCurrency}
                  Amount={Amount}
                  fees={fees}
                  error={error}
              />;
      default:
        return null;
    }
  };


  return (
    <Main open={open}>
      <DrawerHeader />

        <Box sx={{ 
                width: {xs: '100%', sm: '80%', md: '50%', lg:'40%'}, 
                marginTop: {xs: '40px', sm: '1rem'},
                borderRadius: '5%',
                background: '#F0F8FF',
                backdropFilter: 'blur( 20px )',
                boxShadow: '7px 7px 9px #5a5a5a, -7px -7px 9px #ffffff',
                marginLeft: {xs: '0%', sm: '10%', md:'25%'}, 
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
            {/* Completed Step */}
            {allStepsCompleted() ? (
              <React.Fragment>

                <Typography variant='h1' sx={{ mt: 2, mb: 1 }}>
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                        Congatulation Your Withdrawal Request has been raised successfully, Please wait for Admin Approval
                  </Alert>
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent:'center' }}>
                  <JoyButton onClick={handleReset}>Dashboard</JoyButton>
                </Box>

              </React.Fragment>
            ) : (
              <React.Fragment>

                {renderForms(activeStep)}
                <Box sx={{display: 'flex', marginTop:'8%', justifyContent:'center'}}>
                  
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                                        
                        <JoyButton onClick={handleComplete} 
                            sx={{color: 'primary',
                                '@media (max-width: 500px)': {
                                    fontSize: '0.6rem' 
                                }
                            }} >
                        {completedSteps() === totalSteps() - 1
                          ? 'Confirm & Proceed'
                          : 'Proceed'}
                      </JoyButton>
                    ))}
                </Box>
            </React.Fragment>
            )}
          </div>
        </Box>

    </Main>

  );
};



