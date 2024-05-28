import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Main, DrawerHeader} from '../Content';
<<<<<<< HEAD
import { useState, useContext } from 'react';



function PaymentInformation() {
    const initialFormData = Object.freeze({
        send_amount: '',
        send_currency: '',
        recipient_currency: '',
        source_fund: '',
        sending_purpose: '',
        rec_full_name: '',
        rec_email: '',
        rec_mobile_no: '',
        rec_payment_mode: '',
        rec_bank: '',
        rec_ifsc_code: '',
        rec_acc_no: '',
        rec_add_info: '',
        rec_add: '',

    })

    const [formData, updateFormData] = useState(initialFormData)
    
    const [error, setError] = useState('');


=======
import { Payment } from '@mui/icons-material';



function PaymentStepper() {
>>>>>>> master
    const navigate = useNavigate()

    const handleFormChange = (e)=> {
        updateFormData({
            ...formData,
            [e.target.name]:  e.target.value.trim()
        })
    };
    

    const handleSubmit = (e)=> {
        e.preventDefault();

        if (formData.send_amount === '') {
            setError('Please fillup the Amount to be sent')

        } else if (formData.send_currency == '') {
            setError('Please Select the Currency to be Sent')

        } else if (formData.recipient_currency == '') {
            setError('Please Select recipient currency')

        } else if (formData.source_fund == '') {
            setError('Please select Source fund type')

        } else if (formData.sending_purpose == '') {
            setError('Please select Sending purpose')
        } else {
            setError('')
            navigate('/payment-form/', { state: { formData } });
        }
        
    };

    return (
        
        <Main open={open}>
        <DrawerHeader />
        <div className="container my-4" style={{maxWidth: '35rem'}}>
                <div className="card">
                    <div className="card-body rounded" style={{backgroundColor: '#0E2F44', color: 'white'}}>
                        <h3 className="card-title"><b>Payment Information</b></h3>
                        <hr />
                        <Form method='post'>
                            <Row className="mb-3">
                                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridSend">
                                    <Form.Label>Send</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Amount" name='send_amount' onChange={handleFormChange} />
                                </Form.Group>

                                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Select defaultValue="Choose..." name='send_currency' onChange={handleFormChange}>
                                        <option value={'None'}>Choose...</option>
                                        <option value={'USD'}>USD</option>
                                        <option value={'INR'}>INR</option>
                                        <option value={'EUR'}>EUR</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            {/* &nbsp; */}
                            <Row className="mb-3">
                                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
                                    <Form.Label>Recipient will receive</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Amount" />
                                </Form.Group>
                                
                                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Select defaultValue="Choose..." name='recipient_currency' onChange={handleFormChange}>
                                        <option>Choose...</option>
                                        <option value={'USD'}>USD</option>
                                        <option value={'INR'}>INR</option>
                                        <option value={'EUR'}>EURO</option>
                                    </Form.Select>
                                </Form.Group>  
                            </Row>
                            
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Source Fund</Form.Label>
                                <Form.Select defaultValue="Choose..." name='source_fund' onChange={handleFormChange}>
                                    <option>Choose...</option>
                                    <option value={'Wallet'}>Wallet</option>
                                    <option value={'Bank'}>Bank</option>
                                    <option value={'Paypal'}>Paypal</option>
                                    <option value={'Stripe'}>Stripe</option>
                                </Form.Select>
                            </Form.Group>
                            &nbsp;
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Sending Purpose</Form.Label>
                                <Form.Select defaultValue="Choose..." name='sending_purpose' onChange={handleFormChange}>
                                    <option>Choose...</option>
                                    <option value={'Expenses'}>Expenses</option>
                                    <option value={'Insurance'}>Insurance</option>
                                    <option value={'Others'}>Others</option>
                                </Form.Select>
                            </Form.Group>

                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className='text-white'><b>Send Amount</b></p>
                                <p className='text-white'><b>Service Charge</b></p>
                                <p className='text-white'><b>Total Amount</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p><b>11.22</b></p>
                                <p><b>111.22</b></p>
                                <p><b>111.22 USD</b></p>
                            </div>
                            <br />

                            {/* ERROR MESSAGE */}
                            {error &&  <p className="text-danger">{error}</p>}

                            <center>
                                <Button variant="light" type="submit" onClick={handleSubmit}>
                                    Next Step
                                </Button>
                            </center>
                            
                        </Form>
                    </div>
                </div>
        </div>
          
        </Main>
    );
};



export default PaymentStepper;