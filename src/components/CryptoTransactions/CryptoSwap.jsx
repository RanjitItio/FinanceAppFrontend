import {Main, DrawerHeader} from '../Content';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect } from 'react';
// import Select, { selectClasses } from '@mui/joy/Select';
import Select from '@mui/material/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import Input from '@mui/joy/Input';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { handleCryptoSwapAssignedFee, handleCryptoWallets, handleConvertToCrypto, handleConvertFromCrypto } from './SwapAPI';
import { useState } from 'react';
import axiosInstance from '../Authentication/axios';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';
import StepLabel from '@mui/material/StepLabel';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { InputLabel, MenuItem, TextField } from '@mui/material';




const steps                   = ['Step 1', 'Step 2'];
const user_selected_wallet    = localStorage.getItem('UserSelectedWalletID')
const user_selected_wallet_id = parseInt(user_selected_wallet, 10)



// First Form
function Form1({cryptoWallets, fromCrypto, updateFromCrypto, toCrypto, updateToCrypto, 
  SwapQuantity, updateSwapQuantity, chargedFee, fromWalletCryptoName, error, exchangeResult
}) {
    const [cryptoQtyError, setCryptoQtyError]       = useState(''); // Crypto Quantity error
    const [fromCryptoBalance, setFromCryptoBalance] = useState(0);
    const [toCryptoBalance, setToCryptoBalance]     = useState(0);
    
      /// Update selected from crypto value
      const handleFromCryptoChange = (e)=> {
          const { name, value } = e.target;
          updateFromCrypto(value);
      };

      // Update To Crypto value
      const handleToCryptoChange = (e)=> {
        const { name, value } = e.target;
        updateToCrypto(value);
      };

      // Get Crypto convertible quantity
      const handleCryptoQuantityChange = (e)=> {
          const { name, value } = e.target

          if (value === '') {
             setCryptoQtyError('');
             updateSwapQuantity(value);

          } else if (Number(value) < 0){
              setCryptoQtyError('Please type valid number');

          } else if (value.length > 8) {
              setCryptoQtyError('Amount should be less than 8 digit');

          } else if (/^\d*\.?\d*$/.test(value)) {
              setCryptoQtyError('');
              updateSwapQuantity(value);

          } else {
              setCryptoQtyError('Please type valid number');
          }
      };

  
      // Get from Crypto wallet balance
      useEffect(() => {
         if (cryptoWallets && fromCrypto) {
            const walletFrom = cryptoWallets.find((wallet)=> wallet.id === fromCrypto)
            const WalletBalance = walletFrom.balance;
            setFromCryptoBalance(WalletBalance)
         }
      }, [cryptoWallets, fromCrypto]);


      // Get To Crypto wallet balance
      useEffect(() => {
         if (cryptoWallets && toCrypto) {
            const walletTo = cryptoWallets.find((wallet)=> wallet.id === toCrypto)
            const WalletBalance = walletTo.balance;
            setToCryptoBalance(WalletBalance)
         }
      }, [cryptoWallets, toCrypto]);
      

  return(
      <>
        <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            You can exchange your Crypto to another Crpto using our popular payment system. Fill the details correctly & the amount you want to swap.
        </small>

        <div style={{marginLeft: '2%', marginRight: '0%'}}>

            <Grid container spacing={2} sx={{marginTop: '2%'}} >
              <Grid item xs={12} lg={5}>
                  <FormControl size='small' sx={{marginLeft: {xs:'4%', lg: '8%'}, width:{xs:'90%', lg: '100%'}}}>
                      <InputLabel id="from-balance-select-label">From Wallet</InputLabel>
                      <Select
                        id="from-balance-select"
                        label="From Wallet"
                        name='from_wallet'
                        value={fromCrypto}
                        onChange={handleFromCryptoChange}
                      >
                      <MenuItem value={''}>None</MenuItem>
                        {cryptoWallets.map((wallet, index)=> (
                          <MenuItem key={index} value={wallet.id}>
                            {wallet.crypto_name}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                          <b>From</b> Balance: {fromCryptoBalance ? parseFloat(fromCryptoBalance).toFixed(7) : 0}
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
                      <InputLabel id="to-balance-select-label">To Wallet</InputLabel>
                        <Select
                          id="to-balance-select"
                          label="To Wallet"
                          value={toCrypto}
                          onChange={handleToCryptoChange}
                          >
                            <MenuItem value={""}>None</MenuItem>
                            {cryptoWallets.filter((wallet)=> wallet.id !== fromCrypto).map((wallet, index)=> (
                              <MenuItem key={index} value={wallet.id}>
                                  {wallet.crypto_name}
                              </MenuItem>
                            ))}
                        </Select>
                      <FormHelperText>
                        <b>To</b> Balance: {toCryptoBalance ? parseFloat(toCryptoBalance).toFixed(7) : 0}
                      </FormHelperText>
                  </FormControl>
              </Grid>

              <Grid item xs={12}>
                  <TextField 
                      id="quantity" 
                      placeholder='Quantity' 
                      variant="outlined" 
                      size='small' 
                      sx={{width: '90%', marginLeft: '3%'}}
                      value={SwapQuantity}
                      onChange={(e)=> handleCryptoQuantityChange(e)}
                      error={cryptoQtyError !== ''}
                      helperText={cryptoQtyError !== '' ? cryptoQtyError : ''}
                      />
                    <FormHelperText sx={{ml:3}}>Fee: {chargedFee ? chargedFee.toFixed(9) : 0 } {fromWalletCryptoName}</FormHelperText>
              </Grid>

              <Grid item xs={12}>
                  <TextField
                      id="converted-amount"
                      label="Converted Amount"
                      variant="outlined"
                      size='small'
                      disabled
                      value={exchangeResult ? exchangeResult : 0}
                      sx={{width: '90%', marginLeft: '3%', marginTop: '5px'}}
                      />
              </Grid>
            </Grid>

            {error &&
              <Alert severity="error" sx={{mt:2}}>
                  <AlertTitle>Error</AlertTitle>
                      {error}
              </Alert>
              }

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
                <p>From Crypto</p> 
                <p>{props.SwapQuantity} {props.fromWalletCryptoName}</p>
            </div>
            <hr className='mb-3'/>
          </div>

          <div className="my-4">
            <div className="d-flex justify-content-between">
                <p>To Crypto</p> 
                <p>{props.exchangeResult} {props.toWalletCryptoName}</p>
            </div>
            <hr className='mb-3'/>
          </div>
  
          <div className="d-flex justify-content-between">
              <p>Fee: </p> 
              <p>{props.chargedFee ? props.chargedFee.toFixed(6) : 0} {props.fromWalletCryptoName}</p>
          </div>
          <hr className='mb-4'/>
  
          <div className="d-flex justify-content-between">
            <p><b>Total: </b></p> 
            <p><b>{(parseFloat(props.SwapQuantity) + parseFloat(props.chargedFee)).toFixed(5)} {props.fromWalletCryptoName}</b></p>

          </div>
          <hr className='mb-4'/>
        </div>

        {props.successMessage && 
          <Alert severity="success">{props.successMessage}</Alert>
        }

        {props.error && 
          <Alert severity="error">{props.error}</Alert>
        }
      </>
  
    );
};




/// Buy Crypto for user
export default function CryptoSwap({open}) {

    const navigate = useNavigate()  
    const [activeStep, setActiveStep] = React.useState(0);  // Currenct step
    const [completed, setCompleted]   = React.useState({}); // Completed step

    const [error, setError]                    = React.useState(''); // Error Message
    const [successMessage, setSuccessMessage]  = React.useState(''); // Success Message
    const [cryptoWallets, updateCryptoWallets] = useState([]);    // Crypto Wallets of user
    const [fromCrypto, updateFromCrypto]       = useState('');    // To Crypto State
    const [toCrypto, updateToCrypto]           = useState('');    // To Crypoto state
    const [SwapQuantity, updateSwapQuantity]   = useState('');   // Crypto swap quantity
    const [chargedFee, setChargedFee]          = useState(0);  // Charged Fee
    const [fromWalletCryptoName, setFromWalletCryptoName] = useState('');  // From Wallet Crypto Name
    const [toWalletCryptoName, setToWalletCryptoName]     = useState('');  // To Wallet Crypto Name
    const [exchangeResult, setExchangeResult]             = useState(0);   // Exchange Result
    const [fromCryptoUSDValue, setFromCryptoUSDValue]     = useState(0);  /// From Crypto USD Value
    const [toCryptoUSDValue, setToCryptoUSDValue]         = useState(0);  /// To Crypto USD Value
    const [disableButton, setDisableButton]               = useState(false);  // Disable Confirm Button
    const [inSufficientFund, setInsufficientFund]         = useState(false); // Insufficient Fund

  

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
            ? 
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
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
          if (!fromCrypto) {
              setError('Please Select From Wallet');

          } else if (!toCrypto) {
              setError('Please select To Crypto')

          } else if (!SwapQuantity) {
              setError('Please type Swap Quantity')

          } else if (parseFloat(SwapQuantity) === 0) {
              setError('Amount must be greater than 0')

          } else if (inSufficientFund) {
              setError(error);

          } else {
              setError('')
              newCompleted[activeStep] = true;
              setCompleted(newCompleted);
              handleNext();
          };

        } else {
            setDisableButton(true);

            axiosInstance.post(`/api/v2/user/crypto/swap/`, {
                from_wallet_id: parseInt(fromCrypto ? fromCrypto : 0),
                to_wallet_id: parseInt(toCrypto ? toCrypto : 0),
                swap_amount: parseFloat(SwapQuantity ? SwapQuantity : 0),
                converted_crypto: parseFloat(exchangeResult ? exchangeResult : 0)

            }).then((res)=> {
                // console.log(res)
                if (res.status === 201) {
                    setSuccessMessage('Transaction Created Successfully')

                    setTimeout(() => {
                      setError('')
                      newCompleted[activeStep] = true;
                      setCompleted(newCompleted);
                      handleNext();
                      setSuccessMessage('')
                      setDisableButton(false);
                    }, 1000);
                }

            }).catch((error)=> {
                // console.log(error)
                setDisableButton(false);
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
                    cryptoWallets={cryptoWallets}
                    fromCrypto={fromCrypto}
                    updateFromCrypto={updateFromCrypto}
                    toCrypto={toCrypto}
                    updateToCrypto={updateToCrypto}
                    SwapQuantity={SwapQuantity}
                    updateSwapQuantity={updateSwapQuantity}
                    chargedFee={chargedFee}
                    fromWalletCryptoName={fromWalletCryptoName}
                    error={error}
                    exchangeResult={exchangeResult}
                />;
        case 1:
            return <Form2
                      SwapQuantity={SwapQuantity}
                      fromWalletCryptoName={fromWalletCryptoName}
                      exchangeResult={exchangeResult}
                      toWalletCryptoName={toWalletCryptoName}
                      chargedFee={chargedFee}
                      successMessage={successMessage}
                      error={error}
                    />;
        default:
            return null;
        }
    };


    //// Crypto API Parts //
    //////////////////////

    // Fetch all the available crypto wallet of user
      useEffect(() => {
          handleCryptoWallets({updateCryptoWallets})
      }, []);


    /// Check Crypto Wallet balance
    useEffect(() => {
        if (SwapQuantity && fromCrypto) {
            axiosInstance.post(`/api/v1/user/crypto/wallet/balance/check/`, {
                wallet_id: fromCrypto,
                amount: parseFloat(SwapQuantity ? SwapQuantity : 0)

            }).then((res)=> {
              // console.log(res)
              
              if (res.status === 200) {
                  setInsufficientFund(false);
                  setError('');
              }

            }).catch((error)=> {
                // console.log(error)

                if (error.response.data.message === 'Wallet not found') {
                    setError('Invalid Wallet Address');
                    setInsufficientFund(true);

                } else if (error.response.data.message === 'Donot have sufficient balance in Wallet') {
                    setError('Insufficient balance in Wallet');
                    setInsufficientFund(true);

                } else if (error.response.data.message === 'Inactive Wallet') {
                    setError('Inactive Wallet')
                    setInsufficientFund(true);

                } else {
                    setError('');
                    setInsufficientFund(false);

                };
            })
        }
    }, [SwapQuantity, fromCrypto]);
    
    
    
    // Get assigned fee for Crypto Swap Transaction
      useEffect(() => {
        if (SwapQuantity) {
           const convertToFloat = parseFloat(SwapQuantity)
           handleCryptoSwapAssignedFee({convertToFloat, setChargedFee});

        } else {
          setChargedFee(0);
          
        }

    }, [SwapQuantity]);


    //// Get the Name of From Wallet Crypto Name
    useEffect(() => {
        if (cryptoWallets && fromCrypto) {
           const CryptoID       = cryptoWallets.find((wallet)=> wallet.id === fromCrypto)
           const fromCryptoName = CryptoID.crypto_name

           setFromWalletCryptoName(fromCryptoName);
        };
    }, [fromCrypto, cryptoWallets]);


    //// Get the Name of To Wallet Crypto Name
    useEffect(() => {
        if (cryptoWallets && toCrypto) {
           const CryptoID     = cryptoWallets.find((wallet)=> wallet.id === toCrypto)
           const toCryptoName = CryptoID.crypto_name

           setToWalletCryptoName(toCryptoName);
        };
    }, [toCrypto, cryptoWallets]);


    /// Convert From Crypto to its USD Value
    useEffect(() => {
        if (fromWalletCryptoName) {
          handleConvertFromCrypto({fromWalletCryptoName, setFromCryptoUSDValue, setError})
        }
    }, [fromWalletCryptoName]);


    /// Convert To Crypto to its USD Value
    useEffect(() => {
        if (toWalletCryptoName) {
          handleConvertToCrypto({toWalletCryptoName, setError, setToCryptoUSDValue})
        }
    }, [toWalletCryptoName]);
    

    /// Calculate Crypto Value
    useEffect(() => {
       if (fromCryptoUSDValue && SwapQuantity && toCryptoUSDValue) {
           const comparisionAmount = parseFloat(fromCryptoUSDValue) / parseFloat(toCryptoUSDValue)

           const calculatedAmount = parseFloat(comparisionAmount) * parseFloat(SwapQuantity)

           setExchangeResult(calculatedAmount)
       }

    }, [fromCryptoUSDValue, SwapQuantity, toCryptoUSDValue]);
    


    

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
                    height: {xs:'100%'}
                    }}
                    >
                <h2 style={{display:'flex', justifyContent:'center', paddingTop:20, marginBottom:-10}}>Swap Crypto</h2> <br />

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
                      <Typography variant='div' sx={{ mt: 2, mb: 1 }}>
                          <Alert severity="success">
                          <AlertTitle>Success</AlertTitle>
                              Thank you for the transaction! Your transaction is currently in pending, After approval from admin your Crypto will get deposited to your wallet. 
                              We'll notify you once your Transaction has been approved.
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
                                <Button 
                                  onClick={handleComplete} 
                                  variant='contained'
                                  disabled={disableButton}
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
