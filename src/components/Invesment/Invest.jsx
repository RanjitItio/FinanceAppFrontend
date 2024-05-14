import { Main, DrawerHeader } from "../Content";
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
              <Form.Control as="select" value={investmentPlan} onChange={handlePlanChange}>
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
            <Card>
              <Card.Body>
                <Form.Group controlId="planName">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control type="text" value={formData.planName} readOnly />
                </Form.Group>
                <Form.Group controlId="duration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control type="text" value={formData.duration} readOnly />
                </Form.Group>
                <Form.Group controlId="dailyProfit">
                  <Form.Label>Daily Profit</Form.Label>
                  <Form.Control type="text" value={formData.dailyProfit} readOnly />
                </Form.Group>
                <Form.Group controlId="paymentMethod">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control type="text" value={formData.paymentMethod} readOnly />
                </Form.Group>
                <Form.Group controlId="currency">
                  <Form.Label>Currency</Form.Label>
                  <Form.Control type="text" value={formData.currency} readOnly />
                </Form.Group>
                <Form.Group controlId="investmentAmount">
                  <Form.Label>Investment Amount</Form.Label>
                  <Form.Control type="text" value={formData.investmentAmount} readOnly />
                </Form.Group>
                <Form.Group controlId="totalReturnAmount">
                  <Form.Label>Total Return Amount</Form.Label>
                  <Form.Control type="text" value={formData.totalReturnAmount} readOnly />
                </Form.Group>
                <Form.Group controlId="estimatedProfit">
                  <Form.Label>Estimated Profit</Form.Label>
                  <Form.Control type="text" value={formData.estimatedProfit} readOnly />
                </Form.Group>
              </Card.Body>
            </Card>
          </div>
        );
      case 3:
        return (<>
        <div className="d-flex justify-content-center align-items-center p-4">
          <CheckCircleOutlineIcon className="fs-1 text-success"/>
        </div>
        <h1 className="fs-5 text-center text-bold pb-5">Success</h1>
        </>);
      default:
        return null;
    }
  };

  return (
    <Main>
      <DrawerHeader />

      <Container className="d-flex justify-content-center p-5">
        <div className="  shadow " style={{ width: '25rem' }}>
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