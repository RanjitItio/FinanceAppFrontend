import { Main,DrawerHeader } from "../Content";
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col ,Card } from 'react-bootstrap';

const Invest = () => {
  const [step, setStep] = useState(1);
  const [investmentPlan, setInvestmentPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    planName: '',
    duration: '',
    dailyProfit: '',
    paymentMethod: '',
    currency: '',
    investmentAmount: '',
    totalReturnAmount: '',
    estimatedProfit: ''
  });

  const handlePlanChange = (e) => {
    setInvestmentPlan(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNext = () => {
    if (step === 1) {
      // Perform any necessary actions for step 1
      // For demonstration, let's set some dummy data
      setFormData({
        planName: investmentPlan,
        duration: '1 year',
        dailyProfit: '1%',
        paymentMethod: paymentMethod,
        currency: 'USD',
        investmentAmount: amount,
        totalReturnAmount: '$1100',
        estimatedProfit: '$100'
      });
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-3">
            <Form.Group controlId="investmentPlan">
              <Form.Label>Choose Investment Plan:</Form.Label>
              <Form.Control as="select" value={investmentPlan}  onChange={handlePlanChange}>
                <option value="">Select Plan</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Premium">Premium</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Enter Amount:</Form.Label>
              <Form.Control type="text" value={amount} onChange={handleAmountChange} />
            </Form.Group>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Choose Payment Method:</Form.Label>
              <Form.Control as="select" value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="">Select Payment Method</option>
                <option value="Wallet">Wallet</option>
                <option value="Paypal">Paypal</option>
                <option value="Stripe">Stripe</option>
              </Form.Control>
            </Form.Group>
          </div>
        );
      case 2:
        return (
          <div>
            <p><strong>Plan Name:</strong> {formData.planName}</p>
            <p><strong>Duration:</strong> {formData.duration}</p>
            <p><strong>Daily Profit:</strong> {formData.dailyProfit}</p>
            <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
            <p><strong>Currency:</strong> {formData.currency}</p>
            <p><strong>Investment Amount:</strong> {formData.investmentAmount}</p>
            <p><strong>Total Return Amount:</strong> {formData.totalReturnAmount}</p>
            <p><strong>Estimated Profit:</strong> {formData.estimatedProfit}</p>
          </div>
        );
      case 3:
        return <p>Success! Your investment has been processed.</p>;
      default:
        return null;
    }
  };

  return (
    <Main>
        <DrawerHeader/>

    <Container className="d-flex justify-content-center p-5">
        <div className="  shadow " style={{width: '25rem'}}>
            <div className="text-center p-5">


        <h1 className="fs-3" >INVESTMENT</h1>
            step {step} / 3
                
        <h1 className="fs-5 text-bold">Fill Information</h1>
        <p>You can invest on any plan using our popular payment methods or wallet.</p>
            </div>


      <Row className="justify-content-md-center p-2">
        <Col md={12}>
          <Form >
            {renderStepContent()}
           <div className="d-flex gap-5">


            <Button variant="primary" className="w-100" onClick={handlePrev} disabled={step === 1}>
              Previous
            </Button>{' '}
            {step < 3 ? (
                <Button variant="primary" className="w-100" onClick={handleNext}>
                Next
              </Button>
            ) : null}
            </div>
          
          </Form>
        </Col>
      </Row>
      </div>

    </Container>
    </Main>

  );
};

export default Invest;
