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
import { Grid } from '@mui/material';
import Textarea from './TextArea';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axiosInstance from '../Authentication/axios';






function Form1({currency, setCurrency, usersEmail, setUsersemail, amount, setAmount, setError, error}) {

  const [totalFee, setTotalFee] = React.useState('')

  const handleCurrencyChange = (event)=> {
    setCurrency(event.target.value)

    if(!event.target.value) {
      setError('Please fill all the above fields')
    }else {
      setError('')

      localStorage.setItem('UsersendMoneyCurrency', event.target.value)
      const expirationTime = 1 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('UsersendMoneyCurrency')
    }, expirationTime);

    }
  }

  const handleEmailChange = (event)=> {
    setUsersemail(event.target.value)
    if(!event.target.value) {
      setError('Please fill all the above fields')
    }else {
      setError('')
      localStorage.setItem('usersEmail', event.target.value)

      const expirationTime = 1 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
          localStorage.removeItem('usersEmail')
      }, expirationTime);
    }
  }

  const handleAmountChange = (event)=> {
    setAmount(event.target.value)
    if(!event.target.value) {
      setError('Please fill all the above fields')
    } else {
      setError('')

      localStorage.setItem('userSendMoneyAmount', event.target.value)

      const expirationTime = 1 * 60 * 1000;// 10 minutes in milliseconds

      setTimeout(() => {
        localStorage.removeItem('userSendMoneyAmount')
    }, expirationTime);

    }
  }

  useEffect(() => {
    if(amount) {
      const TotalFeeAmount = (((amount / 100) * 2.5) + 3)
      setTotalFee(TotalFeeAmount)
    }
  }, [amount])
  
  




  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
        Enter your recipients email address & then add an amount with currency.
        You can also provide a note for reference.
      </small>

    <div style={{marginLeft: '3%', marginRight: '3%'}}>
    <FormControl sx={{ m: 1, minWidth: 120, width: '96%', marginTop: '20px' }} size="small">
        <TextField
          hiddenLabel
          id="email-field"
          variant="filled"
          size="small"
          value={usersEmail}
          placeholder='Please enter valid email address'
          onChange={handleEmailChange}
          type='email'
        />
        <FormHelperText>We will never share your email with anyone else.</FormHelperText>
      </FormControl>

      <Grid container spacing={2} >
        <Grid item xs={12} lg={6}>
        <FormControl sx={{ m: 1, minWidth: 120, width: '96%' }} size="small">
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency-label"
              value={currency}
              label="USD"
              onChange={handleCurrencyChange}
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

        <Grid item xs={12} lg={6}>
          <FormControl sx={{ m: 1, minWidth: 100, width: '99%' }} >
            <TextField
              hiddenLabel
              id="amount-field"
              // variant="filled"
              size="small"
              value={amount}
              placeholder='Amount'
              sx={{width: '95%'}}
              onChange={handleAmountChange}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Textarea aria-label="minimum height" minRows={4} sx={{marginTop: '20px', width: '97%',m:1}} placeholder="Note" />

      {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>}
      </div>

    </>
  )
}


function Form2() {
  const [localMail, setLocalMail] = React.useState('')
  const [typedCurrency, setTypedCurrency] = React.useState('')
  const [typedAmount, setTypedAmount] = React.useState('')

  useEffect(()=> {
    const StoredMail = localStorage.getItem('usersEmail');
    const UserTypedAmount = localStorage.getItem('userSendMoneyAmount');
    const UserTypedCurrency = localStorage.getItem('UsersendMoneyCurrency');

    if(StoredMail) {
      setLocalMail(StoredMail);
    }
    if(UserTypedAmount) {
      setTypedAmount(UserTypedAmount);
    }
    if(UserTypedCurrency) {
      setTypedCurrency(UserTypedCurrency);
    }
  }, [])
  
  
  return(
    <>
    <small className='text-muted d-flex justify-content-center my-4' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
      Take a look before you send. Do not worry,
      if the recipient does not have an account, we will get them set up for free.
    </small>

    <div style={{marginLeft: '4%', marginRight: '4%', marginTop: '8%'}}>
      <p className='d-flex justify-content-center' style={{color: '#3367ba'}} >Recipient</p>
      <p className='d-flex justify-content-center'>{localMail}</p>

      <div className="my-4">
        <div className="d-flex justify-content-between">
            <p>Transfer Amount</p> 
            <p>{typedCurrency} {typedAmount}</p>
        </div>
        <hr className='mb-3'/>
      </div>

      <div className="d-flex justify-content-between">
          <p>Fee</p> 
          <p>{typedCurrency} 1.02</p>
      </div>
      <hr className='mb-4'/>

      <div className="d-flex justify-content-between">
        <p><b>Total</b></p> <p><b>{typedCurrency} 13.02</b></p>
      </div>
      <hr className='mb-4'/>
    </div>
    </>
  )
}

