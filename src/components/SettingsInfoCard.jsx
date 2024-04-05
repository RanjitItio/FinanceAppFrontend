import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import { useState } from 'react';




function SettingsInfoCard({handlePersonalInfo, handlePreference, handleResetPassword}){
    const [active, setActive] = useState(false);

    const handleItemClick = (event) => {
        setActive(true)
    }


    return(
        <>
           <Tab.Container id="list-group-tabs" defaultActiveKey="#link1" >
                <Row>
                    <Col>
                    <ListGroup >
                        <ListGroup.Item action href="#link1" style={{height:"5rem", color: active ? 'white': 'black'}} className={`my-1 rounded-3 ${active ? 'active' : ''}`} onClick={handlePersonalInfo} >
                        <div className="row my-3 mx-1 align-items-center">
                            <div className="col-auto">
                                <i className="bi bi-person-circle" style={{ fontSize: "20px" }}></i>
                            </div>
                            <div className="col">
                                <b>Personal Information</b>
                            </div>
                            <div className="col-auto">
                                <b>&gt;</b> 
                            </div>
                        </div>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2" className={`my-1 rounded-3 ${active ? 'active' : ''}`} onClick={handlePreference}>
                            <div className="row my-3 mx-1 align-items-center">
                                <div className="col-auto">
                                    <i className="bi bi-gear-fill" style={{ fontSize: "20px" }}></i>
                                </div>
                                <div className="col">
                                    <b>Preferences</b>
                                </div>
                                <div className="col-auto">
                                <b>&gt;</b> 
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link3" className={`my-1 rounded-3 ${active ? 'active' : ''}`} style={{color: active ? 'white': 'black'}} onClick={handleResetPassword}>
                            <div className="row my-3 mx-1 align-items-center">
                                <div className="col-auto">
                                    <i className="bi bi-lock-fill" style={{ fontSize: "20px" }}></i>
                                </div>
                                <div className="col">
                                    <b>Reset Password</b>
                                </div>
                                <div className="col-auto">
                                <b>&gt;</b> 
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link4" className={`my-1 rounded-3 ${active ? 'active' : ''}`} style={{color: active ? 'white': 'black'}}>
                            <div className="row my-3 mx-1 align-items-center">
                                <div className="col-auto">
                                    <i className="bi bi-box-arrow-right" style={{ fontSize: "20px" }}></i>
                                </div>
                                <div className="col">
                                    <b>Logout</b>
                                </div>  
                                <div className="col-auto">
                                <b>&gt;</b> 
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}



export default SettingsInfoCard;