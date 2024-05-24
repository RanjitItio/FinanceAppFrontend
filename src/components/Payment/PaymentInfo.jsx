import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Main, DrawerHeader} from '../Content';



function PaymentInformation() {
    const navigate = useNavigate()
    
    const handleSubmit = ()=> {
        navigate('/payment-form/');
    }

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
                                    <Form.Control type="number" placeholder="Enter Amount" />
                                </Form.Group>

                                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridState">
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>USD</option>
                                        <option>INR</option>
                                        <option>EUR</option>
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
                                    <Form.Select defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>USD</option>
                                        <option>INR</option>
                                        <option>EURO</option>
                                    </Form.Select>
                                </Form.Group>  
                            </Row>
                            
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Source Fund</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Personal</option>
                                    <option>Bank</option>
                                </Form.Select>
                            </Form.Group>
                            &nbsp;
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Sending Purpose</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Expenses</option>
                                    <option>Insurance</option>
                                    <option>Others</option>
                                </Form.Select>
                            </Form.Group>

                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className='text-white'><b>Charge CHF</b></p>
                                <p className='text-white'><b>Payble CHF</b></p>
                                <p className='text-white'><b>Payble USD</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p><b>11.22</b></p>
                                <p><b>111.22</b></p>
                                <p><b>111.22 USD</b></p>
                            </div>
                            <br />
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



export default PaymentInformation;