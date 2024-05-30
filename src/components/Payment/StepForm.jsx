import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Container, Select, MenuItem, InputLabel, useMediaQuery, useTheme } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios'







function HeadForm({...props}) {

  const [currencies, setCurrencies]                          = useState([])
  const [senderCurrencyValue, updateSenderCurrencyValue]     = useState('')
  const [receiverCurrencyValue, updateReceiverCurrencyValue] = useState('')
  const [sourceFundValue, updatesourceFundValue]             = useState('')
  const [sendingPurposeValue, updateSendingPurposeValue]     = useState('')

  // Call API to convert the Currency Value
  useEffect(() => {
    if (props.formData.receiver_amount && props.formData.receiver_currency && props.formData.send_currency && props.formData.send_amount){
        const fetchData = async () => {
          try {
            // const url = `${}`
          }
        }
    }
  }, [props.formData.receiver_amount, props.formData.receiver_currency, props.formData.send_currency, props.formData.send_amount])


  useEffect(() => {
    axiosInstance.get(`/api/v2/currency`).then((res) => {
        // console.log(res.data.currencies)
        if (res.data.currencies) {
          setCurrencies(res.data.currencies)
        }

    }).catch((error) => {
        console.log(error.response)

    })
  }, [])

  const handleUpdateSenderCurrencyValue = (event) => {
    updateSenderCurrencyValue(event.target.value)
  }

  const handleUpdateReceiverCurrencyValue = (event) => {
    updateReceiverCurrencyValue(event.target.value)
  }

  const handleSourceFundValue = (event)=> {
    updatesourceFundValue(event.target.value)
  }
  
  const handleSendingPurposeValue = (event)=> {
    updateSendingPurposeValue(event.target.value)
  }

  

  return (
    <>

      <Form method='post'>
        <Row className="mb-3">
          <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12 '  controlId="formGridSend">
            <InputLabel >Send</InputLabel>
            <TextField fullWidth autoFocus 
                       label="Enter Amount" 
                       type="number"  
                       onChange={(event)=>{props.handleFormValueChange(event)}}
                       variant="outlined"
                       name='send_amount'
                       />
          </Form.Group>

          <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">

            <InputLabel id="demo-simple-select-standard-label ">Currency</InputLabel>
            <Select
              fullWidth
              autoFocus
              label="Currency"
              value={senderCurrencyValue}
              name='send_currency'
              onChange={(event)=> {handleUpdateSenderCurrencyValue(event); props.handleFormValueChange(event)}}
            >
              <MenuItem value="">
                <em>Choose...</em>
              </MenuItem>
          
              {currencies.map((currency, index) => (
                    <MenuItem value={currency.name} key={index}>{currency.name}</MenuItem>
              ))}

            </Select>

          </Form.Group>

        </Row>
        {/* &nbsp; */}
        <Row className="mb-3">

        <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
            <InputLabel>Recipient will receive</InputLabel>

            <TextField fullWidth autoFocus label="Enter Amount"
                        type="number" 
                        variant="outlined" 
                        style={{color: 'white'} } 
                        name='receiver_amount'
                        onChange={(event)=>{props.handleFormValueChange(event)}}
                        />
          </Form.Group>

          <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">

            <InputLabel id="demo-simple-select-standard-label ">Currency</InputLabel>
            <Select
              fullWidth
              autoFocus
              label="Currency"
              value={receiverCurrencyValue}
              name='receiver_currency'
              onChange={(event)=>{handleUpdateReceiverCurrencyValue(event); props.handleFormValueChange(event)}}
            >
              <MenuItem value="">
                <em>Choose...</em>
              </MenuItem>
          
              {currencies.map((currency, index) => (
                    <MenuItem value={currency.name} key={index}>{currency.name}</MenuItem>
              ))}

            </Select>
          </Form.Group>

        </Row>

        <Form.Group as={Col} controlId="formGridState">
          <InputLabel id="demo-simple-select-standard-label" >Source Fund</InputLabel>
          <Select fullWidth autoFocus 
                label="Source Fund"
                name='source_fund'
                onChange={(event) => {props.handleFormValueChange(event); handleSourceFundValue(event)}}
                value={sourceFundValue}
                >
            <MenuItem value="">
              <em>Choose...</em>
            </MenuItem>
            <MenuItem value={"Wallet"}>Wallet</MenuItem>
            <MenuItem value={"Bank"}>Bank</MenuItem>
            <MenuItem value={"Paypal"}>Paypal</MenuItem>
            <MenuItem value={"Paytm"}>Paytm</MenuItem>

          </Select>
        </Form.Group>
        &nbsp;
        <Form.Group as={Col} controlId="formGridState">
          <InputLabel id="demo-simple-select-standard-label" >Sending Purpose</InputLabel>
          <Select fullWidth autoFocus 
                  label="Sending Purpose"
                  name='sending_purpose'
                  onChange={(event)=> {props.handleFormValueChange(event); handleSendingPurposeValue(event)}}
                  value={sendingPurposeValue}
                  >
            <MenuItem value="">
              <em>Choose...</em>
            </MenuItem>
            <MenuItem value={"Expenses"}>Expenses</MenuItem>
            <MenuItem value={"Insurance"}>Insurance</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>

        </Form.Group>

        <hr />
        <div className="d-flex justify-content-between">
          <p className=''><b>Send Amount</b></p>
          <p className=''><b>Payble Fee</b></p>
          <p className=''><b>Total Amount</b></p>
        </div>
        <div className="d-flex justify-content-between">
          <p><b>{props.formData.send_amount} {props.formData.send_currency}</b></p>
          <p><b>{props.formData.transaction_fee} {props.formData.send_currency}</b></p>
          <p><b>{props.formData.total_amount} {props.formData.send_currency}</b></p>
        </div>
        <br />


      </Form>

    </>
  )
}


