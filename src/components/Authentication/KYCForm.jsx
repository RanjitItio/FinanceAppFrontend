import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import {Tab, Nav, Button, Form, Row, Col } from "react-bootstrap";



function KYCForm() {

   const initialFormData = Object.freeze({
      first_name: '',
      last_name: '',
      DOB: '',
      gender: '',
      marital_status: '',
      email: '',
      contact_no: '',
      address: '',
      land_mark: '',
      city: '',
      zip: '',
      state: '',
      country: '',
      nationality: '',
      ID: '',
      id_no: '',
      id_expiry: '',
      id_proof: ''

   });
   
   const [formData, UpdateFormData] = useState(initialFormData)
   const [error, setError] = useState('')
   const [activeTab, setActiveTab] = useState('home')

   const location = useLocation();
   const navigate = useNavigate();
   const Searchparams = new URLSearchParams(location.search);
   const registrationFormData = Object.fromEntries(Searchparams.entries())
//    console.log(registrationFormData)

   const handleChange = (e)=> {
        UpdateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
   }

   const handleSubmit = (e)=> {

        e.preventDefault();
        let validationError = [];
        // console.log(formData);

        // if (!formData.first_name) {
        //     validationError.push("Please fill your First Name");
        // }
        // else if (!formData.last_name) {
        //     validationError.push("Please fill your Last Name");
        // }
        if (formData.DOB === '') {
            validationError.push("Please fill your Date of Birth");
        }
        else if (formData.gender === '') {
            validationError.push("Please fill your Gender");
        }
        else if (formData.marital_status === '') {
            validationError.push("Please choose your marital status");
        }
        // else if (!formData.email) {
        //     validationError.push("Please fill your Email Address");
        // }
        // else if (!formData.contact_no) {
        //     validationError.push("Please fill your Contact Number");
        // }
        else if (formData.address === '') {
            validationError.push("Please fill your Address");
        }
        else if (formData.land_mark === '') {
            validationError.push("Please fill the Land mark");
        }
        else if (formData.city === '') {
            validationError.push("Please fill your City Name");
        }
        else if (formData.zip === '') {
            validationError.push("Please fill your ZIP Code");
        }
        else if (formData.state === '') {
            validationError.push("Please fill your State");
        }
        else if (formData.country === '') {
            validationError.push("Please Fill the Country Name");
        }
        else if (formData.nationality === '') {
            validationError.push("Please Fill your Nationality");
        }
        else if (formData.ID === '') {
            validationError.push("Please Select ID type");
        }
        else if (formData.id_no === '') {
            validationError.push("Please type your ID Number");
        }
        else if (formData.id_expiry === '') {
            validationError.push("Please select your ID Expiry date");
        }
        else if (formData.id_proof === '') {
            validationError.push("Please Upload your ID Proof");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
            setTimeout(() => {
                navigate('/kyc-submission-report/');
            }, 1000);
            
        }
   };

   const handleProceedNextTab = async (tabKey)=> {
        setActiveTab(tabKey);
   };


return(
    <>
{/* 00539CFF */}
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav className="rounded" id="myTab" role="tablist" style={{ backgroundColor: '#22c1c3' }} variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="home" style={{ color: 'black' }}>Basic Detail</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile" style={{ color: 'black' }}>Contact Detail</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contact" style={{ color: 'black' }}>ID Proof</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form method="post">
        <Tab.Content>
            {/* First tab */}
            <Tab.Pane eventKey="home">
                <br />
                <div>
                    <p className="mx-2">Edit Personal Detail<br />
                        <span className="text-muted">Enter your basic details such as Name, Age, Gender etc.</span></p>
                    <hr className="mx-2" />
                    <br />
                    <h5 className="mx-2">Basic Information</h5>

                    <Row className="mb-3 mx-2">
                        <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12"  controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="John" name='first_name' value={registrationFormData.first_name} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Doe" name='last_name' value={registrationFormData.last_name} onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3 mx-2">
                        <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" placeholder="" name='DOB' onChange={handleChange}/>
                        </Form.Group>

                    </Row>
                        
                    <Row className="mb-3 mx-2">
                        <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select defaultValue="Choose..." name='gender' onChange={handleChange}>
                                <option>Choose..</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridGender">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Select defaultValue="Choose" name='marital_status' onChange={handleChange}>
                                <option>Choose..</option>
                                <option>Married</option>
                                <option>Unmarried</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="button" className="mx-2 my-3" onClick={() => handleProceedNextTab('profile')}>
                        Proceed to Next step {'>'}
                    </Button>
                </div>
            </Tab.Pane>

            {/* Second Tab */}
          <Tab.Pane eventKey="profile">
                <br />
                <p className="mx-2">Edit Contact Details<br />
                <span className="text-muted">Enter your basic details such as Phone number, Email, Etc.</span></p>
                <hr className="mx-2" />
                <br />
                <h5 className="mx-2">Contact Information</h5>

                <Row className="mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridEmail">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type="email" placeholder="john@mail.com" name='email' value={registrationFormData.email} onChange={handleChange} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridPhoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type="number" placeholder="9870-789-876" name='contact_no' value={registrationFormData.contact_number} onChange={handleChange} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridAddress">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control type="text" placeholder="Malviya Nagar" name='address' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridLandMark">
                        <Form.Label>Land Mark:</Form.Label>
                        <Form.Control type="text" placeholder="Near iThum Tower Noida" name='land_mark' onChange={handleChange} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridCity">
                        <Form.Label>City/Town:</Form.Label>
                        <Form.Control type="text" placeholder="Noida" name='city' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridZip">
                        <Form.Label>Zip Code:</Form.Label>
                        <Form.Control type="number" placeholder="123450" name='zip' onChange={handleChange} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridState">
                        <Form.Label>State OR UT:</Form.Label>
                        <Form.Control type="text" placeholder="Type State or UT"  name='state' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridCountry">
                        <Form.Label>Country:</Form.Label>
                        <Form.Control type="text" placeholder="India" name='country' onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="button" className="mx-4 my-3" onClick={() => handleProceedNextTab('contact')}>
                    Proceed to Next step {'>'}
                </Button>

          </Tab.Pane>
          {/* Second tab ends */}

          {/* Third Tab */}
          <Tab.Pane eventKey="contact">
            <br />
            <p className="mx-2">Edit ID Proof Details<br />
            <span className="text-muted">Enter your ID details such as Card number, Expiry date etc.</span></p>
            <hr className="mx-2" />
            <br />
            <h5 className="mx-2 mb-3">Contact Information</h5>
            <Row className="mx-2 mb-3">
                <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridNationality">
                    <Form.Label>Nationality:</Form.Label>
                    <Form.Control type="text" placeholder="Type your Nationality" name='nationality' onChange={handleChange} />
                </Form.Group>
            </Row>
            <br />
            <Row className="mx-2 mb-3">
                <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridID">
                    <Form.Label>ID Type:</Form.Label>
                    <Form.Select defaultValue="Choose..." name='ID' onChange={handleChange}>
                        <option>Choose...</option>
                        <option>Adhar Card</option>
                        <option>PAN Card</option>
                        <option>Nations ID Card</option>
                        <option>Residence Proof</option>
                        <option>Passport</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridIDNumber">
                    <Form.Label>ID Number:</Form.Label>
                    <Form.Control type="text" placeholder="Type ID Number" name='id_no' onChange={handleChange} />
                </Form.Group>

                <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridIDExpiryDate">
                    <Form.Label>ID Expiry Date:</Form.Label>
                    <Form.Control type="date" placeholder="Type ID Expiry Date" name='id_expiry' onChange={handleChange} />
                </Form.Group>
            </Row>
    
            <Row className="mx-2 mb-3">
                <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridIDProof">
                    <Form.Label>Upload Proof:</Form.Label>
                    <Form.Control type="file" placeholder="Upload Proof" name='id_proof' onChange={handleChange} />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit" className="mx-4 my-3" onClick={handleSubmit}>
                    Submit KYC
            </Button>

            {error && <p className="text-danger">{error}</p>}
          </Tab.Pane>

        </Tab.Content>
      </Form>
      </Tab.Container>
   
    </>

   

    );
};



export default KYCForm;