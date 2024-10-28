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
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import Input from '@mui/joy/Input';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { handleCryptoWallets, handleCryptoWalletAddress, handleFIATWallets, 
  handleCryptoBuyAssignedFee, handleConvertCryptoToUSD, handleWalletCurrencyConvertToUSD,
  handleSubmitCryptoData, getCurrencyIcon } from './BuyAPI';
import { useState } from 'react';
import axiosInstance from '../Authentication/axios';
import { QontoConnector, QontoStepIcon } from '../MUIComponents/Stepper';
import StepLabel from '@mui/material/StepLabel';
import ImportExportIcon from '@mui/icons-material/ImportExport';




const steps                   = ['Step 1', 'Step 2'];
const user_selected_wallet    = localStorage.getItem('UserSelectedWalletID')
const user_selected_wallet_id = parseInt(user_selected_wallet, 10)



// First Form
function Form1() {

    const [currencies, setCurrencies] = React.useState([]);
  
  
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
            Swap Crypto from one Wallet to Another Wallet
        </small>
  
        <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '6%'}}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth size="small">
                        <Select 
                          placeholder='Crypto Wallet'
                          // value={crypto}
                          indicator={<KeyboardArrowDown />}
                          // onChange={(e, newValue) => setCrypto(newValue)}
                          sx={{
                            [`& .${selectClasses.indicator}`]: {
                              transition: '0.2s',
                              [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                              },
                            },
                          }}
                          >
                          {/* {cryptoWallets.map((wallet, index)=> (
                              <Option key={index} value={wallet.id}>{wallet.crypto_name}</Option>
                          ))} */}
                          <Option value='BTC'>BTC</Option>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} lg={2} 
                   sx={{marginTop: '1.5%', display: {xs: 'none', sm: 'none', md: 'flex'} }}>
                    <SwapHorizIcon />
                </Grid>

                <Grid item xs={12} lg={2} 
                          sx={{marginTop: '-5%', display: {xs: 'flex', lg: 'none'}, justifyContent: 'center'}}>
                    <ImportExportIcon />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth size="small">
                        <Select
                          placeholder='Payment Mode'
                          // onChange={(e, newValue) => setPaymentType(newValue)}
                          // value={paymentType}
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
                            <Option value="Bank Transfer">Bank Transfer</Option>
                            <Option value="Paypal">Paypal</Option>
                            <Option value="UPI">UPI</Option>
                            <Option value="Stripe">Stripe</Option>

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>

                    <FormControl sx={{ minWidth: 120, width: '96%'}} size="small">
                        <Select 
                          placeholder='Wallet Currency'
                          // value={Walletcurrency}
                          // onChange={(e, newValue) => setWalletCurrency(newValue)}
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
                          {/* {userWallets.map((wallet, index)=> (
                              <Option key={index} value={wallet.id}>
                                  {wallet.currency}
                              </Option>
                          ))} */}
                           <Option value='BTC'>
                                BTC
                            </Option>
                        </Select>
                    </FormControl>

                </Grid>

                <Grid item xs={12} sm={6}>
                    <Input 
                      placeholder="Wallet Address" 
                      // value={walletAddress ? walletAddress : ''}
                      />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Input 
                            placeholder="Amount"
                            // value={exchangeAmount}
                            // onChange={(e) => {setExchangeAmount(e.target.value)}}
                            // startDecorator={getCurrencyIcon(findWalletCurrencyName)}
                            />
                            
                            <SwapHorizIcon sx={{ml:1.5}} />

                          <Input 
                            placeholder="Crypto" 
                            sx={{ml:2}}
                            // value={exchangeResult}
                            />
                    </Box>
                    {/* <FormHelperText>Fee Charge: {getCurrencyIcon(findWalletCurrencyName)} {chargedFee}</FormHelperText> */}
                    <FormHelperText>Fee Charge: {getCurrencyIcon('USD')} 1.0</FormHelperText>
                </Grid>
            </Grid>
                {/* <small style={{color:'red', display:'flex', justifyContent:'center'}}>{error && error}</small> */}
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

    const [currency, setCurrency]             = React.useState('');     // Selected Currency value
    const [paymentMethod, setPaymentMethod]   = React.useState('');  // Payment Mode
    const [amount, setAmount]                 = React.useState('');    // Amount
    const [error, setError]                   = React.useState('');      // Error Message
    const [totalAamount, setTotalAmount]      = React.useState('');  // Total amount
    const [transactionFee, setTransactionFee] = React.useState(0.00);

    
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
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;

            if (activeStep == 0) {
            if (!currency || !amount || !paymentMethod) {
                setError('Please fill all the above fields');
                return;
            }
            };
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

          if (!currency || !amount || !paymentMethod) {
              setError('Please fill all the above fields');
              return;

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
                fee: transactionFee,
                total_amount: totalAamount,
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
                />;
        case 1:
            return <Form2
                      
                    />;
        default:
            return null;
        }
    };




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

                {/* <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit">
                        {label}
                    </StepButton>
                    </Step>
                ))}
                </Stepper> */}
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
