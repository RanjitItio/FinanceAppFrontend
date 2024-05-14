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
import { Grid } from '@mui/material';
// import Textarea from './TextArea';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ColorlibConnector, ColorlibStepIcon } from './StepperDesign';
import StepLabel from '@mui/material/StepLabel';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Textarea from '../Transactions/TextArea';








function Form1({...props}) {

    const [totalFee, setTotalFee] = React.useState('')
  
    const handleUserSendCurrencyChange = (event)=> {
      props.setSendCurrency(event.target.value)
  
      if(!event.target.value) {
        props.setError('Please fill all the above fields')
      }else {
        props.setError('')
  
        localStorage.setItem('CryptosellUserSendCurrency', event.target.value)
        const expirationTime = 5 * 60 * 1000;// 10 minutes in milliseconds
  
        setTimeout(() => {
          localStorage.removeItem('CryptosellUserSendCurrency')
      }, expirationTime);
  
      }
    };

    const handleUserGetCurrencyChange = (event)=> {
      props.setGetCurrency(event.target.value)
  
      if(!event.target.value) {
        props.setError('Please fill all the above fields')
      }else {
        props.setError('')
      }

      localStorage.setItem('CryptosellUserGetCurrency', event.target.value)
      const expirationTime = 5 * 60 * 1000;// 5 minutes in milliseconds
  
      setTimeout(() => {
          localStorage.removeItem('CryptosellUserGetCurrency')
      }, expirationTime);

    }
  
    const handleUserGetAmountChange = (event)=> {
      props.updateUserGetAmount(event.target.value)
      if(!event.target.value) {
        props.setError('Please fill all the above fields')
      }else {
        props.setError('')
      }

      localStorage.setItem('CryptosellUserGetAmount', event.target.value)
      const expirationTime = 5 * 60 * 1000;// 5 minutes in milliseconds
  
      setTimeout(() => {
          localStorage.removeItem('CryptosellUserGetAmount')
      }, expirationTime);
    }
   
    const handleAmountChange = (event)=> {
      props.setAmount(event.target.value)
      // console.log(props.amount)
      if(!event.target.value) {
        props.setError('Please fill all the above fields')
      } else {
        props.setError('')
  
        localStorage.setItem('userCryptoAmountSend', event.target.value)
  
        const expirationTime = 5 * 60 * 1000;// 10 minutes in milliseconds
  
        setTimeout(() => {
          localStorage.removeItem('userCryptoAmountSend')
        }, expirationTime);
      }
    }
  
    // useEffect(() => {
    //   if(amount) {
    //     const TotalFeeAmount = (((amount / 100) * 2.5) + 3)
    //     setTotalFee(TotalFeeAmount)
    //   }
    // }, [amount])

  
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
                    id="amount-field"
                    // variant="filled"
                    size="small"
                    value={props.amount}
                    placeholder='You Send'
                    sx={{width: '95%'}}
                    onChange={handleAmountChange}
                />
                </FormControl>
            </Grid>
            <Grid item xs={12} lg={5}>
            <FormControl sx={{ m: 1, minWidth: 120, width: {xs: '95%', sm: '90%'} }} size="small">
                <InputLabel id="send-currency-label">Currency</InputLabel>
                <Select
                    labelId="send-currency-label"
                    id="send-currency-label"
                    value={props.sendCurrency}
                    label="USD"
                    onChange={handleUserSendCurrencyChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'LTC'}>LTC</MenuItem>
                    <MenuItem value={'EUR'}>ETH</MenuItem>
                    <MenuItem value={'INR'}>DOGE</MenuItem>
                    <MenuItem value={'GBP'}>BNB</MenuItem>
                    <MenuItem value={'GBP'}>ADA</MenuItem>
                    <MenuItem value={'GBP'}>SOL</MenuItem>
                    <MenuItem value={'GBP'}>USDT</MenuItem>
                    <MenuItem value={'GBP'}>XRP</MenuItem>
                    <MenuItem value={'GBP'}>BTC</MenuItem>
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
                <InputLabel id="get-currency-label">Currency</InputLabel>
                <Select
                    labelId="get-currency-label"
                    id="get-currency-label"
                    value={props.getCurrency}
                    label="USD"
                    onChange={handleUserGetCurrencyChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'LTC'}>LTC</MenuItem>
                    <MenuItem value={'EUR'}>ETH</MenuItem>
                    <MenuItem value={'INR'}>DOGE</MenuItem>
                    <MenuItem value={'GBP'}>BNB</MenuItem>
                    <MenuItem value={'GBP'}>ADA</MenuItem>
                    <MenuItem value={'GBP'}>SOL</MenuItem>
                    <MenuItem value={'GBP'}>USDT</MenuItem>
                    <MenuItem value={'GBP'}>XRP</MenuItem>
                    <MenuItem value={'GBP'}>BTC</MenuItem>
                </Select>
                <FormHelperText>Fee (2.5%+3) Total Fee: {totalFee}</FormHelperText>
                
            </FormControl>
            </Grid>
        </Grid>
  
        {props.error && <Alert severity="error" >{props.error}</Alert>}
  
      </>
    )
  }
  
  
  function Form2() {
    const [userSendCurrency, UpdateUserSendCurrency] = React.useState('')
    const [userSendAmount, updateUserSendAmount] = React.useState('')
    const [userGetCurrency, updateUserGetCurrency] = React.useState('')
    const [userGetAmount, updateUserGetAmount] = React.useState('')
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
  
    useEffect(()=> {
      const StoredLocalUserSendCurrency = localStorage.getItem('CryptosellUserSendCurrency');
      const StoredLocalUserSendAmount = localStorage.getItem('userCryptoAmountSend');
      const StoredLocalUserGetCurrency = localStorage.getItem('CryptosellUserGetCurrency');
      const StoredLocalUserGetAmount = localStorage.getItem('CryptosellUserGetAmount');
  
      if(StoredLocalUserSendCurrency) {
        UpdateUserSendCurrency(StoredLocalUserSendCurrency);
      }
      if(StoredLocalUserSendAmount) {
        updateUserSendAmount(StoredLocalUserSendAmount);
      }
      if(StoredLocalUserGetCurrency) {
        updateUserGetCurrency(StoredLocalUserGetCurrency);
      }
      if(StoredLocalUserGetAmount) {
        updateUserGetAmount(StoredLocalUserGetAmount);
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
                <p><b>{userSendAmount}.00 {userSendCurrency}</b></p>
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
                <p>You Get</p>
                <p><b>{userGetAmount}.00 {userGetCurrency}</b></p>
                <small>Fees ~ 2.5 USD</small>
            </div> 
      </Paper>
    </Box>

    <FormControl sx={{ m: 1, minWidth: 120, width: '80%' , marginLeft: '10%', marginTop: '18px'}} size="small">
      <InputLabel id="received-select-crypto-label">{userSendCurrency} Address</InputLabel>
      <Select
        labelId="received-select-crypto-label"
        id="received-crypto-small"
        value={userSendCurrency}
        label="Age"
        // defaultValue='LTC Address'
        // onChange={handleChange}
        readOnly
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>

    <Grid container sx={{marginLeft: '13%'}}>
        <Grid item xs={12} sm={12} md={5} sx={{marginTop: '8%'}}>
            <small>Please make payment</small>
            <p className='fs-3'><b>0.00205 <span style={{color: '#845EC2'}}>{userSendCurrency}</span></b></p>
            <small>To our merchant address below</small>
        </Grid>

        <Grid item xs={12} sm={12} md={7}>
             <QrCode2Icon sx={{fontSize: '30vh'}} />
        </Grid>

        <Grid item xs={12}>
          <TextField id="outlined-basic" variant="outlined" size='small'
          sx={{width: '80%'}}
          readOnly
          value={'werHBJKKjbjjJJNJN656hyBGFGCBJ6ugghv'}
          InputProps={{
              endAdornment: (
                  <IconButton edge="end" aria-label="location">
                  <ContentCopyIcon />
                  </IconButton>
              ),
              }}/>

           <Textarea aria-label="minimum height" minRows={3} 
                placeholder="Payment Details"
                sx={{width: '80%', marginTop: '15px'}} />

            <TextField
                type="file"
                variant="outlined"
                size='small'
                inputProps={{ accept: 'image/*' }}
                sx={{ width: '80%', marginTop: '15px' }}
            />
        </Grid>
         <Grid item xs={12}>
          <TextField id="outlined-basic" variant="outlined" size='small'
          sx={{width: '80%'}}

          value={'werHBJKKjbjjJJNJN656hyBGFGCBJ6ugghv'}
          />
          <InputLabel id="get-currency-label">Recive Crypto</InputLabel>
                <Select
                    labelId="get-currency-label"
                    id="get-currency-label"
                    // value={props.getCurrency}
                    label="USD"
                    sx={{width: '80%'}}
                    // onChange={handleUserGetCurrencyChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'address'}>{userGetCurrency} Adress</MenuItem>
                    <MenuItem value={'wattel'}>{userGetCurrency} Wallet</MenuItem>
                   
                </Select>
              <TextField
                    hiddenLabel
                    sx={{width: '80%'}}
                    // variant="outlined"
                    size="small"
                    // value= {userGetAmount}
                    placeholder='Recive Crypto'
                   
                    // onChange= {e => updateUserGetAmount(e.target.value)}
                    />

           
        </Grid>
    </Grid>
      </>
    )
  }
  

const steps = ['Setup Currency', 'Confirm Swap'];




export default function CryptoSwap({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [error, setError] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [sendCurrency, setSendCurrency] = React.useState('');
  const [getCurrency, setGetCurrency] = React.useState('');
  const [userGetAmount, updateUserGetAmount] = React.useState('');


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
          if (!sendCurrency || !getCurrency || !amount || !userGetAmount) {
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
      if (!sendCurrency || !getCurrency || !amount || !userGetAmount) {
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
        sendCurrency={sendCurrency}
        setSendCurrency={setSendCurrency}
        getCurrency={getCurrency}
        setGetCurrency={setGetCurrency}
        amount={amount}
        setAmount={setAmount}
        error={error}
        setError={setError}
        userGetAmount={userGetAmount}
        updateUserGetAmount={updateUserGetAmount}
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
      background: 'url("/formBackgroundImage.jpg")',
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
      <p className='fs-3 d-flex justify-content-center'>Crypto Swap</p> <br />

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
                    Crypto exchange successful. Please wait for approval from the admin.
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