import './paymentDetails.css';
import {useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';






const PaymentForm = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search)

  const [activeButton, setActiveButton] = useState(null);
  const [selectedMethod, updateSelectedMethod] = useState('');
  const [error, setError]                      = useState('');


  const decodedQueryParams = (encoded) => {
       return atob(encoded)
  }

  
  

  const merchant_key   = decodedQueryParams(queryParams.get('merch_key'))
  const merchant_name  = decodedQueryParams(queryParams.get('merch_name'))
  const merchant_id    = decodedQueryParams(queryParams.get('merch_id'))
  const itemName       = decodedQueryParams(queryParams.get('item'))
  const orderNumber    = decodedQueryParams(queryParams.get('order_no'))
  const amount         = decodedQueryParams(queryParams.get('amt'))
  const custom         = decodedQueryParams(queryParams.get('custom'))
  const currency       = decodedQueryParams(queryParams.get('cur'))
  const redirect_url   = decodedQueryParams(queryParams.get('url'))

  

  const handleButtonSelected = (selectedButton)=> {
      setActiveButton(selectedButton)
      updateSelectedMethod(selectedButton)
  };

  const handleFormSubmit = ()=> {

    if (!activeButton) {
       setError('Please select payment mode')

       setTimeout(() => {
          setError('')
       }, 3000);

    } else {
      setError('')
    }

     if(selectedMethod === 'paymoney') {
          navigate('/paymoney/checkout/form/', {
            state:{
              merchant:     merchant_key,
              merchant_id:  merchant_id,
              itemName:     itemName,
              orderNumber:  orderNumber,
              amount:       amount,
              custom:       custom,
              currency:     currency,
              redirect_url: redirect_url
            }
          })
     } else if (selectedMethod === 'stripe') {
          navigate('/other/checkout/form/', {
            state:{
              merchant:    merchant_key,
              merchant_id: merchant_id,
              itemName:    itemName,
              orderNumber: orderNumber,
              amount:      amount,
              custom:      custom,
              currency:    currency,
              img:         'https://python-uat.oyefin.com/media/paymentForm/stripe.png',
              pay_mode:    'Stripe',
              redirect_url: redirect_url
            }
          })
     } else if (selectedMethod === 'paypal') {
          navigate('/other/checkout/form/', {
            state:{
              merchant: merchant_key,
              merchant_id: merchant_id,
              itemName: itemName,
              orderNumber: orderNumber,
              amount: amount,
              custom: custom,
              currency: currency,
              img: 'https://python-uat.oyefin.com/media/paymentForm/paypal.png',
              pay_mode: 'Paypal',
              redirect_url: redirect_url
            }
          })

     } else if (selectedMethod === 'ipg15') {
          navigate('/other/checkout/form/', {
            state:{
              merchant: merchant_key,
              merchant_id: merchant_id,
              itemName: itemName,
              orderNumber: orderNumber,
              amount: amount,
              custom: custom,
              currency: currency,
              img: '',
              pay_mode: 'ipg15',
              redirect_url: redirect_url
            }
          })
     }
  };


  if (queryParams.size === 0) {
    return (
      <p className='d-flex justify-content-center fs-4'><b>Payment Failed</b></p>
    )
  };


    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: '380px' }}>
          <h4 className="card-title mx-3 my-3">Transaction Details</h4>
           <hr style={{borderTop:'2px dashed'}}/>

          <div className="card-body">
                {/* <span className='d-flex justify-content-between'>
                    <p className="card-text">{itemName}</p>
                    <small><b>{currency} {amount}</b></small>
                </span> */}

                <small className="text-muted">Merchant Name: {merchant_name}</small><br />
                <small className="text-muted">Product: {itemName}</small><br />
                <small className="text-muted">Order ID: {orderNumber}</small> 
                <hr className='mb-4'/>

                <div className="card-text d-flex justify-content-between">
                    <strong>Total Amount</strong>
                    <span className="float-right"><b>{currency} {amount}</b></span>
                </div>
                <hr className='mb-3'/>

                <small className="card-text">Accepted payment methods</small>

                <div className="d-flex justify-content-between my-2">

                    <button className={`btn btn-outline-primary ${activeButton === 'paymoney' ? 'active' : ''}`} onClick={()=> {handleButtonSelected('paymoney')}}>
                        <small>Pay Money</small>
                        <img 
                            src="https://python-uat.oyefin.com/media/paymentForm/paymoney.png" 
                            alt="Pay Money" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>

                    <button className={`btn btn-outline-primary ${activeButton === 'stripe' ? 'active' : ''}`} onClick={()=> {handleButtonSelected('stripe')}}>
                        <small>Stripe</small>
                        <img 
                            src="https://python-uat.oyefin.com/media/paymentForm/stripe.png" 
                            alt="Pay Money" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>

                    <button className={`btn btn-outline-primary ${activeButton === 'paypal' ? 'active' : ''}`} onClick={()=> {handleButtonSelected('paypal')}}>
                        <small>Paypal</small>
                        <img 
                            src="https://python-uat.oyefin.com/media/paymentForm/paypal.png" 
                            alt="Pay Money" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>
                    <button className={`btn btn-outline-primary ${activeButton === 'ipg15' ? 'active' : ''}`} onClick={()=> {handleButtonSelected('ipg15')}}>
                        <small>ipg15</small>
                        <img 
                            src="" 
                            alt="ipg15" 
                            className="button-icon" 
                            style={{maxWidth: '50px'}}
                            />
                    </button>

                </div>
          </div>
          <button className="btn btn-primary btn-block mt-4 mb-3"  onClick={handleFormSubmit}>Continue</button>

          {error && <Alert severity="warning" sx={{marginBottom: '10px'}}>{error}</Alert>}
        </div>
      </div>
    );
  };

  
  export default PaymentForm;