function Step1Form() {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth autoFocus label="Full Name"  variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mobile Number" type="number" variant="outlined" />
          </Grid>

          {/* Button */}
          {/* <Grid item xs={3}>
                <Button variant="contained" color="primary" fullWidth>
                Submit
                </Button>
            </Grid> */}

        </Grid>
      </form>
    </Container>


  );
}

function Step2Form() {
  const [agenetOption, setAgenetOption] = React.useState('');

  const handleChange = (event) => {
    setAgenetOption(event.target.value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form method='post'>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12} md={12}>
            <InputLabel id="demo-simple-select-label">Agent or Bank Transfer</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={agenetOption} label="age" fullWidth size='small' onChange={handleChange} >
              <MenuItem value={'Agent'}>Agent</MenuItem>
              <MenuItem value={'Bank Transfer'}>Bank Transfer</MenuItem>
              <MenuItem value={'Others'}>Others</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6} >
            <TextField fullWidth label="Agent/Bank Name" variant="outlined" type='text' required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="IBAN/AC/ACH Number" type="text" variant="outlined" required />
          </Grid>

          <Grid item xs={12} sm={6} >
            <TextField fullWidth label="Routing/IFSC/BIC/SwiftCode" type='text' variant="outlined" required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Additional Info" type="text" variant="outlined" required />
          </Grid>

          {/* Button */}
          {/* <Grid item xs={3}>
                    <Button variant="contained" color="primary" fullWidth type='submit'> 
                    Submit
                    </Button>
                </Grid> */}

        </Grid>
      </form>
    </Container>
  );
}

function Step3Form() {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form method='post'>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12}>
            <TextField fullWidth autoFocus label="Address Line" variant="outlined" />
          </Grid>
          {/* Button */}
          {/* <Grid item xs={3}>
                    <Button variant="contained" color="primary" fullWidth>
                    Submit
                    </Button>
                </Grid> */}
        </Grid>
      </form>
    </Container>
  );
}