const steps = ['Start Transfer', 'Confirm Your Transfer'];



export default function SendMoneyForm({open}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [currency, setCurrency] = React.useState('');
  const [usersEmail, setUsersemail] = React.useState('');
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
          if (!currency || !amount || !usersEmail) {
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
      if (!currency || !amount || !usersEmail) {
        setError('Please fill all the above fields');
        return;
      }else {
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    } else {
        axiosInstance.post(`api/v1/user/transfer_money/`, {
          user_id: 3,
          currency: 10,
          amount: amount,
          recivermail: usersEmail,
          note: 'Transfer Money'
        }).then((res)=> {

          if(res.status == 200) {
            console.log(res)
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handleNext();
          };

        }).catch((error)=> {
          console.log(error.response)

          if(error.response.data.msg == 'Receiver user not found'){
             setError("Receipient does not exists")
          } else if (error.response.data.msg == 'Wallet not found'){
            setError("Please create your wallet first")
          } else if(error.response.data.msg == 'Insufficient balance') {
             setError("Donot have sufficient balance")
          };

        });
    };
    
  //   if (completedSteps() === totalSteps()) {
  //      navigate('/')
  //   }else {
  //     handleNext();
  //   }

  };

  const handleReset = () => {
    // setActiveStep(0);
    // setCompleted({});
    navigate('/')
  };

  const renderForms = (step) => {
    switch(step){
      case 0:
        return <Form1
        currency={currency}
        setCurrency={setCurrency}
        usersEmail={usersEmail}
        setUsersemail={setUsersemail}
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
  };


  return (
    <Main open={open}>
    <DrawerHeader />

    {/* <Paper elevation={8}  sx={{height: '150%', display: 'flex', justifyContent: 'center', border: '1px solid #808080', marginLeft: {xs: '0%', sm: '7%'}, width: {xs: '100%', sm: '80%'}}}> */}
      
    <Box sx={{ 
              width: {xs: '100%', sm: '40%'}, 
              marginTop: {xs: '40px', sm: '1rem'}, 
              marginLeft: {xs: '0%', sm: '25%'},
              // background: 'url("/formBackgroundImage.jpg")',
              // backgroundColor: 'rgba( 255, 255, 255, 0.3 )',
              backgroundColor: '#E5E4E2',
              backdropFilter: 'blur( 20px )',
              boxShadow: '7px 7px 9px #5a5a5a, -7px -7px 9px #ffffff',
              borderRadius: '20px',
              height: {xs:'100%', sm: '120%'}
              }}>
      <p className='fs-3 d-flex justify-content-center'>Send Money</p> <br />

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
            <Typography variant='h1' sx={{ mt: 2, mb: 1 }}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                 Congatulation Your amount has been transferred successfully
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

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
              <Box sx={{ flex: '1 1 auto' }}  />
              {/* sx={{ flex: '1 1 auto' }} */}
              {/* <Button onClick={handleNext} >
                Next
              </Button> */}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} variant='outlined'  
                          sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.25)', 
                                color: '#0081CF',
                                marginRight: '2%'
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
    {/* </Paper> */}

    </Main>

  );
}



