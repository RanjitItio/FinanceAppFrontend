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
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';




function Form1({currency, setCurrency, paymentMethod, setPaymentMethod, amount, setAmount, setError, error}) {

  const handleCurrencyChange = (event)=> {
    setCurrency(event.target.value)
    if(!event.target.value) {
      setError('Please fill all the above fields')
    }else {
      setError('')

      localStorage.setItem('DepositCurrency', event.target.value)

      const expirytime = 2 * 60 * 1000

      setTimeout(() => {
          localStorage.removeItem('DepositCurrency')
      }, expirytime);
    }
  }

  const handlePaymentMethodChange = (event)=> {
    setPaymentMethod(event.target.value)
    if(!event.target.value) {
      setError('Please fill all the above fields')
    }else {
      setError('')
    }
  }

  const handleAmountChange = (event)=> {
    setAmount(event.target.value)
    if(!event.target.value) {
      setError('Please fill all the above fields')
    } else {
      setError('')

      localStorage.setItem('UsersDepositAmount', event.target.value)

      const depositexpirytime = 2 * 60 * 1000;

      setTimeout(() => {
        localStorage.removeItem('UsersDepositAmount')
      }, depositexpirytime);
    }
  }
//  console.log(error)


  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
        You can deposit to your wallets using our popular 
        payment methods. Fill the details correctly & the amount you want to deposit.
      </small>

    <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '20px' }} size="small">
        <InputLabel id="currency-label">USD</InputLabel>
        <Select
          labelId="currency-label"
          id="currency-select"
          value={currency}
          label="Age"
          onChange={handleCurrencyChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'EUR'}>EUR</MenuItem>
          <MenuItem value={'GBR'}>GBR</MenuItem>
          <MenuItem value={'ETH'}>ETH</MenuItem>
          <MenuItem value={'BTC'}>BTC</MenuItem>
        </Select>
        <FormHelperText>Fee (0.00+0.00) Total Fee: 0.00</FormHelperText>
      </FormControl>

        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
          value={amount}
          placeholder='Amount'
          sx={{marginTop: '10px', width: '95%', marginLeft: '10px'}}
          onChange={handleAmountChange}
        />

        <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '30px' }} size="small">
          <InputLabel id="payment-method-label">Payment Method</InputLabel>
          <Select
            labelId="payment-method-label"
            id="payment-method-select"
            value={paymentMethod}
            label="Payment Method"
            onChange={handlePaymentMethodChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Stripe</MenuItem>
            <MenuItem value={20}>Bank</MenuItem>
            <MenuItem value={30}>Paypal</MenuItem>
          </Select> 
          {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>}
        </FormControl>

    </>
  )
}


function Form2() {
  const [depositCurrency, setDepositCurrency] = React.useState('')
  const [userDepositAmount, setUserDepositAmount] = React.useState('')

  React.useEffect(() => {
       const GetCurrency = localStorage.getItem('DepositCurrency')
       setDepositCurrency(GetCurrency)

       const GetAmount = localStorage.getItem('UsersDepositAmount')
       setUserDepositAmount(GetAmount)
    }, [])

  return(
    <>
    <small className='text-muted d-flex justify-content-center my-3'>
      Check your deposit information before confirmation.
    </small>

    <div className="my-4">
      <div className="d-flex justify-content-between">
          <p>Deposit Amount Stripe</p> 
          <p>{depositCurrency} {userDepositAmount}</p>
      </div>
      <hr className='mb-3'/>
     </div>

    <div className="d-flex justify-content-between">
        <p>Fee</p> 
        <p>{depositCurrency} 1.02</p>
    </div>
     <hr className='mb-4'/>

    <div className="d-flex justify-content-between">
      <p><b>Total</b></p> <p><b>{depositCurrency} 13.02</b></p>
    </div>
    <hr className='mb-4'/>

    </>
  )
}

const steps = ['Create Deposit', 'Confirm your Deposit'];



export default function DepositForm({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [currency, setCurrency] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate()


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
          if (!currency || !amount || !paymentMethod) {
            setError('Please fill all the above fields');
            return;
          }
        }
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
      if (!currency || !amount || !paymentMethod) {
        setError('Please fill all the above fields');
        return;
      }else {
        setError('')

        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    } else {
        
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    }

    

    // if (completedSteps() === totalSteps()) {
    //    navigate('/')
    // }else {
    //  handleNext();
    // }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
          />;
      case 1:
        return <Form2 />;
      default:
        return null;
    }
  }


  return (
    <Main open={open}>
    <DrawerHeader />

    <Paper elevation={24}  sx={{height: '120%', display: 'flex', justifyContent: 'center', border: '1px solid #808080', width: {xs: '100%', sm: '85%'}, marginLeft: {xs: '0%', sm: '7%'}}}>
      
    <Box sx={{ width: {xs: '100%', sm: '40%'}, marginTop: {xs: '40px', sm: '1rem'} }}>
      <p className='fs-3 d-flex justify-content-center'>Deposit Money</p> <br />

      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
            </StepButton>
          </Step> 
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {/* All steps completed - you&apos;re finished */}
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                 Your Money has been deposited to your account successfully.
              </Alert>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>

            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}

            {renderForms(activeStep)}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
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
    </Paper>

    </Main>

  );
}



