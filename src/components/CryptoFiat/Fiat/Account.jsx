import React, { useEffect, useState } from "react"
import axiosInstance from "../../Authentication/axios"
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




export default function FiatAccount() {
    const [userWallet, updateUserWallet] = useState([]);
    const [error, setError] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');


    useEffect(() => {
        axiosInstance.get(`api/v3/user/wallet`).then((res)=> {
             if(res.data.user_wallet_data) {
                updateUserWallet(res.data.user_wallet_data)
                // console.log(res.data.user_wallet_data)
             } else if(res.data.msg == 'Token has expired') {
                setError('Session has expired please login to view wallet balance')

             } else if (res.data.msg == 'Invalid token') {
                setError('Invalid session please try to login')
             }
        }).catch((error)=> {
            console.log(error.response)

            if (error.response.data.msg == 'Authentication Failed Please provide auth token') {
                setError("Authentication Failed")

            } else if (error.response.data.msg == 'Authentication Failed')  {
                setError("Authentication Failed")

            } else if (error.response.data.msg == 'User Wallet not available') {
                setError("User wallet is not available")

            } else if(error.response.data.msg == 'Unable to get the Wallet of user') {
                setError("Unable to locate users wallet")

            } else if(error.response.data.msg == 'Server error') {
                setError("Server Error")
            }
        });
    }, [])


    const handleCurrencyClick = (currency) => {
        setSelectedCurrency(currency);
    };
    
    // console.log(userWallet)
    
    return (
        <div className="card" style={{backgroundColor: '#95b02f'}}>
            <div className="card-body">

                <div className="d-flex justify-content-between">
                    <h5 className="card-title my-1">Accounts</h5>

                    <div className="btn-group " role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light" onClick={()=> handleCurrencyClick('EUR')}>
                            <i className="bi bi-currency-euro"></i>
                            <span className='d-none d-sm-inline'>Euro</span> 
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=> handleCurrencyClick('USD')}>
                            <i className="bi bi-currency-dollar"></i>
                            <span className='d-none d-sm-inline'>USD</span>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=> handleCurrencyClick('INR')}>
                            <i className="bi bi-currency-rupee"></i>
                            <span className='d-none d-sm-inline'>INR</span>
                        </button>
                    </div>
                </div>

                {error ? (
                    <Stack sx={{ width: '100%', marginBottom: '20px', marginTop: '10px'}}>
                        <Alert severity="warning">{error}</Alert>
                    </Stack>
                ) : (
                    userWallet.map((wallet, index)=> (
                        <React.Fragment key={index}>
                            {selectedCurrency == wallet.currency && (
                                <React.Fragment>
                                    <h2 className="d-flex justify-content-center my-2"><span className="mx-1">{wallet.currency}</span> <b>{wallet.balance}</b></h2>
                                    <p className="d-flex justify-content-center text-muted">9090 7867 5467</p>
                                    <br />
                                </React.Fragment>
                            )}
                            </React.Fragment>
                        ))
                    )}
                
                
                {/* For large Device */}
                <div className='d-flex justify-content-center'>
                    <div className='d-none d-sm-none d-md-inline d-lg-inline'>
                        <button type="button" className="btn btn-light mx-1">
                            <i className="bi bi-arrow-down"></i>&nbsp;
                            Receive
                        </button>
                        <Link className="btn btn-light mx-1" to={'/deposit/'}>
                            <i className="bi bi-plus-lg"></i>&nbsp;
                            Add
                        </Link>
                        <Link to={'/moneytransfer/'} className="btn btn-light mx-1">
                        <i className="bi bi-arrow-up"></i>&nbsp;
                            Send
                        </Link>
                        <Link to={'/exchange-currency/'} className="btn btn-light mx-1">
                            <i className="bi bi-arrows"></i>&nbsp;
                            Convert
                        </Link>
                        <button type="button" className="btn btn-light mx-1">
                            <i className="bi bi-three-dots-vertical"></i>&nbsp;
                            More
                        </button>
                    </div>
                </div>

                {/* For small devices */}
                <div className='d-flex justify-content-center '>
                    <div className='d-sm-inline d-md-none'>
                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i className="bi bi-arrow-down"></i>
                        </a>

                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i className="bi bi-plus-lg"></i>
                        </a>
                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i className="bi bi-arrow-up"></i>
                        </a>

                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i className="bi bi-arrows"></i>
                        </a>

                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i className="bi bi-three-dots-vertical"></i>&nbsp;
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}