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
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';



const steps = ['Setup Money', 'Confirm Exchange Money'];


// First step form
function ExchangeMoneyForm1({...props}) {
  const [currencies, setCurrencies] = React.useState([]);

  // From Currency Value update
  const handleFromCurrencyChange = (event)=> {
    if(!event.target.value) {
      props.setError('Please select from Currency')
    } else {
      props.setError('')
      props.updateFromCurrency(event.target.value)
    }
  };

  // To Currency Value update
  const handleToCurrencyChange = (event)=> {

    if(!event.target.value) {
      props.setError('Please Select to Currency')
    }else {
      props.setError('')
      props.updateToCurrency(event.target.value)
    }
  };


  // Get typed amount
  const handleamountChange = (event)=> {
    if(!event.target.value) {
      props.setError('Please fill all the above fields')
    }else {
      props.setError('')
      props.updateAmount(event.target.value);
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
      console.log(error.response)
    });

  }, []);

  

  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Enter your payer email address then add an amount with currency to request payment. You may add a note for reference.
      </small>

      <div style={{marginLeft: '2%', marginRight: '0%'}}>

      <Grid container spacing={2} sx={{marginTop: '2%'}} >
        <Grid item xs={12} lg={5}>
            <FormControl size='small' sx={{marginLeft: {xs:'4%', lg: '8%'}, width:{xs:'90%', lg: '100%'}}}>
                <InputLabel id="from-balance-select-label">Currency</InputLabel>
                <Select
                id="from-balance-select"
                value={props.fromCurrency}
                label="Currency" 
                onChange={handleFromCurrencyChange}
                >
                <MenuItem value={''}>None</MenuItem>
                  {currencies.map((curr)=> (
                  <MenuItem key={curr.id} value={curr.name}>
                    {curr.name}
                  </MenuItem>
              ))}
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
                id="to-balance-select"
                value={props.toCurrency}
                label="Currency"
                onChange={handleToCurrencyChange}
                >
                    <MenuItem value={""}>None</MenuItem>
                    {currencies.map((curr)=> (
                      <MenuItem key={curr.id} value={curr.name}>
                        {curr.name}
                      </MenuItem>
                  ))}
                </Select>
                <FormHelperText><b>To</b> Balance: (19,847 GBP)</FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField 
                id="amount" 
                label="Amount" 
                variant="outlined" 
                size='small' 
                sx={{width: '90%', marginLeft: '3%'}}
                onChange={handleamountChange}
                />
                <FormHelperText sx={{marginLeft:'5%'}}>Fee(5%)</FormHelperText>
        </Grid>

        <Grid item xs={12}>
            <TextField
                id="converted-amount"
                label="Converted Amount"
                variant="outlined"
                size='small'
                disabled
                value={props.convertedAmount}
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
    </div>
    </>
  )
};


// Second step form
function ExchangeMoneyForm2({...props}) {

  return(
    <>
    <small className='text-muted d-flex justify-content-center my-4' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
         Save time and exchange your currency at an attractive rate. You are just one click away to exchange your currency.
    </small>

    <div style={{marginLeft: '2%', marginRight: '1%'}}>

      <p className='text-primary d-flex justify-content-center'><b>Exchanged Amount</b></p>
      <p className='d-flex justify-content-center mb-4'>{props.toCurrency} {props.convertedAmount}</p>

      <div className='mx-4'>
        <div className='d-flex justify-content-between mb-2'>
          <p>From Currency</p>
          <p>{props.fromCurrency} {props.Amount}</p>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p>To Currency</p>
          <p>{props.toCurrency} {props.convertedAmount}</p>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p>Fee(5%)</p>
          <p>{props.fromCurrency} {props.fee}</p>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p><b>Total</b></p>
          <p><b>{props.fromCurrency} {props.totalAmount}</b></p>
        </div>
      </div>
    </div>
    </>
  );
};



