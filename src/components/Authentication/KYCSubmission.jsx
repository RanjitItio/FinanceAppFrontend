import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";



function KYCSubmissionReport(params) {
    const [userName, updateUserName] = useState({})

    useEffect(() => {
       const queryString = new URLSearchParams(window.location.search)

       const first_name = queryString.get('first_name')
       const last_name = queryString.get('last_name')

       updateUserName({
        firstName: first_name,
        lastName: last_name
       })

    }, []);
    
    
    return(
        <>
            <div className="modal show" style={{ display: 'block', position: 'initial' }} >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                    <Modal.Title>KYC Submission Report</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        
                        <p className="text-success">
                            <b>Thank you for your Applying</b>
                        </p>
                        <p className="text-success">
                            Dear {userName.firstName} {userName.lastName} Your KYC Application has been submitted successfully please wait for Admin Approval
                        </p>
                        <p className="text-success">
                            You will get Notified about your approval status
                        </p>

                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};



export default KYCSubmissionReport;