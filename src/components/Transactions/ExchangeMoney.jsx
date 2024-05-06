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
import Textarea from './TextArea';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';



const steps = ['Setup Money', 'Confirm Exchange Money'];



function ExchangeMoneyForm1({...props}) {

  const [totalFee, setTotalFee] = React.useState('')

  const handleFromCurrencyChange = (event)=> {
    props.updateFromCurrency(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('exchangepaymentfromcurrency', encoded_value)
      const expirationTime = 2 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('exchangepaymentfromcurrency')
        }, expirationTime);
    }
  };

  const handleToCurrencyChange = (event)=> {
    props.updateToCurrency(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('exchangepaymenttocurrency', encoded_value)
      const expirationTime = 2 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('exchangepaymenttocurrency')
        }, expirationTime);
    }
  };

  const handleYouramountChange = (event)=> {
    props.updateYourAmount(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('exchangepaymentyouramount', encoded_value)

      const expirationTime = 2 * 60 * 1000;// 2 minutes in milliseconds

      setTimeout(() => {
          localStorage.removeItem('exchangepaymentyouramount')
      }, expirationTime);
    }
  };

  const handleConvertedAmountChange = (event)=> {
    props.updateconvertedAmount(event.target.value)

    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    } else {
      props.setError('')

      const encoded_value = btoa(event.target.value)
      localStorage.setItem('exchangepaymentconvertedamount', encoded_value)

      const expirationTime = 2 * 60 * 1000;// 2 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('exchangepaymentconvertedamount')
    }, expirationTime);

    }
  };

//   useEffect(() => {
//     if(amount) {
//       const TotalFeeAmount = (((amount / 100) * 2.5) + 3)
//       setTotalFee(TotalFeeAmount)
//     }
//   }, [amount])
  

  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Enter your payer email address then add an amount with currency to request payment. You may add a note for reference.
      </small>

      <Grid container spacing={2} sx={{marginTop: '2%'}} >
        <Grid item xs={12} lg={5}>
            <FormControl size='small' sx={{marginLeft: {xs:'4%', lg: '8%'}, width:{xs:'90%', lg: '100%'}}}>
                <InputLabel id="from-balance-select-label">Currency</InputLabel>
                <Select
                labelId="from-balance-select-label"
                id="from-balance-select"
                value={props.fromCurrency}
                label="Currency" 
                onChange={handleFromCurrencyChange}
                >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={"GBP"}>GBP</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                <FormHelperText><b>From</b> Balance: (49,945.53 USD) </FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12} lg={2} 
                   sx={{marginTop: '1.5%', display: {xs: 'none', sm: 'none', lg: 'flex'} }}>
            <SwapHorizIcon />
        </Grid>

        <Grid item xs={12} lg={2} 
                   sx={{marginTop: '-5%', display: {xs: 'flex', lg: 'none'}, justifyContent: 'center'}}>
            <ImportExportIcon />
        </Grid>
        
        <Grid item xs={12} lg={5}>
            <FormControl fullWidth size='small' 
                       sx={{ width:{xs:'90%', lg:'110%'}, 
                             marginLeft:{xs:'4%', lg:'-30%'}, 
                             marginTop:{xs:'-3%', lg: '0px'}}}>
                <InputLabel id="to-balance-select-label">Currency</InputLabel>
                <Select
                labelId="to-balance-select-label"
                id="to-balance-select"
                value={props.toCurrency}
                label="Currency"
                onChange={handleToCurrencyChange}
                >
                    <MenuItem value={"GBP"}>GBP</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                <FormHelperText><b>To</b> Balance: (19,847 GBP)</FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField 
                id="your-amount" 
                label="Your Amount" 
                variant="outlined" 
                size='small' 
                sx={{width: '90%', marginLeft: '3%'}}
                onChange={handleYouramountChange}
                />
                <FormHelperText sx={{marginLeft:'5%'}}>Fee(0.12%+1) Total Fee: 1.96</FormHelperText>
        </Grid>

        <Grid item xs={12}>
            <TextField
                id="converted-amount"
                label="Converted Amount"
                variant="outlined"
                size='small'
                onChange={handleConvertedAmountChange}
                sx={{width: '90%', marginLeft: '3%', marginTop: '5px'}}
                />
        </Grid>
      </Grid>

      {props.error &&
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                {props.error}
        </Alert>
        }
    </>
  )
};



