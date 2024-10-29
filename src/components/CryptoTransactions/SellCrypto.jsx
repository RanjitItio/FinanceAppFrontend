import {Main, DrawerHeader} from '../Content';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axiosInstance from '../Authentication/axios';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';
import StepLabel from '@mui/material/StepLabel';
import { handleCryptoWallets, handleCryptoWalletAddress, handleFIATWallets, handleCryptoSellAssignedFee,
  handleConvertCryptoToUSD, handleWalletCurrencyConvertToUSD, getCryptoIcons, getCurrencyIcon
 } from './SellAPI';
import CircularProgress from '@mui/material/CircularProgress';



const steps = ['Step 1', 'Step 2'];



// First Form
function Form1({cryptoWallets, crypto, setCrypto, walletAddress, userWallets, Walletcurrency, setWalletCurrency, 
    exchangeAmount, error, setError, setExchangeAmount, exchangeResult, cryptoName, findWalletCurrencyName
}) {
   

  /// Update Exchange amount value
  const handleChangeExchangeAmount = (e)=> {
      const { name, value } = e.target;

      if (value === '') {
        setError('')
        setExchangeAmount(value)
      } else if (Number(value) === 0 || Number(value) < 0) {
        setError('Amount should be greater than 0')

      } else if (value.length > 8) {
        setError('Amount should be less than 8 digit')

      } else if (/^\d*\.?\d*$/.test(value) || value === '' || Number(value) > 0) {
        setError('')
        setExchangeAmount(value)

      } else {
        setError('Please type valid amount')
      }
  };


  return(
      <>
        <small className='text-muted d-flex justify-content-center my-3' style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}>
            Sell Crypto Manually from comfort of your home, Quickly and Safely with Minimal Fees
        </small>
  
        <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '6%'}}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <Select 
                          placeholder='Crypto Wallet'
                          value={crypto}
                          indicator={<KeyboardArrowDown />}
                          onChange={(e, newValue) => setCrypto(newValue)}
                          sx={{
                            [`& .${selectClasses.indicator}`]: {
                              transition: '0.2s',
                              [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                              },
                            },
                          }}
                          >
                          {cryptoWallets.map((wallet, index)=> (
                              <Option key={index} value={wallet.id}>{wallet.crypto_name}</Option>
                          ))}
                        </Select>
                      </FormControl>

                    <FormHelperText sx={{ml:1}}>Select Crypto Wallet</FormHelperText>
                </Grid>


                <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <Input 
                            placeholder="Wallet Address" 
                            value={walletAddress ? walletAddress : ''}
                            />
                      </FormControl>
                      <FormHelperText sx={{ml:1}}>Wallet Address</FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <Select 
                          placeholder="Wallet Currency"
                          indicator={<KeyboardArrowDown />}
                          value={Walletcurrency}
                          onChange={(e, newValue)=> setWalletCurrency(newValue)}
                          sx={{
                            [`& .${selectClasses.indicator}`]: {
                              transition: '0.2s',
                              [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                              },
                            },
                          }}
                          > 
                          {userWallets.map((wallet, index)=> (
                              <Option key={index} value={wallet.id}>
                                  {wallet.currency}
                              </Option>
                          ))}
                        </Select>
                    </FormControl>
                    <FormHelperText sx={{ml:1}}>Select Wallet Currency</FormHelperText>
                </Grid>


                <Grid item xs={12} sm={6}>
                      <Input 
                        placeholder="Sell Quantity"
                        value={exchangeAmount}
                        onChange={handleChangeExchangeAmount}
                        startDecorator={getCryptoIcons(cryptoName)}
                      />
                </Grid>

                <Grid item xs={12} sm={6}>
                    {/* <SwapHorizIcon sx={{ml:1}} /> */}
                    <Input 
                        placeholder="You Get" 
                        sx={{ml:0}}
                        value={exchangeResult ? exchangeResult : ''}
                        startDecorator={getCurrencyIcon(findWalletCurrencyName)}
                      />
                </Grid> 
            </Grid>

            {error && 
              <Alert severity="error" sx={{mt:2}}>{error}.</Alert>
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
            Check your Sell Information before confirmation.
        </small>
  
        <div style={{marginLeft: '6%', marginRight: '6%', marginTop: '8%'}}>
          <div className="my-4">
            <div className="d-flex justify-content-between">
                <p>Sell Quantity</p> 
                <p>{props.exchangeAmount} {props.cryptoName}</p>
            </div>
            <hr className='mb-3'/>
          </div>

          <div className="my-4">
            <div className="d-flex justify-content-between">
                <p>Amount Receive</p> 
                <p>{props.exchangeResult} {props.findWalletCurrencyName}</p>
            </div>
            <hr className='mb-3' />
          </div>
  
          <div className="d-flex justify-content-between">
              <p>Fee: </p> 
              <p>{props.chargedFee} {props.cryptoName}</p>
          </div>
          <hr className='mb-4'/>
  
          <div className="d-flex justify-content-between">
            <p><b>Total</b></p> 
            <p><b>{(parseFloat(props?.exchangeAmount || 0) + parseFloat(props?.chargedFee || 0)).toFixed(3)} USD</b></p>
          </div>
          <hr className='mb-4'/>
        </div>

        {props.error && 
          <Alert severity="error">{props.error}</Alert>
        }
        {props.successMessage && 
          <Alert severity="success">{props.successMessage}</Alert>
        }
      </>
  
    );
  };



