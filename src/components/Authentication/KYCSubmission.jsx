import { Button, Modal } from "react-bootstrap";



function KYCSubmissionReport(params) {
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
                            Your KYC Application has been submitted successfully please wait for Admin Approval
                        </p>
                        <p className="text-success">
                            You will get Notified about your approval status
                        </p>

                    </Modal.Body>

                    <Modal.Footer>
                    {/* <Button variant="secondary">Close</Button> */}
                    {/* <Button variant="primary">Save changes</Button> */}
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};



export default KYCSubmissionReport;