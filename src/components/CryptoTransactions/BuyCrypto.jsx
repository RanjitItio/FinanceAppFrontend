import {Main, DrawerHeader} from '../Content';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect } from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import Input from '@mui/joy/Input';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { handleCryptoWallets, handleCryptoWalletAddress, handleFIATWallets, 
  handleCryptoBuyAssignedFee, handleConvertCryptoToUSD, handleWalletCurrencyConvertToUSD,
  handleSubmitCryptoData, getCurrencyIcon, getCryptoIcons } from './BuyAPI';
import { useState } from 'react';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';
import StepLabel from '@mui/material/StepLabel';
import axiosInstance from '../Authentication/axios';




const steps                   = ['Step 1', 'Step 2'];
const user_selected_wallet    = localStorage.getItem('UserSelectedWalletID')
const user_selected_wallet_id = parseInt(user_selected_wallet, 10)



// First Form
function Form1({cryptoWallets, crypto,setCrypto, walletAddress,
  Walletcurrency, setWalletCurrency, userWallets, exchangeAmount, setExchangeAmount,
  exchangeResult, findWalletCurrencyName, chargedFee, error, setError, cryptoName
}) {


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
            Buy Crypto Manually from comfort of your home, Quickly and Safely with Minimal Fees
        </small>
  
        <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '6%'}}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>

                    <FormControl sx={{minWidth: 120, width: '96%' }} size="small">
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
                </Grid>


                <Grid item xs={12} sm={6}>

                    <FormControl sx={{ minWidth: 120, width: '96%'}} size="small">
                        <Input 
                          placeholder="Wallet Address" 
                          value={walletAddress ? walletAddress : ''}
                          />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>

                    <FormControl sx={{ minWidth: 120, width: '96%'}} size="small">
                          <Input 
                            placeholder="Amount"
                            value={exchangeAmount}
                            onChange={handleChangeExchangeAmount}
                            startDecorator={getCurrencyIcon(findWalletCurrencyName)}
                            />
                    </FormControl>

                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 120, width: '96%'}} size="small">
                        <Select 
                            placeholder='Wallet Currency'
                            value={Walletcurrency}
                            onChange={(e, newValue) => setWalletCurrency(newValue)}
                            indicator={<KeyboardArrowDown />}
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
                </Grid>

                <Grid item xs={12} sm={6}>
                    {/* <SwapHorizIcon sx={{ml:1.5}} />  */}
                    <FormControl sx={{ minWidth: 120, width: '96%'}} size="small">
                        <Input 
                          placeholder="Crypto" 
                          sx={{ml:0}}
                          value={exchangeResult}
                          startDecorator={getCryptoIcons(cryptoName)}
                          />
                    </FormControl>

                    <FormHelperText>Fee Charge: {getCurrencyIcon(findWalletCurrencyName)} {chargedFee}</FormHelperText>
                </Grid>
            </Grid>
                <small style={{color:'red', display:'flex', justifyContent:'center'}}>{error && error}</small>
        </div>

      </>
    );
  };




