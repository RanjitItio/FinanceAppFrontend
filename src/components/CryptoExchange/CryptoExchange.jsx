import {Main, DrawerHeader} from '../Content';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axiosInstance from '../Authentication/axios';
import { useEffect, useState } from 'react';
import StepLabel from '@mui/material/StepLabel';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';
import { handleUserCryptoWallets, handleCheckCryptoWallet, handleUserFIATWallets,
    handleCryptoExchangeAssignedFee, handleConvertCryptoToUSD, handleWalletCurrencyConvertFromUSD
 } from './ExchangeAPI';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';


const steps = ['Step 1', 'Step 2'];




// First Form
function Form1({cryptoWallet, setCryptoWallet, userCryptoWallets, error, setError, userFiatWallet, setFiatWallet, fiatWallet,
    exchangeAmount, setExchangeAmount, chargedFee, CryptoWalletName, exchangeResult
}) {

    const [cryptoQtyError, setCryptoQtyError]       = useState(''); // Crypto Quantity error
    const [cryptoWalletBalance, setCryptoWalletBalance] = useState(0);
    const [fiatWalletBalance, setFiatWalletBalance]     = useState(0);
    

      /// Update selected from crypto value
      const handleCryptoWalletChange = (e)=> {
          const { name, value } = e.target;
          setCryptoWallet(value);
      };

      // Update To Crypto value
      const handleFiatWalletChange = (e)=> {
        const { name, value } = e.target;
        setFiatWallet(value);
      };

      // Get Crypto convertible quantity
      const handleCryptoQuantityChange = (e)=> {
          const { name, value } = e.target

          if (value === '') {
             setCryptoQtyError('');
             setExchangeAmount(value);

          } else if (Number(value) < 0){
              setCryptoQtyError('Please type valid number');

          } else if (value.length > 17) {
              setCryptoQtyError('Amount should be less than 17 digit');

          } else if (/^\d*\.?\d*$/.test(value)) {
              setCryptoQtyError('');
              setExchangeAmount(value);

          } else {
              setCryptoQtyError('Please type valid number');
          }
      };

  
      // Get Crypto wallet balance
      useEffect(() => {
         if (userCryptoWallets && cryptoWallet) {
            const walletFrom = userCryptoWallets.find((wallet)=> wallet.id === cryptoWallet)
            const WalletBalance = walletFrom.balance;
            setCryptoWalletBalance(WalletBalance)
         }
      }, [userCryptoWallets, cryptoWallet]);


    //   // Get FIAT Wallet Balance
      useEffect(() => {
         if (userFiatWallet && fiatWallet) {
            const walletTo = userFiatWallet.find((wallet)=> wallet.id === fiatWallet)
            const WalletBalance = walletTo.balance;
            setFiatWalletBalance(WalletBalance)
         }
      }, [userFiatWallet, fiatWallet]);
  

  
    return(
      <>
        <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Exchange your cryptocurrency seamlessly with our trusted payment methods. 
            Please ensure all details are accurate and specify the amount you wish to Exchange.
        </small>
  
        <div style={{marginLeft: '2%', marginRight: '0%'}}>

            <Grid container spacing={2} sx={{marginTop: '2%'}} >
              <Grid item xs={12} lg={5}>
                  <FormControl size='small' sx={{marginLeft: {xs:'4%', lg: '8%'}, width:{xs:'90%', lg: '100%'}}}>
                      <InputLabel id="from-balance-select-label">Crypto Wallet</InputLabel>
                      <Select
                        id="crypto-wallet-select"
                        label="Crypto Wallet"
                        name='crypto_wallet'
                        value={cryptoWallet}
                        onChange={handleCryptoWalletChange}
                      >
                      <MenuItem value={''}>None</MenuItem>
                        {userCryptoWallets.map((wallet, index)=> (
                          <MenuItem key={index} value={wallet.id}>
                            {wallet.crypto_name}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                          <b>From</b> Balance: {cryptoWalletBalance ? parseFloat(cryptoWalletBalance).toFixed(7) : 0}
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
                      <InputLabel id="to-balance-select-label">FIAT Wallet</InputLabel>
                        <Select
                          id="fiat-wallet-selet"
                          label="FIAT Wallet"
                          name='fiat_wallet'
                          value={fiatWallet}
                          onChange={handleFiatWalletChange}
                          >
                            <MenuItem value={""}>None</MenuItem>
                            {userFiatWallet.map((wallet, index)=> (
                              <MenuItem key={index} value={wallet.id}>
                                  {wallet.currency}
                              </MenuItem>
                          ))}
                        </Select>
                      <FormHelperText>
                        <b>To</b> Balance: {fiatWalletBalance ? parseFloat(fiatWalletBalance).toFixed(7) : 0}
                      </FormHelperText>
                  </FormControl>
              </Grid>

              <Grid item xs={12}>
                  <TextField 
                      id="quantity" 
                      name='crypto_quantity'
                      placeholder='Quantity' 
                      variant="outlined" 
                      size='small' 
                      sx={{width: '90%', marginLeft: '3%'}}
                      value={exchangeAmount}
                      onChange={(e)=> handleCryptoQuantityChange(e)}
                      error={cryptoQtyError !== ''}
                      helperText={cryptoQtyError !== '' ? cryptoQtyError : ''}
                      />
                    <FormHelperText sx={{ml:3}}>Fee: {chargedFee ? parseFloat(chargedFee).toFixed(3) : 0 } {CryptoWalletName}</FormHelperText>
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
                <Alert severity="error" sx={{mt:0.5}}>
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

    const CalculateTotalAmount = (amount, fee)=> {
        const float_amount = parseFloat(amount)
        const float_fee    = parseFloat(fee)

        const totalAmount = float_amount + float_fee

        const fixedDecimalValue = totalAmount.toFixed(10)
        return fixedDecimalValue
    };

    return(
      <>
        <small className='text-muted d-flex justify-content-center my-3'>
          Check your Exchnage information before confirmation.
        </small>
  
        <div style={{marginLeft: '6%', marginRight: '6%', marginTop: '8%'}}>
          <div className="my-1">
            <div className="d-flex justify-content-between">
                <p>Exchange Amount</p> 
                <p>{props.exchangeAmount} {props.CryptoWalletName}</p>
            </div>
            <hr/>
          </div>

          <div className="my-2">
            <div className="d-flex justify-content-between">
                <p>Converted FIAT Amount</p> 
                <p>{props.exchangeResult ? parseFloat(props.exchangeResult).toFixed(7) : 0} {props.findWalletCurrencyName}</p>
            </div>
            <hr/>
          </div>
  
          <div className="d-flex justify-content-between">
              <p>Fee: </p> 
              <p>{props.chargedFee ? parseFloat(props.chargedFee).toFixed(7) : 0} {props.CryptoWalletName}</p>
          </div>
          <hr/>
  
          <div className="d-flex justify-content-between">
            <p><b>Total</b></p> <p><b>{CalculateTotalAmount(props.exchangeAmount, props.chargedFee)}  {props.CryptoWalletName}</b></p>
          </div>
          <hr/>
        </div>

        {props.error && 
            <Alert severity="error">{props.error}</Alert>
        }
      </>
  
    );
  };




/// Exchange Crypto for User
export default function ExchangeCrypto({open}) {
    const navigate = useNavigate()  
    const [activeStep, setActiveStep] = React.useState(0);  // Currenct step
    const [completed, setCompleted]   = React.useState({}); // Completed step

    const [cryptoWallet, setCryptoWallet]              = useState('');   // Crypto Wallet
    const [userCryptoWallets, updateUserCryptoWallets] = useState([]);  // Crypto Wallets of user
    const [error, setError]                            = useState('');  // Error Message
    const [exchangeAmount, setExchangeAmount]          = useState(0);   // Exchange Amount
    const [InsufficientFund, setInsufficientFund]      = useState(false);  // Insuficient Crypto Wallet balance
    const [userFiatWallet, setUserFiatWallet]          = useState([]);  // FIAT Wallets of user
    const [fiatWallet, setFiatWallet]                  = useState('');  // User's FIAT Wallet
    const [chargedFee, setChargedFee]                  = useState(0);  // Crypto Exchange Fee
    const [CryptoWalletName, setCryptoWalletName]      = useState(''); // Crypto name of selected Wallet
    const [exchangeResult, setExchangeResult]          = useState('');  // Converted FIAT Amount
    const [convertedUSDValue, setConvertedUSDValue]    = useState(0);  // Value after crypto conversion
    const [findWalletCurrencyName, setFindWalletCurrencyName] = useState('');  // Wallet Currency Name
    const [currencyConversionAmount, setCurrencyConversionAmount] = useState(0); // From Crypto usd to Wallet currency
    const [successMessage, setSuccessMessage]  = useState('');



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
            if (!cryptoWallet) {
                setError('Please Select Crypto Wallet');

            } else if (!fiatWallet) {
                setError('Please select Fiat Wallet');

            } else if (!exchangeAmount) {
                setError('Please fill amount to Exchange')

            } else if (parseFloat(exchangeAmount) === 0 || parseFloat(exchangeAmount) < 0) {
                setError('Amount must be greater than Zero')

            } else if (InsufficientFund) {
                setError(error);

            } else {
                setError('')
                newCompleted[activeStep] = true;
                setCompleted(newCompleted);
                handleNext();
            };

        } else {
    
            axiosInstance.post(`/api/v6/user/crypto/exchange/`, {
                crypto_wallet_id: parseInt(cryptoWallet),
                fiat_wallet_id: parseInt(fiatWallet),
                exchange_amount: parseFloat(exchangeAmount),
                converted_amount: parseFloat(exchangeResult)
                
            }).then((res)=> {
                // console.log(res)

                if (res.status === 200) {
                    setSuccessMessage('Transation created Successfully');
                    setError('')
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    handleNext();
                }

            }).catch((error)=> {
                // console.log(error)
                if (error.response.data.message === 'Invalid Crypto Wallet') {
                    setError('Invalid Crypto Wallet')
                } else if (error.response.data.message === 'Invalid FIAT Wallet') {
                    setError('Invalid FIAT Wallet')
                } else if (error.response.data.message === 'Insufficient balance in Account') {
                    setError('Insufficient balance in Account')
                } else if (error.response.data.message === 'Insufficient balance in Account') {
                    setError('Insufficient balance in Account')
                }
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
                    cryptoWallet={cryptoWallet}
                    setCryptoWallet={setCryptoWallet}
                    userCryptoWallets={userCryptoWallets}
                    error={error}
                    setError={setError}
                    userFiatWallet={userFiatWallet}
                    fiatWallet={fiatWallet}
                    setFiatWallet={setFiatWallet}
                    exchangeAmount={exchangeAmount}
                    setExchangeAmount={setExchangeAmount}
                    chargedFee={chargedFee}
                    CryptoWalletName={CryptoWalletName}
                    exchangeResult={exchangeResult}
                />;
        case 1:
            return <Form2 
                    error={error}
                    chargedFee={chargedFee}
                    CryptoWalletName={CryptoWalletName}
                    exchangeAmount={exchangeAmount}
                    exchangeResult={exchangeResult}
                    findWalletCurrencyName={findWalletCurrencyName}
                />;
        default:
            return null;
        }
    };


    ////// CRYPTO API ////
    /////////////////////

    /// Get all active Crypto wallet of the user
    useEffect(() => {
        handleUserCryptoWallets({updateUserCryptoWallets});
    }, []);

    //// Get all the available FIAT Wallets of the user
    useEffect(() => {
        handleUserFIATWallets({setUserFiatWallet})
    }, []);


    //// Check Crypto Wallet balance of the user
    useEffect(() => {
       if (cryptoWallet && exchangeAmount) {
            handleCheckCryptoWallet({exchangeAmount, cryptoWallet, setError, setInsufficientFund})
       }
    }, [exchangeAmount, cryptoWallet]);

    
    /// Get Crypto Exchange Assigned Fee
    useEffect(() => {
      if (exchangeAmount) {
        const convertToFloat = parseFloat(exchangeAmount);
        handleCryptoExchangeAssignedFee({convertToFloat, setChargedFee});

      } else {
        setChargedFee(0);
      }
    }, [exchangeAmount]);


    /// Get the Crypto Name of Selected Crypto Wallet
    useEffect(() => {
        if (cryptoWallet && userCryptoWallets) {
            const CryptoID   = userCryptoWallets.find((wallet)=> wallet.id === cryptoWallet)
            const CryptoName = CryptoID.crypto_name

            setCryptoWalletName(CryptoName)
        };

    }, [cryptoWallet, userCryptoWallets]);


    /// Get currency name from user wallets
    useEffect(() => {
        if (userFiatWallet && fiatWallet) {
          const findWalletCurrency = userFiatWallet.find((wallet)=> wallet.id === fiatWallet)
          setFindWalletCurrencyName(findWalletCurrency.currency)
        }
  
      }, [userFiatWallet, fiatWallet]);


    // Get usd value of crypto from CoinGecko
    useEffect(() => {
        if (CryptoWalletName) {
            handleConvertCryptoToUSD({CryptoWalletName, setConvertedUSDValue, setError});
        } else {
          console.log('Crypto not available to convert')
        }
      }, [CryptoWalletName]);
    

    // Convert Wallet currency value against USD
    useEffect(() => {
        if (findWalletCurrencyName) {
              handleWalletCurrencyConvertFromUSD({findWalletCurrencyName, setCurrencyConversionAmount, setError});
        } else {
            console.log('Wallet Currency not available to convert')
        };
      }, [findWalletCurrencyName]);

    
    // Calculate Crypto Value
    useEffect(() => {
        setTimeout(() => {
            if (currencyConversionAmount && convertedUSDValue && exchangeAmount) {
                const AmountToBeConvert = (parseFloat(currencyConversionAmount) * parseFloat(convertedUSDValue)) * parseFloat(exchangeAmount)
                setExchangeResult(AmountToBeConvert)
  
            } else {
                console.log('Not able to calculate crypto value')
            }
        }, 1000);

      }, [currencyConversionAmount, convertedUSDValue, exchangeAmount]);
    


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
                <h2 style={{display:'flex', justifyContent:'center', paddingTop:20, marginBottom:-10}}>Exchange Crypto</h2> <br />

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
                        {/* All steps completed - you&apos;re finished */}
                        <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                            Thank you for the transaction! Your transaction is currently in pending approval, Once it has been reviewed and approved by our team, the amount will be credited to your FIAT wallet. 
                            We'll notify you as soon as the deposit is confirmed.
                        </Alert>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* <Button onClick={handleReset}>Reset</Button> */}
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
                                ? 'Confirm & Submit'
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