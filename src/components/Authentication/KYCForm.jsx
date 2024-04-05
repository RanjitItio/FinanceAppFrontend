import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function KYCForm() {

   const initialFormData = Object.freeze({
      name: '',
      email: '',
      contact_no: '',
      address: '',
      DOB: '',
      country: '',
      state: '',
      PIN: '',
      nationality: '',
    //   id_type: '',
      id_number: '',
      id_expiry_date: '',
      id_proof: ''

   });
   const [formData, UpdateFormData] = useState(initialFormData)
   const [error, setError] = useState('')

   const location = useLocation();
   const Searchparams = new URLSearchParams(location.search)
   const registrationFormData = Object.fromEntries(Searchparams.entries())


   const handleChange = (e)=> {
        UpdateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
   }

   const handleSubmit = (e)=> {

        e.preventDefault();
        let validationError = [];
        console.log(formData);

        if (formData.name.value === '') {
            validationError.push("Please fill your name");
        }
        else if (formData.email.value == '') {
            validationError.push("Please fill your email");
        }
        else if (formData.contact_no.value === '') {
            validationError.push("Please fill your Contact Number");
        }
        else if (!formData.address) {
            validationError.push("Please fill your Address");
        }
        else if (!formData.DOB) {
            validationError.push("Please fill your DOB");
        }
        else if (!formData.country) {
            validationError.push("Please fill your Country");
        }
        else if (!formData.state) {
            validationError.push("Please fill your State");
        }
        else if (!formData.PIN) {
            validationError.push("Please fill your Postal Code");
        }
        else if (!formData.nationality) {
            validationError.push("Please fill your Nationality");
        }
        // else if (!formData.id_type) {
        //     validationError.push("Please fill your ID Type");
        // }
        else if (!formData.id_number) {
            validationError.push("Please fill your ID Number");
        }
        else if (!formData.id_expiry_date) {
            validationError.push("Please fill your ID Expiry Date");
        }
        else if (!formData.id_proof) {
            validationError.push("Please Upload your ID Proof");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
            // closeKYCForm();
            // navigate('/');
        }
   }


return(
    <>
       <ul class="nav nav-tabs rounded" id="myTab" role="tablist" style={{backgroundColor: 'blueviolet'}}>
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" style={{color: 'black'}}> Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" style={{color: 'black'}}>Profile</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false" style={{color: 'black'}}>Contact</button>
            </li>
        </ul>
        <Form method="post">
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <p className="mx-2">Edit Personal Detail<br />
                <span className="text-muted">Enter your basic details such as Name, Age, Gender etc.</span></p>
                <hr className="mx-2" />
                <br />
                <h5 className="mx-2">Basic Information</h5>
                
                <Row className="mb-3 mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="John" />
                    </Form.Group>

                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Doe" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-2">
                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="" />
                    </Form.Group>

                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="col-md-3 col-lg-3 col-sm-12 col-xs-12" controlId="formGridGender">
                        <Form.Label>Marital Status</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Married</option>
                            <option>Unmarried</option>
                        </Form.Select>
                    </Form.Group>

                </Row>
                <Button variant="primary" type="submit" className="mx-2 my-3">
                    Proceed to Next step
                </Button>
                
            </div>

            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
               
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
              
            </div>
            
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                
            </div>
            
        </div>
        </Form>
    </>

    );
};



export default KYCForm;