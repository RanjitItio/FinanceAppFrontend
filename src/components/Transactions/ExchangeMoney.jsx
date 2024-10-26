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
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import StepLabel from '@mui/material/StepLabel';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';



const steps = ['Step 1', 'Step 2'];
const freeCurrencyAPIKey = import.meta.env.VITE_FREE_CURRENCY_API


// First step form
function ExchangeMoneyForm1({...props}) {
  const [userWallet, setUserWallet]             = React.useState([]); // All available wallets of user
  const [fromToConversion, setFromToConversion] = React.useState(0);  // Conversion amount


  // Fetch all the available wallet of the user
  useEffect(() => {
      axiosInstance.get(`api/v3/user/wallet/`).then((res)=> {
        // console.log(res)
        if (res.status === 200) {
          setUserWallet(res.data.user_wallet_data)
        }

      }).catch((error)=> {
        // console.log(error);
        if (error.response.status === 404) {
            props.setWalletNotFound(true);
        }
      })
  }, []);
  

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
    const {name, value} = event.target;

    if (value === '') {
      props.setError('');
      props.setAmountError('');
      props.updateAmount(value);
    } 
    else if (Number(value) === 0 || Number(value) < 0){
      props.setAmountError('Number should be greater than 0')
    } 
    else if (/^\d*\.?\d*$/.test(value) || value === '' || Number(value) > 0) {
      props.setError('');
      props.setAmountError('');
      props.updateAmount(value);
    } 
    else {
      props.setAmountError('Please enter valid amount')
    }
  };

  // Get assigned fee for Fiat Deposit Transaction
  useEffect(() => {
    if (props.Amount) {
      axiosInstance.post(`/api/v2/charged/fee/`, {
         fee_type: 'Fiat Exchange',
         amount: parseFloat(props.Amount)

      }).then((res)=> {

         if (res.status === 200 && res.data.success === true){ 
             props.setTransactionFee(res.data.fee)
         }
      })
    }
  }, [props.Amount]);


    /// Convert from fromCurrency to toCurrency
    useEffect(()=> {
      if (props.fromCurrency && props.toCurrency) {
          const freecurrencyapi = new Freecurrencyapi(freeCurrencyAPIKey);
          freecurrencyapi.latest({
            base_currency: props.fromCurrency,
            currencies: props.toCurrency 

        }).then(response => {
            // console.log(response);
            setFromToConversion(response.data[props.toCurrency])
        });
      }
    }, [props.fromCurrency, props.toCurrency]);


    // Calucalte The converted Amount
    useEffect(() => {
      if (props.Amount && fromToConversion) {
         const calculateAmount = (parseFloat(fromToConversion) * parseFloat(props.Amount))
         props.updateconvertedAmount(calculateAmount);
      }
    }, [props.Amount, fromToConversion]);
    

  

  return(
    <>
      <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
          You can exchange your wallet amount to another waller using our popular payment system. Fill the details correctly & the amount you want to exchange.
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
                  {userWallet.map((wallet)=> (
                  <MenuItem key={wallet.id} value={wallet.currency}>
                    {wallet.currency}
                  </MenuItem>
              ))}
                </Select>

                <FormHelperText>
                  <b>From</b> Balance: ({userWallet.find((wallet)=> wallet.currency === props.fromCurrency)?.balance.toFixed(2) || 0} {props.fromCurrency}) 
                </FormHelperText>
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
                      {userWallet.filter((wallet)=> wallet.currency !== props.fromCurrency).map((wallet)=> (
                        <MenuItem key={wallet.id} value={wallet.currency}>
                          {wallet.currency}
                        </MenuItem>
                      ))}
                  </Select>
                <FormHelperText>
                  <b>To</b> Balance: ({userWallet.find((wallet)=> wallet.currency === props.toCurrency)?.balance || 0} {props.toCurrency})
                </FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField 
                id="amount" 
                value={props.Amount}
                placeholder='Amount' 
                variant="outlined" 
                size='small' 
                sx={{width: '90%', marginLeft: '3%'}}
                onChange={(e)=> handleamountChange(e)}
                error={props.amountError !== ''}
                helperText={props.amountError !== '' ? props.amountError : ''}
                />
              <FormHelperText sx={{ml:3}}>Fee: {props.transactionFee ? props.transactionFee.toFixed(0) : 0} {props.fromCurrency}</FormHelperText>
        </Grid>

        <Grid item xs={12}>
            <TextField
                id="converted-amount"
                label="Converted Amount"
                variant="outlined"
                size='small'
                disabled
                value={props.convertedAmount ? props.convertedAmount.toFixed(3) : 0}
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
      <p className='d-flex justify-content-center mb-4'>{props.toCurrency} {props.convertedAmount ? props.convertedAmount.toFixed(3) : 0}</p>

      <div className='mx-4'>
        <div className='d-flex justify-content-between mb-2'>
          <p>From Currency: </p>
          <p>{props.fromCurrency} {props.Amount}</p>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p>To Currency: </p>
          <p>{props.toCurrency} {props.convertedAmount ? props.convertedAmount.toFixed(3) : 0}</p>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p>Fee: </p>
          <p>{props.fromCurrency} {props.fee}</p>
        </div>
        <hr className='mb-2' />

        <div className='d-flex justify-content-between mb-2'>
          <p><b>Total:</b></p>
          <p><b>{props.fromCurrency} {props.totalAmount}</b></p>
        </div>
      </div>
    </div>

    {props.error &&
      <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
              {props.error}
      </Alert>
      }
    </>
  );
};



