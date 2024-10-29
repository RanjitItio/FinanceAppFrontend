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
import { handleCryptoWallets, handleCryptoWalletAddress, handleFIATWallets, 
  handleCryptoSwapAssignedFee, handleConvertCryptoToUSD, handleWalletCurrencyConvertToUSD,
  handleSubmitCryptoData, getCurrencyIcon } from './BuyAPI';
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
  SwapQuantity, updateSwapQuantity, chargedFee, fromWalletCryptoName, error
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
          const { name, value } = e.target;

          if (value === '') {
            setCryptoQtyError('')
            updateSwapQuantity(value)

          } else if (Number(value) === 0 || Number(value) < 0){
            setCryptoQtyError('Please type valid number');

          } else if (value.length > 8) {
            setCryptoQtyError('Amount should be less than 8 digit');

          } else if (/^\d*\.?\d*$/.test(value) || value === '' || Number(value) > 0) {
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
                    <FormHelperText sx={{ml:3}}>Fee: {chargedFee ? chargedFee.toFixed(3) : 0 } {fromWalletCryptoName}</FormHelperText>
              </Grid>

              <Grid item xs={12}>
                  <TextField
                      id="converted-amount"
                      label="Converted Amount"
                      variant="outlined"
                      size='small'
                      disabled
                      // value={props.convertedAmount ? props.convertedAmount.toFixed(3) : 0}
                      sx={{width: '90%', marginLeft: '3%', marginTop: '5px'}}
                      />
              </Grid>
            </Grid>

            {error &&
              <Alert severity="error">
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

    const [currency, setCurrency]              = React.useState('');     // Selected Currency value
    const [paymentMethod, setPaymentMethod]    = React.useState('');  // Payment Mode
    const [amount, setAmount]                  = React.useState('');    // Amount
    const [error, setError]                    = React.useState('');      // Error Message
    const [totalAmount, setTotalAmount]        = React.useState('');  // Total amount
    const [cryptoWallets, updateCryptoWallets] = useState([]);    // Crypto Wallets of user
    const [fromCrypto, updateFromCrypto]       = useState('');    // To Crypto State
    const [toCrypto, updateToCrypto]           = useState('');    // To Crypoto state
    const [SwapQuantity, updateSwapQuantity]   = useState('');   // Crypto swap quantity
    const [chargedFee, setChargedFee]          = useState(0);  // Charged Fee
    const [fromWalletCryptoName, setFromWalletCryptoName] = useState('');


    // console.log('chargedFee', chargedFee)
   
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
                // fee: transactionFee,
                // total_amount: totalAamount,
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
                />;
        case 1:
            return <Form2
                      
                    />;
        default:
            return null;
        }
    };


    //// Crypto API Parts
    //////////////////////
    // Fetch all the available crypto wallet of user
    useEffect(() => {
        handleCryptoWallets({updateCryptoWallets})
    }, []);

    // Get assigned fee for Crypto Buy Transaction
      useEffect(() => {
        if (SwapQuantity) {
           const convertToFloat = parseFloat(SwapQuantity)
           handleCryptoSwapAssignedFee({convertToFloat, setChargedFee})
        } else {
          setChargedFee(0)
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
                <p className='fs-2 d-flex justify-content-center'>Swap Crypto</p> <br />

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
                                <Button onClick={handleComplete} variant='contained' 
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
