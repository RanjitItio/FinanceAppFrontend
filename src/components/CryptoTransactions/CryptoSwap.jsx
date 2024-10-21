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
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axiosInstance from '../Authentication/axios';
import { useEffect } from 'react';




const steps                   = ['Provide Input', 'Confirm Details'];
const user_selected_wallet    = localStorage.getItem('UserSelectedWalletID')
const user_selected_wallet_id = parseInt(user_selected_wallet, 10)



// First Form
function Form1() {

    const [currencies, setCurrencies] = React.useState([]);
  
  
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
          You can deposit to your wallets using our popular 
          payment methods. Fill the details correctly & the amount you want to deposit.
        </small>
  
        <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '6%'}}>
  
        <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '20px' }} size="small">
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency-select"
              label="Currency"
              //   value={currency}
            //   onChange={handleCurrencyChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
  
              {currencies.map((curr)=> (
                  <MenuItem key={curr.id} value={curr.name}>
                    {curr.name}
                  </MenuItem>
              ))}
            </Select>
            <FormHelperText>Fee </FormHelperText>
          </FormControl>
  
          <TextField
            hiddenLabel
            id="amount"
            variant="filled"
            size="small"
            // value={amount}
            placeholder='Amount'
            sx={{marginTop: '10px', width: '95%', marginLeft: '10px'}}
            // onChange={handleAmountChange}
          />
  
          <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '30px' }} size="small">
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method-select"
            //   value={paymentMethod}
              label="Payment Method"
            //   onChange={handlePaymentMethodChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Stripe'}>Stripe</MenuItem>
              <MenuItem value={'Bank'}>Bank</MenuItem>
              <MenuItem value={'Paypal'}>Paypal</MenuItem>
            </Select>
            &nbsp;
            {/* {error && <Alert severity="error">{error}</Alert>} */}
          </FormControl>
  
        </div>
      </>
  
    );
};



// Second Form
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
                <p>5 USD</p>
            </div>
            <hr className='mb-3'/>
          </div>
  
          <div className="d-flex justify-content-between">
              <p>Fee(10%)</p> 
              <p>1 USD</p>
          </div>
          <hr className='mb-4'/>
  
          <div className="d-flex justify-content-between">
            <p><b>Total</b></p> <p><b>6 USD</b></p>
          </div>
          <hr className='mb-4'/>
        </div>
  
        <Alert severity="error">Error</Alert>
      </>
  
    );
};




/// Buy Crypto for user
export default function CryptoSwap({open}) {

    const navigate = useNavigate()  
    const [activeStep, setActiveStep] = React.useState(0);  // Currenct step
    const [completed, setCompleted]   = React.useState({}); // Completed step

    const [currency, setCurrency]             = React.useState('');     // Selected Currency value
    const [paymentMethod, setPaymentMethod]   = React.useState('');  // Payment Mode
    const [amount, setAmount]                 = React.useState('');    // Amount
    const [error, setError]                   = React.useState('');      // Error Message
    const [totalAamount, setTotalAmount]      = React.useState('');  // Total amount
    const [transactionFee, setTransactionFee] = React.useState(0.00);

    
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

            axiosInstance.post(`api/v1/user/deposit/`, {
                currency: currency,
                deposit_amount: amount,
                fee: transactionFee,
                total_amount: totalAamount,
                selected_wallet: user_selected_wallet_id,
                payment_mode: paymentMethod,

            }).then((res)=> {
                // console.log(res)

                }).catch((error)=> {
                    console.log(error)
                })
        };
    };

    const handleReset = () => {
        navigate('/')
    };


    // Swicth between forms
    const renderForms = (step) => {
        switch(step){
        case 0:
            return <Form1
                />;
        case 1:
            return <Form2
                      
                    />;
        default:
            return null;
        }
    };




    return (
      <Main open={open}>
        <DrawerHeader />
            <Box sx={{ 
                    width: {xs: '100%', sm: '50%'},
                    marginTop: {xs: '40px', sm: '1rem'},
                    marginLeft: {xs: '0%', sm: '20%'},
                    background: '#F0F8FF',
                    backdropFilter: 'blur( 20px )',
                    boxShadow: '7px 7px 9px #5a5a5a, -7px -7px 9px #ffffff',
                    borderRadius: '5%',
                    height: {xs:'100%', sm: '120%'}
                    }}
                    >
                <p className='fs-2 d-flex justify-content-center'>Swap Crypto</p> <br />

                <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit">
                        {label}
                    </StepButton>
                    </Step>
                ))}
                </Stepper>


                <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                    <Typography variant='div' sx={{ mt: 2, mb: 1 }}>
                        <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                            Thank you for your deposit! Your transaction is currently in pending, After approval from admin your amount will get deposited to your account. 
                            We'll notify you once your deposit has been approved.
                        </Alert>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Go back to dashboard</Button>
                    </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>


                    {renderForms(activeStep)}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop:'5%', justifyContent:'center' }}>
                        {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                Step {activeStep + 1} already completed
                            </Typography>
                            ) : (
                            <Button onClick={handleComplete} variant='outlined' 
                                sx={{marginRight: '4%', marginTop: '3%'}}
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
