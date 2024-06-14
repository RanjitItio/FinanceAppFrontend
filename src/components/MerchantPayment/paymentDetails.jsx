import './paymentDetails.css';
import { useEffect } from 'react';
import axiosInstance from '../Authentication/axios';



const PaymentForm = () => {

  // useEffect(() => {
  //   axiosInstance.post(`api/payment/redirect/?query=get_data`).then((res)=> {
  //     console.log(res)

  //   }).catch((error)=> {

  //     console.log(error)
  //   })
  // }, [])


    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: '380px' }}>
          <h4 className="card-title mx-3 my-3">Transaction Details</h4>
           <hr style={{borderTop:'2px dashed'}}/>

          <div className="card-body">
                <span className='d-flex justify-content-between'>
                    <p className="card-text">Shoe</p>
                    <small><b>USD 100</b></small>
                </span>

                <small className="text-muted">Merchant ID: #0E3FCDF0A49FE</small><br />
                <small className="text-muted">Order ID: #TH567</small>
                <hr className='mb-4'/>

                <div className="card-text d-flex justify-content-between">
                    <strong>Total USD</strong>
                    <span className="float-right"><b>USD 100</b></span>
                </div>
                <hr className='mb-3'/>

                <small className="card-text">Accepted payment methods</small>

                <div className="d-flex justify-content-between my-2">
                    <button className="btn btn-outline-primary">
                        <small>Pay Money</small>
                        <img 
                            src="https://python-uat.oyefin.com/media/paymentForm/paymoney.png" 
                            alt="Pay Money" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>
                    <button className="btn btn-outline-primary">
                    <small>Stripe</small>
                        <img 
                            src="https://python-uat.oyefin.com/media/paymentForm/stripe.png" 
                            alt="Pay Money" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>
                    <button className="btn btn-outline-primary">
                    <small>Paypal</small>
                        <img 
                            src="https://python-uat.oyefin.com/media/paymentForm/paypal.png" 
                            alt="Pay Money" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>
                </div>
          </div>
          <button className="btn btn-primary btn-block mt-4 mb-3">Continue</button>
        </div>
      </div>
    );
  };
  
  export default PaymentForm;