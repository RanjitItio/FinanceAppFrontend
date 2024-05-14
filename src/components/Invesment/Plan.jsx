import { Main, DrawerHeader } from '../Content';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




const Plans = [
    {
        title: 'DIMOND ',
        amount: '$100',
        duration: '1 year',
        rate: '10%',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
        title: 'GOLD',
        amount: '$200',
        duration: '2 years',
        rate: '12%',
        features: ['Feature 1', 'Feature 3', 'Feature 4']
    },
    {
        title: 'PLATINUM',
        amount: '$200',
        duration: '2 years',
        rate: '12%',
        features: ['Feature 1', 'Feature 3', 'Feature 4']
    },
    {
        title: 'BRONZE',
        amount: '$200',
        duration: '2 years',
        rate: '12%',
        features: ['Feature 1', 'Feature 3', 'Feature 4']
    }
    ,
    {
        title: 'SILVER',
        amount: '$200',
        duration: '2 years',
        rate: '12%',
        features: ['Feature 1', 'Feature 3', 'Feature 4']
    }
    ,
    {
        title: 'PREMIUM PLAN        ',
        amount: '$200',
        duration: '2 years',
        rate: '12%',
        features: ['Feature 1', 'Feature 3', 'Feature 4']
    }
]

export default function Ticket({ open }) {
    return (
        <>
            <Main open={open}>
                <DrawerHeader />


                <div className="d-flex justify-content-center">
                    <p className='fs-3'>TICKET</p>
                </div>

                <br />

                <div className="container m-5 px-5">
                    <div className="row">
                        {Plans.map((plan, index) => (
                            <div className="col-4 mb-5" key={index}>
                                <Card className="text-center" style={{ width: '18rem' }}>
                                    <Card.Body className='my-3'>
                                        <Card.Title className=''>
                                            <div className="d-flex justify-content-center">
                                                {plan.title}
                                                </div> 
                                                </Card.Title>
                                        <Card.Subtitle className=" text-muted">{plan.amount}</Card.Subtitle>
                                        
                                            <Card>

                                            <Row>
                                                <Col>
                                                <h1>Duration</h1> 
                                                {plan.duration}
                                                </Col>
                                                <Col>
                                                <h1>Rate</h1>
                                                 {plan.rate}
                                                </Col>
                                            </Row>
                                            </Card>
                                           
                                            <br />
                                            
                                            <br />
                                            Features:
                                            {plan.features.map((feature, index) => (
                                                <span key={index}>
                                                    <div className='text-start' style={{width: '100%'}}>
                                                        <h1>

                                                    {feature}
                                                        </h1>
                                                    </div>
                                                    {index !== plan.features.length - 1 && ', '}
                                                </span>
                                            ))}
                                  
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary w-100" >Select</Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>



            </Main >
            {/* <ResponsiveDialog handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} /> */}

        </>
    )
}