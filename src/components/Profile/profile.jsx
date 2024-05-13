import React from 'react';

import { Main, DrawerHeader } from '../Content';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PrintIcon from '@mui/icons-material/Print';
import Button from 'react-bootstrap/Button';
import PasswordIcon from '@mui/icons-material/Password';
import PhoneIcon from '@mui/icons-material/Phone';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const Profile = () => {
    const [Passwd, setPasswd] = useState(false);
    const [phone, setPhone] = useState(false);
    const [info, setinfo] = useState(false);
    const [wallet, setWallet] = useState(false);
    // const [lgShow, setLgShow] = useState(false);


    return (
        <Main open={open}>
            <DrawerHeader />

            <Modal className='p-5' show={Passwd} onHide={() => setPasswd(false)}>
                <Modal.Header closeButton> Change Password</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter current password" />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" />

                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Confirm password" />

                        </Form.Group>
                        <Button variant="primary" className='mt-2 w-100' type="submit">
                            Change Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <Modal className='p-5' show={phone} onHide={() => setPhone(false)}>
                <Modal.Header closeButton> Change Phone Number</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>Change Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter new phone number" />
                        </Form.Group>

                        <Button variant="primary" className='mt-2 w-100' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal className='p-5' show={info} onHide={() => setinfo(false)}>
                <Modal.Header closeButton>Personal Information</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Address 1</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address 1" />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address 2" />
                                </Form.Group>
                            </Col>


                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your City" />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your State" />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your Country" />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Time Zone</Form.Label>
                                    <Form.Control type="text" placeholder="TimeZone" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" className='mt-2 w-100' type="submit">
                            Update Information
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            
            <Modal className='p-5' show={wallet} onHide={() => setWallet(false)}>
                <Modal.Header closeButton> Change Default Currency</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>choose Default Currency</Form.Label>
                            <Form.Select aria-label="USD">
                                <option value="1">USD</option>
                                <option value="2">EURO</option>
                                <option value="3">INR</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" className='mt-2 w-100' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <Container className="mx-5  px-5">

                <Row>
                    <Col>
                        <Card className="shadow-lg">
                            <Card.Body>

                                <Row>
                                    <Col xs={8} className='py-3 px-3'>
                                        <h1 className="text-start text-xl fs-4 ">John Doe</h1>
                                        <h1 className="text-start text-sm  ">Please set your profile image.</h1>
                                        <h1 className="text-start text-xs text-muted">Supported format: jpeg, png, bmp, gif, or svg</h1>
                                        <Button variant="primary" className="mt-3">Upload Image</Button>
                                    </Col>
                                    <Col xs={4}>
                                        <img src="https://via.placeholder.com/120" alt="Profile Picture" className="img-fluid rounded-circle" />
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                        <Card className="shadow-lg mt-3">
                            <Card.Body>

                               <div className="d-flex justify-content-between">
                                <h1 >Default Currency <BorderColorIcon onClick={()=>setWallet(true)} /></h1>
                                <h1>USD</h1>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="shadow-lg">
                            <Card.Body className='m-3'>



                                <h1 className=" text-xl fs-5 "> <p><QrCodeScannerIcon /></p> Profile QR Code</h1>
                                <h1 className="text-start text-sm  ">Use the QR code to easily handle your transactions.</h1>
                                <h1 className="text-start text-xs text-muted">Supported format: jpeg, png, bmp, gif, or svg</h1>
                                <Button variant="primary" className="mt-3"><PrintIcon />Print Code</Button>&nbsp;
                                <Button variant="outline-success" className="mt-3">Update Code</Button>
                                <div className="py-5 px-3">
                                    <img src="https://via.placeholder.com/150" alt="QR Code" className="img-fluid" />
                                </div>
                                <div className="justify-content-between d-flex py-3">
                                    <div className="d-flex">
                                        <PasswordIcon /> &nbsp;

                                        <h1 className="text-start text-xl fs-6 ">Change Password</h1>
                                    </div>
                                    <div className="d-flex">
                                        <h1 className="text-end text-xl fs-6 ">*********</h1>&nbsp;
                                        <Button variant="primary" onClick={() => setPasswd(true)} className=""><BorderColorIcon /></Button>
                                    </div>
                                </div>
                                <div className="justify-content-between d-flex py-3">
                                    <div className="d-flex">
                                        <PhoneIcon /> &nbsp;
                                        <h1 className="text-start text-xl fs-6 "> Phone </h1>
                                    </div>
                                    <div className="d-flex">

                                        <h1 className="text-end text-xl fs-6 ">N/A</h1>&nbsp;
                                        <Button variant="primary" onClick={() => setPhone(true)} className=""><BorderColorIcon /></Button>
                                    </div>

                                </div>




                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <Card className="shadow-lg mt-5">
                    <Card.Body className="">
                        <Card.Title>Personal Information <BorderColorIcon onClick={() => setinfo(true)} /> </Card.Title>
                        <Row>
                            <Col className='p-3'>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>Name</h1>
                                            <h1 className='text-muted'> John dev</h1>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>Email</h1>
                                            <h1 className='text-muted'> Johndev@mail.com</h1>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>Address 1</h1>
                                            <h1 className='text-muted'></h1>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>Address 2</h1>
                                            <h1 className='text-muted'>N/A</h1>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col className='p-3'>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>City</h1>
                                            <h1 className='text-muted'>N/A</h1>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>State</h1>
                                            <h1 className='text-muted'>N/A</h1>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>Country</h1>
                                            <h1 className='text-muted'>Russia</h1>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <h1 className='text-lg'>Time Zone</h1>
                                            <h1 className='text-muted'>Europe/Moscow</h1>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Col>
                        </Row>


                    </Card.Body>

                </Card>


            </Container>
        </Main>
    );
};

export default Profile;