function Step4Form() {
  const [payvia, setPayvia] = React.useState('');

  const handleChange = (event) => {
    setPayvia(event.target.value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form>
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12} md={12}>
            <InputLabel id="demo-simple-select-label">Payment Via</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={payvia} label="age" fullWidth size='small' onChange={handleChange} >
              <MenuItem value={'USD Wallet'}>USD Wallet</MenuItem>
              <MenuItem value={'Bank Transfer'}>Bank Transfer</MenuItem>
              <MenuItem value={'Swift'}>Swift</MenuItem>
              <MenuItem value={'Sepa'}>Sepa</MenuItem>
            </Select>
          </Grid>

          {/* Button */}
          {/* <Grid item xs={3}>
                <Button variant="contained" color="primary" fullWidth>
                Submit
                </Button>
            </Grid> */}

        </Grid>
      </form>
    </Container>
  );
}


const steps = ['Payment Information','Recipient Details', 'Recipient Bank Details', 'Recipient Address', 'Payment Information'];


export default function StepWisePaymentForm() {

  const initialFormData = {
    send_amount: 0,
    send_currency: '',
    receiver_amount: 0,
    receiver_currency: '',
    source_fund: '',
    sending_purpose: '',
    transaction_fee: 0,
    total_amount: 0
  }


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, updateFormData] = useState(initialFormData)


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {

      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Get the value of the form after the form filled
  const handleFormValueChange = (event) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  };


  // calculate Total Amount
  useEffect(() => {
    if (formData.send_amount && formData.send_currency) {
      updateFormData((formData)=> ({
        ...formData,
        total_amount: parseFloat(formData.send_amount) + parseFloat(formData.transaction_fee)
      }))
    }
  }, [formData.send_amount, formData.send_currency])

  // Update the Transaction Fee after Selecting send amount and currency
  useEffect(() => {
    if (formData.send_amount && formData.send_currency) {
      updateFormData((formData)=> ({
        ...formData,
        transaction_fee: 10
      }))
    }
  }, [formData.send_amount, formData.send_currency])



  const renderStepForm = (step) => {
    switch (step) {
      case 0:
        return <HeadForm
               handleFormValueChange={handleFormValueChange}
               formData={formData}
            />;
      case 1:
        return <Step1Form />;
      case 2:
        return <Step2Form />;
      case 3:
        return <Step3Form />;
      case 4:
        return <Step4Form />;
      default:
        return null;
    }
  };

  return (
    <Main open={open}>
      <DrawerHeader />
      <div className="container my-4 " style={{ maxWidth: '50rem' }}>
        <div className="card shadow-lg rounded-lg" style={{ background: '#F0F8FF' , borderRadius:'5%'}}>
          <div className="card-body  " style={{ background: '#F0F8FF', borderRadius:'5%'}}>
            
            <Box sx={{ maxWidth: '100%' }}>
              <Container maxWidth="md" style={{ marginTop: '50px' }}>
                <Stepper activeStep={activeStep} orientation={matchesXS ? 'vertical' : 'horizontal'} >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //   labelProps.optional = (
                    //     <Typography  variant="caption">Optional</Typography>
                    //   );
                    // }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Container>

              {activeStep === steps.length ? (
                <>
                  <Container maxWidth="md" style={{ marginTop: '50px' }}>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      <p className="text-success">congratulation your payment information has been submitted successfully</p>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleReset} style={{width:'15rem'}}>Reset</Button>
                    </Box>
                  </Container>
                </>
              ) : (
                <>

                  {renderStepForm(activeStep)}

                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  <Container maxWidth="md" style={{ marginTop: '50px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} style={{width:'15rem',backgroundColor:'#90caf9'}}>
                        {'<'} Back
                      </Button>

                      <Box sx={{ flex: '1 1 auto' }} />
                      {/* {isStepOptional(activeStep) && (
                        <Button color="inherit" className='mx-3' onClick={handleSkip} sx={{ mr: 1 }} style={{width:'15rem',backgroundColor:'#2979ff'}}>
                          Skip
                        </Button>
                      )} */}

                      <Button onClick={handleNext} style={{width:'15rem',backgroundColor:"#1e88e5"}}>
                        {activeStep === steps.length - 1 ? 'Make Payment >' : 'Next >'}
                      </Button>
                    </Box>
                  </Container>


                </>
              )}
            </Box>
          </div>
        </div>
      </div>
    </Main>
  );
}