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
import { ColorlibConnector, ColorlibStepIcon } from './StepperDesign';
import StepLabel from '@mui/material/StepLabel';







function Form1({...props}) {

    const [totalFee, setTotalFee] = React.useState('')
  
    const handleUserSendCurrencyChange = (event)=> {
      props.setUserSendCurrency(event.target.value)
  
      if(!event.target.value) {
        props.setError('Please fill all the above fields')
      }else {
        props.setError('')
  
        localStorage.setItem('UsersendMoneyCurrency', event.target.value)
        const expirationTime = 5 * 60 * 1000;// 10 minutes in milliseconds
  
        setTimeout(() => {
          localStorage.removeItem('UsersendMoneyCurrency')
      }, expirationTime);
  
      }
    };

    const handleUserGetCurrencyChange = (event)=> {
      props.setUserGetCurrency(event.target.value)
  
      if(!event.target.value) {
        props.setError('Please fill all the above fields')
      }else {
        props.setError('')
  
        localStorage.setItem('UserGetMoneyCurrency', event.target.value)
        const expirationTime = 5 * 60 * 1000;// 10 minutes in milliseconds
  
        setTimeout(() => {
          localStorage.removeItem('UserGetMoneyCurrency')
      }, expirationTime);
  
      }
    };
  
  
    const handleUserSendAmountChange = (event)=> {
      const value = event.target.value;
      props.setUserSendAmount(value);
      // console.log(value)

      if(!value) {
        props.setError('Please fill all the above fields')
      } else {
        props.setError('')
  
        localStorage.setItem('userSendMoneyAmount', event.target.value)
  
        const expirationTime = 5 * 60 * 1000;// 10 minutes in milliseconds
  
        setTimeout(() => {
          localStorage.removeItem('userSendMoneyAmount')
      }, expirationTime);
  
      }
    };

    const handleUserGetAmountChange = (event)=> {
      const value = event.target.value
      props.setUserGetAmount(value)

      if(!value) {
        props.setError('Please fill all the above fields')
      } else {
        props.setError('')
  
        localStorage.setItem('userGetMoneyAmount', event.target.value)
  
        const expirationTime = 5 * 60 * 1000;// 10 minutes in milliseconds
  
        setTimeout(() => {
          localStorage.removeItem('userGetMoneyAmount')
      }, expirationTime);
        }
    }
  
    useEffect(() => {
      setTimeout(() => {
        const value = props.userSendAmount;
        if(value) {
          const TotalFeeAmount = (((props.userSendAmount / 100) * 2.5) + 3)
          setTotalFee(TotalFeeAmount)
        }
      }, 2000);

    }, [props.userSendAmount]);

  
    return(
      <>
        <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Exchange crypto manually from the comfort of your home, quickly, safely with minimal 
            fees. Select the wallet & put the amount you want to exchange.
        </small>
  
        <Grid container spacing={0} >
            <Grid item xs={12} lg={7}>
                <FormControl sx={{ m: 1, minWidth: 100, width: '99%' }} >
                <TextField
                    hiddenLabel
                    id="send-amount-field"
                    // variant="filled"
                    size="small"
                    value={props.userSendAmount}
                    placeholder='Amount'
                    sx={{width: '95%'}}
                    onChange={handleUserSendAmountChange}
                />
                </FormControl>
            </Grid>
            <Grid item xs={12} lg={5}>
            <FormControl sx={{ m: 1, minWidth: 120, width: {xs: '95%', sm: '90%'} }} size="small">
                <InputLabel id="send-currency-label">Currency</InputLabel>
                <Select
                    labelId="send-currency-label"
                    id="send-currency-label"
                    value={`${props.userSendcurrency}`}
                    label="USD"
                    onChange={handleUserSendCurrencyChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                    <MenuItem value={'INR'}>INR</MenuItem>
                    <MenuItem value={'GBP'}>GBP</MenuItem>
                </Select>
                <FormHelperText>Fee (2.5%+3) Total Fee: {totalFee}</FormHelperText>
                {/* {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>} */}
            </FormControl>
            </Grid>

            <Grid item xs={12} lg={5} sx={{marginLeft: '20px', marginBottom: '9px', marginTop: -2}}>
                <small>Fees: </small> <br />
                <small><strong>Estimatedx Rate: </strong> </small>
            </Grid>

            <Grid item xs={12} lg={7}>
                <FormControl sx={{ m: 1, minWidth: 100, width: '99%' }} >
                <TextField
                    hiddenLabel
                    id="you-get-field"
                    // variant="outlined"
                    size="small"
                    value={props.userGetAmount}
                    placeholder='You Get'
                    sx={{width: '95%'}}
                    onChange={handleUserGetAmountChange}
                />
                </FormControl>
            </Grid>

            <Grid item xs={12} lg={5}>
            <FormControl sx={{ m: 1, minWidth: 120, width: {xs: '95%', sm: '90%'} }} size="small">
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                    labelId="get-currency-label"
                    id="get-currency-label"
                    value={props.userGetcurrency}
                    label="USD"
                    onChange={handleUserGetCurrencyChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'LTC'}>LTC</MenuItem>
                    <MenuItem value={'ETH'}>ETH</MenuItem>
                    <MenuItem value={'DOGE'}>DOGE</MenuItem>
                    <MenuItem value={'BNB'}>BNB</MenuItem>
                    <MenuItem value={'ADA'}>ADA</MenuItem>
                    <MenuItem value={'SOL'}>SOL</MenuItem>
                    <MenuItem value={'USDT'}>USDT</MenuItem>
                    <MenuItem value={'XRP'}>XRP</MenuItem>
                    <MenuItem value={'BTC'}>BTC</MenuItem>
                </Select>
                {/* <FormHelperText>Fee (2.5%+3) Total Fee: {totalFee}</FormHelperText> */}
                
            </FormControl>
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
  }
  
  
function Form2() {
    const [typedUserSendCurrency, setTypedUserSendCurrency] = React.useState('')
    const [typedUserSendAmount, setTypedUserSendAmount] = React.useState('')
    const [typedUserGetCurrency, setTypedUserGetCurrency] = React.useState('')
    const [typedUserGetAmount, setTypedUserGetAmount] = React.useState('')
    
  
    useEffect(()=> {
      const userSendCurrency = localStorage.getItem('UsersendMoneyCurrency');
      const userGetCurrency = localStorage.getItem('UserGetMoneyCurrency');
      const UserTypedSendAmount = localStorage.getItem('userSendMoneyAmount');
      const UserTypedGetAmount = localStorage.getItem('userGetMoneyAmount');
  
      if(userSendCurrency) {
        setTypedUserSendCurrency(userSendCurrency);
      }
      if(userGetCurrency) {
        setTypedUserGetCurrency(userGetCurrency);
      }
      if(UserTypedSendAmount) {
        setTypedUserSendAmount(UserTypedSendAmount);
      }
      if(UserTypedGetAmount) {
        setTypedUserGetAmount(UserTypedGetAmount);
      }
    }, [])
    
    
    return(
      <>
      <small className='text-muted d-flex justify-content-center my-4' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
        Take a look before you send. Do not worry,
        if the recipient does not have an account, we will get them set up for free.
      </small>

      

    <Box
      sx={{
        display: 'flex',
        // flexWrap: 'wrap',
        '& > :not(style)': {
        //   m: 1,
        // minHeight: '100vh'
        },
      }}
      style={{justifyContent: 'center'}}
    >

      <Paper elevation={3} 
           sx={{width: '40%', height: '7rem', 
                position: 'relative',
                }} 
        >
            <div style={{marginLeft: '10%', marginTop: '10%'}}>
                <p>You Send</p>
                <p><b>{typedUserSendAmount}.00 {typedUserSendCurrency}</b></p>
                <small>Fees ~ 2.5 USD</small>
            </div>
            
        </Paper>
            {/* <NavigateNextIcon 
            sx={{fontSize: '35px',
                 position: 'absolute',
                 top: '39.3%',transform: 'translateY(-50%)',
            }}/> */}
        <Paper elevation={3} sx={{
            width: '40%', height: '7rem',
            backgroundColor: '#845EC2'
             }}
             >
            <div style={{marginLeft: '10%', marginTop: '10%', color: 'white'}}>
                <p>You Send</p>
                <p><b>{typedUserGetAmount}.00 {typedUserGetCurrency}</b></p>
                <small>Fees ~ 2.5 USD</small>
            </div> 
      </Paper>
    </Box>

    <FormControl sx={{ m: 1, minWidth: 120, width: '80%' , marginLeft: '10%', marginTop: '18px'}} size="small">
      <InputLabel id="received-select-crypto-label"> {typedUserGetCurrency} Address</InputLabel>
      <Select
        labelId="received-select-crypto-label"
        id="received-crypto-small"
        value={`${typedUserGetCurrency}`}
        label="Currency"
        readOnly
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'INR'}>INR</MenuItem>
        <MenuItem value={'BTC'}>BTC</MenuItem>
        <MenuItem value={'ETH'}>ETH</MenuItem>
        <MenuItem value={'GBP'}>GBP</MenuItem>
        <MenuItem value={'LTC'}>LTC</MenuItem>
        <MenuItem value={'DOGE'}>DOGE</MenuItem>
        <MenuItem value={'BNB'}>BNB</MenuItem>
        <MenuItem value={'ADA'}>ADA</MenuItem>
        <MenuItem value={'SOL'}>SOL</MenuItem>
        <MenuItem value={'USDT'}>USDT</MenuItem>
        <MenuItem value={'XRP'}>XRP</MenuItem>
      </Select>
    </FormControl>

    <TextField id="standard-basic" label="Standard" variant="outlined" size='small'
        sx={{width:'80%', marginLeft: '10%', marginTop: '15px'}}
       />

    <FormControl sx={{ m: 1, minWidth: 120, width: '80%' , marginLeft: '10%', marginTop: '20px'}} size="small">
      <InputLabel id="payment-select-method-label">Payment Method</InputLabel>
      <Select
        labelId="payment-select-method-label"
        id="payment-method-small"
        value='bank'
        label="payment method"
        // defaultValue='LTC Address'
        // onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'wallet'}>Wallet</MenuItem>
        <MenuItem value={'stripe'}>Stripe</MenuItem>
        <MenuItem value={'paypal'}>Paypal</MenuItem>
        <MenuItem value={'bank'}>Bank</MenuItem>
      </Select>
    </FormControl>
  
      </>
    )
  }
  

const steps = ['Setup Currency', 'Confirm Buy'];



export default function CryptoBuy({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [userSendcurrency, setUserSendCurrency] = React.useState('');
  const [userSendAmount, setUserSendAmount] = React.useState('');
  const [userGetcurrency, setUserGetCurrency] = React.useState('');
  const [userGetAmount, setUserGetAmount] = React.useState('');
  const [error, setError] = React.useState('');
  // const navigate = useNavigate()


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
          if (!userSendcurrency || !userSendAmount || !userGetcurrency || !userGetAmount) {
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
    // newCompleted[activeStep] = true;
    // setCompleted(newCompleted);

    if (activeStep == 0) {
      if (!userSendcurrency || !userSendAmount || !userGetcurrency || !userGetAmount) {
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
    
 
  handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderForms = (step) => {
    switch(step){
      case 0:
        return <Form1
        userSendcurrency={userSendcurrency}
        setUserSendCurrency={setUserSendCurrency}
        userSendAmount={userSendAmount}
        setUserSendAmount={setUserSendAmount}
        userGetcurrency={userGetcurrency}
        setUserGetCurrency={setUserGetCurrency}
        userGetAmount={userGetAmount}
        setUserGetAmount={setUserGetAmount}
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

    <Paper elevation={8}  
      sx={{height: '150%', display: 'flex', justifyContent: 'center', 
      border: '1px solid #808080', marginLeft: {xs: '0%', sm: '7%'}, width: {xs: '100%', sm: '80%'},
      background: 'url("/formBackgroundImage.jpg")'
     }}
    >
      
    <Box
      sx={{ width: {xs: '100%', sm: '50%'}, 
            marginTop: {xs: '40px', sm: '1rem'},
            backgroundColor: 'rgba( 255, 255, 255, 0.3 )',
            // backgroundColor: 'white',
            borderRadius: '20px',
            backdropFilter: 'blur( 20px )',
            boxShadow: '7px 7px 9px #5a5a5a, -7px -7px 9px #ffffff'
        }}
        elevation={24}>
      <p className='fs-3 d-flex justify-content-center'>Crypto Buy</p> <br />

      <Stepper nonLinear activeStep={activeStep} connector={<ColorlibConnector />} >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              {/* {label} */}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
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
          </>
        ) : (
          <>

            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}

            {renderForms(activeStep)}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2,
                marginTop: '10px',
                width: '80%',
                marginLeft: '10%'
             }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }}  />
              <Button onClick={handleNext} >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} 
                  variant='contained'
                  size='small'  
                  sx={{backgroundColor: 'rgba(255, 255, 255, 0.25)',
                   color: '#0081CF'}} 
                  >
                    {completedSteps() === totalSteps() - 1
                      ? 'Confirm & Transfer'
                      : 'Confirm & Proceed'}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
    </Paper>


</Main>
    )
}