function ExchangeMoneyForm2() {
  const [typedFromCurrency, setTypedFromCurrency] = React.useState('')
  const [typedyourAmount, settypedyourAmount] = React.useState('')
  const [typedToCurrency, setTypedToCurrency] = React.useState('')
  // const [typedAmount, setTypedAmount] = React.useState('')

  useEffect(()=> {
        const StoredFromCurrency = localStorage.getItem('exchangepaymentfromcurrency');
        const StoredYourAmount = localStorage.getItem('exchangepaymentyouramount');
        const UserTypedToCurrency = localStorage.getItem('exchangepaymenttocurrency');

    if(StoredFromCurrency) {
      const decodedFromcurrency = atob(StoredFromCurrency)
      setTypedFromCurrency(decodedFromcurrency);
    }
    if(StoredYourAmount) {
      const decoded_typedAmount = atob(StoredYourAmount)
      settypedyourAmount(decoded_typedAmount);
    }
    if(UserTypedToCurrency) {
      const decod_value = atob(UserTypedToCurrency)
      setTypedToCurrency(decod_value);
    }
  }, [])
  

  return(
    <>
    <small className='text-muted d-flex justify-content-center my-4' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
         Save time and exchange your currency at an attractive rate. You are just one click away to exchange your currency.
    </small>

    <p className='text-primary d-flex justify-content-center'><b>Exchanged Amount</b></p>
    <p className='d-flex justify-content-center mb-4'>{typedFromCurrency} {typedyourAmount}</p>

    <div className='mx-4'>
      <div className='d-flex justify-content-between mb-2'>
        <p>Rate</p>
        <p>{typedFromCurrency} 1 = {typedToCurrency} 0.75</p>
      </div>
      <hr className='mb-2' />

      <div className='d-flex justify-content-between mb-2'>
        <p>Fee</p>
        <p>{typedFromCurrency} 1.35</p>
      </div>
      <hr className='mb-2' />

      <div className='d-flex justify-content-between mb-2'>
        <p><b>Total</b></p>
        <p><b>{typedFromCurrency} 291.35</b></p>
      </div>
    </div>

    </>
  );
};




export default function ExchangeMoneyForm({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [fromCurrency, updateFromCurrency] = React.useState('');
  const [toCurrency, updateToCurrency] = React.useState('');
  const [yourAmount, updateYourAmount] = React.useState('');
  const [convertedAmount, updateconvertedAmount] = React.useState('');
  const [error, setError] = React.useState('');


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
          if (!fromCurrency || !toCurrency || !yourAmount || !convertedAmount) {
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
      if (!fromCurrency || !toCurrency || !yourAmount || !convertedAmount) {
        setError('Please fill all the above fields');
        return;
      }else {
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
      }
    } else {
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
    }
    
  //   if (completedSteps() === totalSteps()) {
  //      navigate('/')
  //   }else {
  //     handleNext();
  //   }
  handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderForms = (step) => {
    switch(step){
      case 0:
        return <ExchangeMoneyForm1
                fromCurrency={fromCurrency}
                updateFromCurrency={updateFromCurrency}
                toCurrency={toCurrency}
                updateToCurrency={updateToCurrency}
                yourAmount={yourAmount}
                updateYourAmount={updateYourAmount}
                convertedAmount={convertedAmount}
                updateconvertedAmount={updateconvertedAmount}
                error={error}
                setError={setError}
            />;
      case 1:
        return <ExchangeMoneyForm2 />;
      default:
        return null;
    }
  }


  return (
    <Main open={open}>
    <DrawerHeader />

    <Paper elevation={8}  
       sx={{height: '150%', display: 'flex', 
         justifyContent: 'center', border: '1px solid #808080', 
         marginLeft: {xs: '0%', sm: '7%'}, width: {xs: '100%', sm: '90%'}
         }}>
      
    <Box sx={{ width: {xs: '100%', sm: '80%', md: '80%', lg:'45%'}, 
               marginTop: {xs: '40px', sm: '1rem'},
               borderRadius: '20px',
               backdropFilter: 'blur( 20px )',
               boxShadow: '7px 7px 28px #aaaaaa, -7px -7px 28px #ffffff'
                }}>
      <p className='fs-3 d-flex justify-content-center my-2'>Exchange Money</p> <br />

      <Stepper nonLinear activeStep={activeStep} sx={{marginLeft: '4%'}}>
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
            <Typography variant='h1' sx={{ mt: 2, mb: 1 }}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                 Congatulation Your amount has been transferred successfully
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

            <Box 
                sx={{ display: 'flex', 
                      flexDirection: 'row', 
                      pt: 2,
                      marginLeft: '5%',
                      marginTop: '5%' }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }}  />
              {/* sx={{ flex: '1 1 auto' }} */}
              <Button onClick={handleNext} >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} variant='outlined'  
                         sx={{backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#0081CF',
                            marginRight: {xs: '4%', lg: '3%'},
                            width: {xs: '50%', lg: '40%'},
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
    </Paper>

    </Main>

  );
};



