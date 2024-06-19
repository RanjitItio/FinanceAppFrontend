import React from 'react';
import { Stepper, Step, StepLabel, TextField, Button } from '@mui/material';
import { Container } from 'react-bootstrap';





export default function AgeStepper() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [age, setAge] = React.useState('');
    const [steps, setStep] = React.useState('')

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step key='Age'>
                    <StepLabel>Age</StepLabel>
                </Step>
                {/* Add more <Step> components here for additional steps */}
            </Stepper>
            <div>
                {activeStep === 0 ? (
                    <TextField
                        id="age"
                        label="Age"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                    />
                ) :""};
            </div>
            <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handleReset : handleNext}>
                    {activeStep === steps.length - 1 ? 'Reset' : 'Next'}
                </Button>
            </div>
        </Container>
    );
}