// Sell Crypto
export default function CryptoSell({open}) {
    const navigate = useNavigate()  
    const [activeStep, setActiveStep] = React.useState(0);  // Currenct step
    const [completed, setCompleted]   = React.useState({}); // Completed step

    const [cryptoWallets, updateCryptoWallets]    = useState([]);   // Crypto Wallet of user from API
    const [crypto, setCrypto]                     = useState('');  // Selected Crypto
    const [exchangeAmount, setExchangeAmount]     = useState(0);   // Selling Crypto Quantity
    const [exchangeResult, setExchangeResult]     = useState(0);   // Converted Crypto
    const [error, setError]                       = useState('');  // Error Message
    const [successMessage, setSuccessMessage]     = useState('');  // Success Message
    const [inSufficientFund, setInsufficientFund] = useState(false); // Insufficient Fund
    const [walletAddress, setWalletAddress]       = useState('');    // Wallet Address state
    const [userWallets, setUserWallets]           = useState([]);    // user Wallets from API
    const [Walletcurrency, setWalletCurrency]     = useState('');    // Wallet ID state
    const [cryptoName, setCryptoName]             = useState('');
    const [chargedFee, SetChargedFee]             = useState(0);  // Fee charged for Crypto Sell Transactions state
    const [disablebutton, setDisableButton]       = useState(false);
    const [findWalletCurrencyName, setFindWalletCurrencyName] = useState('');  // Wallet Currency Name

    const [convertedUSDValue, setConvertedUSDValue]           = useState(0);  // Value after crypto conversion
    const [currencyConversionAmount, setCurrencyConversionAmount] = useState(0); // From Crypto usd to Wallet currency


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

    /// Current step 
    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    // Final Step method
    const handleComplete = () => {
        const newCompleted = completed;

        if (activeStep == 0) {
            if (!crypto) {
                setError('Please Select Crypto Wallet');

            } else if (!walletAddress) {
                setError('Wallet has not activated yet.')

            } else if (!Walletcurrency) {
                setError('Please select Fiat wallet');

            } else if (!exchangeAmount) {
                setError('Enter Quantity to sell')

            } else if (inSufficientFund) {
                setError(error)

            } else {
                setError('')
                newCompleted[activeStep] = true;
                setCompleted(newCompleted);
                handleNext();
            };

        } else {
            setDisableButton(true);

            axiosInstance.post(`/api/v2/user/crypto/sell/`, {
                  crypto_wallet_id: parseInt(crypto),
                  wallet_id: parseInt(Walletcurrency),
                  selling_qty: parseFloat(exchangeAmount),
                  converted_amount: parseFloat(exchangeResult)

            }).then((res)=> {
                // console.log(res)
                
                if (res.status === 200 && res.data.success === true) {
                  setSuccessMessage('Crypto Sold successfully Please wait for Admin Approval')

                  setTimeout(() => {
                    setSuccessMessage('');
                    setError('')
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    handleNext();
                    setDisableButton(false)

                  }, 2000);
                }

              }).catch((error)=> {
                // console.log(error)
                setDisableButton(false);

                if (error.response.data.message === 'Invalid Crypto Wallet') {
                  setError('Invalid Crypto Wallet')
                } else if (error.response.data.message === 'Insufficient fund') {
                    setError('Insufficient Funds')
                } else if (error.response.data.message === 'Crypto wallet has not approved') {
                    setError('Crypto wallet has not approved yet')
                } else if (error.response.data.message === 'Invalid Wallet') {
                    setError('Invalid Wallet')
                } else {
                    setError('')
                };
              })
        };
    };

    /// Reset the state
    const handleReset = () => {
        navigate('/')
    };


    // Swicth between forms
    const renderForms = (step) => {
        switch(step){
        case 0:
            return <Form1
                    cryptoWallets={cryptoWallets}
                    crypto={crypto}
                    setCrypto={setCrypto}
                    walletAddress={walletAddress}
                    userWallets={userWallets}
                    setWalletCurrency={setWalletCurrency}
                    Walletcurrency={Walletcurrency}
                    exchangeAmount={exchangeAmount}
                    setExchangeAmount={setExchangeAmount}
                    error={error}
                    setError={setError}
                    exchangeResult={exchangeResult}
                    cryptoName={cryptoName}
                    findWalletCurrencyName={findWalletCurrencyName}
                />;
        case 1:
            return <Form2
                    exchangeAmount={exchangeAmount}
                    cryptoName={cryptoName}
                    chargedFee={chargedFee}
                    exchangeResult={exchangeResult}
                    findWalletCurrencyName={findWalletCurrencyName}
                    error={error}
                    successMessage={successMessage}
                    />;
        default:
            return null;
        }
    };


    //////////////////////////
    // Crypto Conversion API Calls
    ///////////////////////////////

    // Fetch all the available crypto wallet of user
    useEffect(() => {
      handleCryptoWallets({updateCryptoWallets})
    }, []);

     // Check user crypto Wallet balance
     useEffect(() => {
      if (exchangeAmount && crypto) {

           axiosInstance.post(`/api/v1/user/crypto/wallet/balance/check/`, {
                wallet_id: crypto,
                amount: parseFloat(exchangeAmount ? exchangeAmount : 0)

           }).then((res)=> {
              // console.log(res)
              if (res.status === 200) {
                  setInsufficientFund(false);
              }

           }).catch((error)=> {
                if (error.response.data.message === 'Wallet not found') {
                    setError('Invalid Wallet')
                    setInsufficientFund(true)

                } else if (error.response.data.message === 'Donot have sufficient balance in Wallet') {
                    setError('Insuficient balance in Wallet')
                    setInsufficientFund(true)
                } else {
                  setInsufficientFund(false)
                  setError('')
                }
           })
      }
  }, [exchangeAmount, crypto]);


    // Fetch wallet address according to the selected Crypto
      useEffect(() => {
        if (crypto) {
          handleCryptoWalletAddress({setWalletAddress, crypto})
        }
    }, [crypto]);


    // Fetch available wallet of the User
    useEffect(() => {
        handleFIATWallets({setUserWallets})
    }, []);


    /// Get currency name from user wallets
    useEffect(() => {
      if (userWallets && Walletcurrency) {
        const findWalletCurrency = userWallets.find((wallet)=> wallet.id === Walletcurrency)
        setFindWalletCurrencyName(findWalletCurrency.currency)
      }

    }, [userWallets, Walletcurrency]);

    /// Get Crypto currency name from user wallets
    useEffect(() => {
      if (cryptoWallets && crypto) {
        const findCryptoCurrencyName = cryptoWallets.find((wallet)=> wallet.id === crypto)
        setCryptoName(findCryptoCurrencyName.crypto_name)
      }

    }, [cryptoWallets, crypto]);

    // Get assigned fee for Crypto Buy Transaction
    useEffect(() => {
      if (exchangeAmount) {
        handleCryptoSellAssignedFee({exchangeAmount, SetChargedFee})
      } else {
        SetChargedFee(0)
      }
    }, [exchangeAmount]);


    // Get usd value of crypto from CoinGecko
    useEffect(() => {
      if (cryptoName) {
          handleConvertCryptoToUSD({cryptoName, setConvertedUSDValue, setError});
      } else {
        console.log('Crypto not available to convert')
      }
    }, [cryptoName]);


    // Convert Wallet currency value against USD
    useEffect(() => {
      if (findWalletCurrencyName) {
            handleWalletCurrencyConvertToUSD({findWalletCurrencyName, setCurrencyConversionAmount, setError});
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
                    width: {xs: '100%', sm: '85%', md:'50%'},
                    marginTop: {xs: '40px', sm: '1rem'},
                    marginLeft: {xs: '0%', sm: '10%', md:'20%'},
                    background: '#F0F8FF',
                    backdropFilter: 'blur( 20px )',
                    boxShadow: '7px 7px 9px #5a5a5a, -7px -7px 9px #ffffff',
                    borderRadius: '5%',
                    height: {xs:'100%', sm: '100%'}
                    }}
                    >
                <p
                  style={{
                    display:'flex',
                    justifyContent:'center',
                    fontSize:30,
                    paddingTop:10,
                    marginBottom:-10
                  }}
                >
                    Sell Crypto
                </p> <br />

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
                            Your transaction is currently in pending, After approval from admin your amount will be deposited to your account. 
                            We'll notify you once your Sell has been approved.
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
                                sx={{marginRight: '4%', mb:{xs:3, sm:3, md:0}}}
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