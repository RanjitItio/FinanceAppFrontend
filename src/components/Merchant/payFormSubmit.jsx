import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const PaymentFormSubmission = ()=> {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/payment/form/');
    }, [navigate]);

    return null

};


export default PaymentFormSubmission;