// Exchange Money 
export default function ExchangeMoneyForm({open}) {
  const [activeStep, setActiveStep] = React.useState(0);  // currenct step
  const [completed, setCompleted] = React.useState({});   // Completed state

  const navigate = useNavigate();
  const [fromCurrency, updateFromCurrency]       = React.useState(''); // From Currency
  const [toCurrency, updateToCurrency]           = React.useState(''); // To Currency
  const [Amount, updateAmount]                   = React.useState(''); // Amount
  const [convertedAmount, updateconvertedAmount] = React.useState(''); // Converted Amount
  const [error, setError]                        = React.useState(''); // Error Message
  const [totalAmount, setTotalAmount]            = React.useState(0); // Total Amount
  const [amountError, setAmountError]            = React.useState(''); // Amount Error
  const [transactionFee, setTransactionFee]      = React.useState(0.00);  // Transaction Fee
  const [walletNotFound, setWalletNotFound]      = React.useState(false); // 


  // Total steps
  const totalSteps = () => {
    return steps.length;
  };

  // Completed Steps
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  // Last step check
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  // All steps completed check
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

  // Update current step value
  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  // Last step Method 
  const handleComplete = () => {
    const newCompleted = completed;
    if (activeStep == 0) {
      if (!fromCurrency || !Amount || !toCurrency) {
        setError('Please fill all the above fields');

      } else if (amountError) {
        setError('Please provide valid amount')

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
        fee: transactionFee,
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
          // console.log(error)

          setTimeout(() => {
            setError('')
          }, 2000);

          if(error.response.data.message == 'Do not have from wallet'){
              setError("Do not have existing wallet in From Currency")
          }  else if (error.response.data.message == 'Do not have sufficient balance in From wallet') {
            setError('Insufficient Balance in Wallet')
          } 
          else {
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
                updateconvertedAmount={updateconvertedAmount}
                error={error}
                setError={setError}
                amountError={amountError}
                setAmountError={setAmountError}
                setTransactionFee={setTransactionFee}
                transactionFee={transactionFee}
                Amount={Amount}
                setWalletNotFound={setWalletNotFound}
            />;
      case 1:
        return <ExchangeMoneyForm2 
                  convertedAmount={convertedAmount}
                  toCurrency={toCurrency}
                  fromCurrency={fromCurrency}
                  Amount={Amount}
                  fee={transactionFee}
                  totalAmount={totalAmount}
                  error={error}
                />;
      default:
        return null;
    }
  };

  

  // Calculate Total Amount
  useEffect(()=> {
    if (Amount && transactionFee) {
      const transaction_fee = transactionFee
      const total_amount    = parseFloat(Amount) + transaction_fee
      setTotalAmount(total_amount);

    }
  }, [Amount, transactionFee]);

  


  return (
    <>
    <Main open={open}>
      <DrawerHeader />

    <Box sx={{ 
              width: {xs: '100%', sm: '80%', md: '50%'}, 
              marginTop: {xs: '40px', sm: '1rem'},
              borderRadius: '5%',
              backdropFilter: 'blur( 20px )',
              boxShadow: '7px 7px 28px #aaaaaa, -7px -7px 28px #ffffff',
              marginLeft: {xs: '0%', sm: '10%', md:'20%'},
              background: '#F0F8FF',
              height: {xs:'100%', sm: '98%'},
              overflowY:'auto'
            }}>
      <p className='fs-3 d-flex justify-content-center my-1' style={{paddingTop:15}}>Exchange Money</p> <br />


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
                          marginTop: '4%' }}>
                
                  {/* <Box sx={{ flex: '1 1 auto' }}  /> */}
              
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete} variant='contained'  
                            sx={{marginRight: {xs: '4%', lg: '3%'},
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

    {walletNotFound && 
      <Box 
        sx={{
          position:'fixed',
          zIndex:1000,
          bottom:16,
          right:16
        }}
        >
          <Alert sx={{maxWidth:'20rem'}} severity="error">Do not have existing Wallet, Please login using another account</Alert>
      </Box>
    }

  </Main>
</>


  );
};