// Second Form
function Form2({...props}) {

    return(
      <>
        <small className='text-muted d-flex justify-content-center my-3'>
          Check your Information before purchasing Crypto
        </small>
  
        <div style={{marginLeft: '6%', marginRight: '6%', marginTop: '8%'}}>
          <div className="my-4">
            <div className="d-flex justify-content-between">
                <p>Purchase Amount</p> 
                <p>{props.exchangeAmount ? parseFloat(props.exchangeAmount).toFixed(3) : 0} {props?.findWalletCurrencyName || ''}</p>
            </div>
            <hr className='mb-3'/>
          </div>

          <div className="my-4">
            <div className="d-flex justify-content-between">
                <p>You Get</p>
                <p>{props.exchangeResult ? parseFloat(props.exchangeResult).toFixed(9) : 0} {props?.cryptoName || ''}</p>
            </div>
            <hr className='mb-3'/>
          </div>
  
          <div className="d-flex justify-content-between">
              <p>Fee: </p> 
              <p>{props.chargedFee ? parseFloat(props.chargedFee).toFixed(3) : 0} {props?.findWalletCurrencyName || ''}</p>
          </div>
          <hr className='mb-4'/>
  
          <div className="d-flex justify-content-between">
            <p><b>Total Amount: </b></p> <p><b>{(parseFloat(props.chargedFee) + parseFloat(props.exchangeAmount)).toFixed(3)} {props?.findWalletCurrencyName || ''}</b></p>
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


/// Buy Crypto for user
export default function CryptoBuy({open}) {

    const navigate = useNavigate()  
    const [activeStep, setActiveStep] = React.useState(0);  // Currenct step
    const [completed, setCompleted]   = React.useState({}); // Completed step

    const [crypto, setCrypto]                  = useState('');    // Selected Crypto
    const [cryptoWallets, updateCryptoWallets] = useState([]);    // Crypto Wallet of user from API
    const [paymentType, setPaymentType]        = useState('');    // Payment Type state
    const [walletAddress, setWalletAddress]    = useState('');    // Wallet Address state
    const [userWallets, setUserWallets]        = useState([]);    // user Wallets from API
    const [Walletcurrency, setWalletCurrency]  = useState('');    // Wallet ID state
    const [findWalletCurrencyName, setFindWalletCurrencyName] = useState('');  // Wallet Currency Name
    const [chargedFee, SetChargedFee]          = useState(0);  // Fee charged for Crypto Buy Transactions state
    const [exchangeAmount, setExchangeAmount]  = useState(0);   // Buying Amount
    const [exchangeResult, setExchangeResult]  = useState(0); // Converted Crypto
    const [cryptoName, setCryptoName]          = useState('');
    const [successMessage, setSuccessMessag]   = useState('');  // Sucess Message state
    const [error, setError]                    = useState('');  // Error Message
    const [inSufficientFund, setInsufficientFund] = useState(false);  // Insufficient Fund
    const [disableButton, setDisableButton]       = useState(false);

    const [convertedUSDValue, setConvertedUSDValue]               = useState(0);  // Value after crypto conversion
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


    // Final Step method
    const handleComplete = () => {
        const newCompleted = completed;

        if (activeStep == 0) {

            if (!crypto) {
                setError('Please select Crypto Wallet');
              
            } else if (!walletAddress) {
              setError('Wallet has not active yet');

            } else if (!exchangeAmount) {
              setError('Please type amount to Buy');

            } else if (!Walletcurrency) {
              setError('Please select Wallet')
              
            }else if (inSufficientFund) {
                setError(error);

            } else {
                setError('')
                newCompleted[activeStep] = true;
                setCompleted(newCompleted);
                handleNext();
            };

        } else {
              setDisableButton(true)

              axiosInstance.post(`/api/v2/user/crypto/buy/`, {
                crypto_wallet_id: parseInt(crypto),
                payment_type: paymentType,
                wallet_id: parseInt(Walletcurrency),
                buy_amount: parseFloat(exchangeAmount),
                converted_crypto_quantity: parseFloat(exchangeResult)
        
            }).then((res)=> {
                // console.log(res)
        
                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessag('Crypto purchased successfully, Please wait for admin approval')
        
                    setTimeout(() => {
                        setSuccessMessag('')
                        setError('')
                        newCompleted[activeStep] = true;
                        setCompleted(newCompleted);
                        handleNext();
                        setDisableButton(false);

                    }, 2500);
                };
        
            }).catch((error)=> {
                // console.log(error)

                if (error.response.data.message === 'Invalid Crypto Wallet') {
                    setError('Invalid Crypto wallet')
                } else if (error.response.data.message === 'Invalid Wallet') {
                    setError('Invalid user wallet')
                } else if (error.response.data.message === 'Insufficient fund') {
                    setError('Insufficient fund in wallet')
                } else if (error.response.data.message === 'Crypto wallet has not approved') {
                    setError('Crypto wallet has not Approved yet')
                } else {
                    setError('')
                };
        
                setTimeout(() => {
                    setError('');
                    setDisableButton(false)
                }, 2500);
        
            });
        } 
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
                    crypto={crypto}
                    setCrypto={setCrypto}
                    paymentType={paymentType}
                    setPaymentType={setPaymentType}
                    walletAddress={walletAddress}
                    Walletcurrency={Walletcurrency}
                    setWalletCurrency={setWalletCurrency}
                    userWallets={userWallets}
                    exchangeAmount={exchangeAmount}
                    setExchangeAmount={setExchangeAmount}
                    exchangeResult={exchangeResult}
                    findWalletCurrencyName={findWalletCurrencyName}
                    chargedFee={chargedFee}
                    error={error}
                    setError={setError}
                    cryptoName={cryptoName}
                />;
        case 1:
            return <Form2 
                      exchangeAmount={exchangeAmount}
                      Walletcurrency={Walletcurrency}
                      chargedFee={chargedFee}
                      findWalletCurrencyName={findWalletCurrencyName}
                      exchangeResult={exchangeResult}
                      cryptoName={cryptoName}
                      error={error}
                      successMessage={successMessage}
                    />;
        default:
            return null;
        }
    };


     ////////////////////////////
    ///// Buy Money part ///////
   ////////////////////////////

   // Fetch all the available crypto wallet of user
    useEffect(() => {
        handleCryptoWallets({updateCryptoWallets})
    }, []);

    // Check user Wallet balance
    useEffect(() => {
        if (exchangeAmount && findWalletCurrencyName) {

             axiosInstance.post(`/api/v1/user/wallet/balance/check/`, {
                sender_currency: findWalletCurrencyName,
                send_amount: parseFloat(exchangeAmount ? exchangeAmount : 0)

             }).then((res)=> {
                // console.log(res)
                if (res.status === 200) {
                    setInsufficientFund(false);
                }

             }).catch((error)=> {
                  if (error.response.data.message === 'Wallet does not exists for given currency') {
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
    }, [exchangeAmount, findWalletCurrencyName]);
    

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
        handleCryptoBuyAssignedFee({exchangeAmount, SetChargedFee})
      } else {
        SetChargedFee(0)
      }
  }, [exchangeAmount]);


  // Get usd value of crypto from CoinGecko
  useEffect(() => {
    if (cryptoName) {

      handleConvertCryptoToUSD({cryptoName, setConvertedUSDValue});

    } else {
      console.log('Crypto not available to convert')
    }
  }, [cryptoName]);


  // Convert Wallet currency value against USD
  useEffect(() => {
    if (findWalletCurrencyName) {

      handleWalletCurrencyConvertToUSD({findWalletCurrencyName, setCurrencyConversionAmount});
        
    } else {
        console.log('Wallet Currency not available to convert')
    };

  }, [findWalletCurrencyName]);


// Calculate Crypto value
useEffect(() => {
  setTimeout(() => {
      if (currencyConversionAmount && exchangeAmount && convertedUSDValue) {
          const AmountToBeConvert = parseFloat(exchangeAmount) / (parseFloat(currencyConversionAmount) * parseFloat(convertedUSDValue))
          setExchangeResult(AmountToBeConvert)

      } else {
          console.log('currencyConversionAmount not present')
      }

  }, 1000);
  }, [exchangeAmount, currencyConversionAmount, convertedUSDValue]);


  // Submit Crypto Buy Data
  const handleSubmitCryptoBuyData = () => {
      handleSubmitCryptoData({crypto, paymentType, Walletcurrency, exchangeAmount, exchangeResult, setSuccessMessag, handleClose, setError})
  };


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
                      height: {xs:'100%', sm: '100%'},
                      overflow:'scroll'
                    }}
                  >
                  <p 
                    style={{display:'flex', justifyContent:'center', fontSize:'30px', paddingTop:20, marginBottom:-8}}>
                      Buy Crypto
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
                            Thank you for your Purchase! Your transaction is currently in pending, After approval from admin your Crypto will get deposited to your Wallet. 
                            We'll notify you once your deposit has been approved.
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

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop:'2%', justifyContent:'center' }}>

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