// Exchange Money 
export default function ExchangeMoneyForm({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const navigate = useNavigate();
  const [fromCurrency, updateFromCurrency]       = React.useState('');
  const [toCurrency, updateToCurrency]           = React.useState('');
  const [Amount, updateAmount]                   = React.useState('');
  const [convertedAmount, updateconvertedAmount] = React.useState('');
  const [error, setError]                        = React.useState('');
  const [fee, updateFee]                         = React.useState(0);  // Fee state
  const [totalAmount, setTotalAmount]            = React.useState(0);


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

  // Redirect to Next Step
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

        if (activeStep == 0) {
          if (!fromCurrency || !toCurrency || !Amount || !convertedAmount) {
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

  // Last step Method 
  const handleComplete = () => {
    const newCompleted = completed;
    if (activeStep == 0) {
      if (!fromCurrency || !Amount || !toCurrency) {
        setError('Please fill all the above fields');

      } else {
        setError('')
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };

    } else {
      // Call API
      axiosInstance.post(`/api/v6/fiat/exchange/money/`, {
        exchange_amount: Amount,
        convert_amount: convertedAmount,
        fee: fee,
        from_currency: fromCurrency,
        to_currency: toCurrency,

      }).then((res)=> {
        // console.log(res)

          if(res.data.message == 'Exchnage money created successfully') {
              newCompleted[activeStep] = true;
              setCompleted(newCompleted);
              handleNext();
          }

        }).catch((error)=> {
          console.log(error)

          if(error.response.data.msg == 'Do not have from wallet'){
              setError("Do not have existing wallet in From Currency")
          } else if (error.response.data.msg == 'Do not have sufficient balance in From wallet') {
            setError('Insufficient Balance in Wallet')
          } else {
            setError('')
          }

        })
    };
    
  };


  // Navigate to Dashboard
  const handleReset = () => {
    navigate('/')
  };

  
  // Render the forms
  const renderForms = (step) => {
    switch(step){
      case 0:
        return <ExchangeMoneyForm1
                fromCurrency={fromCurrency}
                updateFromCurrency={updateFromCurrency}
                toCurrency={toCurrency}
                updateToCurrency={updateToCurrency}
                updateAmount={updateAmount}
                convertedAmount={convertedAmount}
                error={error}
                setError={setError}
            />;
      case 1:
        return <ExchangeMoneyForm2 
                  convertedAmount={convertedAmount}
                  toCurrency={toCurrency}
                  fromCurrency={fromCurrency}
                  Amount={Amount}
                  fee={fee}
                  totalAmount={totalAmount}
                />;
      default:
        return null;
    }
  };

  // Convert The currency
  useEffect(()=> {
    if (Amount && fromCurrency && toCurrency) {
      setTimeout(() => {
        axiosInstance.post(`api/v2/convert/currency/`, {
          from_currency: fromCurrency,
          to_currency:   toCurrency,
          amount     :   parseFloat(Amount)
  
        }).then((res)=> {
          
          if (res.status === 200) {
            updateconvertedAmount(res.data.converted_amount)
          }
  
        }).catch((error)=> {
            console.log(error)
  
            if (error.response.data.message === 'Error calling external API') {
                alert('Currency Conversion API Limit Exceeded')
            } else if (error.response.data.message === 'Currency API Error') {
              alert('Currency Conversion API Limit Exceeded')
            } else if (error.response.data.message === 'Invalid Curency Converter API response') {
              alert('Currency Conversion API Limit Exceeded')
            } 
        })
      }, 1500);
    }
  }, [fromCurrency, toCurrency, Amount]);


  // Calculate Fee and Total Amount
  useEffect(()=> {
    if (Amount) {
      const calc_amount  = (Amount / 100) * 5
      const exact_fee    = parseFloat(calc_amount)
      const total_amount = parseFloat(Amount) + exact_fee
      updateFee(exact_fee)
      setTotalAmount(total_amount)
    }
  }, [Amount]);

  


  return (
    <Main open={open}>
      <DrawerHeader />

    <Box sx={{ width: {xs: '100%', sm: '80%', md: '45%'}, 
               marginTop: {xs: '40px', sm: '1rem'},
               borderRadius: '20px',
               backdropFilter: 'blur( 20px )',
               boxShadow: '7px 7px 28px #aaaaaa, -7px -7px 28px #ffffff',
               marginLeft: {xs: '0%', sm: '25%'},
               background: '#F0F8FF',
              height: {xs:'100%', sm: '120%'}
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
                  Congratulation, Your Exchange money request has been raised successfully, Please wait for Admin approval
              </Alert>
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Dashboard</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>

            {renderForms(activeStep)}

                <Box 
                    sx={{ display: 'flex', 
                          flexDirection: 'row', 
                          justifyContent:'center',
                          pt: 2,
                          // marginLeft: '5%',
                          marginTop: '5%' }}>
                
                  {/* <Box sx={{ flex: '1 1 auto' }}  /> */}
              
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete} variant='outlined'  
                            sx={{backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#0081CF',
                                marginRight: {xs: '4%', lg: '3%'},
                                width: {xs: '50%', lg: '50%'},
                                '@media (max-width: 500px)': {
                                    fontSize: '0.6rem' 
                                }
                            }}>
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
  </Main>
  );
};



