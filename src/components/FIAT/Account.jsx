import React, { useEffect, useState } from "react"
import axiosInstance from '../Authentication/axios';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography, ButtonGroup, Button } from "@mui/material";
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';



export default function FiatAccount() {
    const [userWallet, updateUserWallet] = useState([]);
    const [error, setError] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem('UserSelectedDefaultCurrency') || 'USD');
    const [selectedWalletId, setSelectedWalletId] = useState(localStorage.getItem('UserSelectedWalletID') || '');


    useEffect(() => {
        axiosInstance.get(`api/v3/user/wallet`).then((res)=> {

             if(res.data.user_wallet_data) {
                updateUserWallet(res.data.user_wallet_data)
                // console.log(res.data.user_wallet_data)

                if(!selectedWalletId) {
                    const defaultWalletID = res.data.user_wallet_data.find(wallet => wallet.currency === 'USD');

                    if (defaultWalletID) {
                        setSelectedWalletId(defaultWalletID.id);
                        localStorage.setItem('UserSelectedWalletID', defaultWalletID.id);
                      }
                };
             }
        }).catch((error)=> {
            console.log(error.response)

            if (error.response.data.msg == 'User Wallet not available') {
                setError("User wallet is not available")

            } else if(error.response.data.msg == 'Unable to get the Wallet of user') {
                setError("Unable to locate users wallet")

            } else if(error.response.data.msg == 'Server error') {
                setError("Server Error")
            }

            if (error.response.statusText === 'Unauthorized') {
                window.location.href = '/signin/'
            }
        });
    }, [])


    const handleCurrencyClick = (currency) => {
        setSelectedCurrency(currency);

        const selectedWallet = userWallet.find(wallet => wallet.currency === currency)

        if (selectedWallet) {
            setSelectedWalletId(selectedWallet.id);
            localStorage.setItem('UserSelectedWalletID', selectedWallet.id);
            localStorage.setItem('UserSelectedDefaultCurrency', currency);
        } 
    };
    // console.log(userWallet)
    

    return (
        <div className="card" style={{backgroundColor: '#95b02f'}}>
            <div className="card-body">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Title */}
                <Typography variant="h5" component="div">
                    Accounts
                </Typography>

                {/* Currency Buttons */}
                <ButtonGroup variant="outlined" aria-label="currency selection">

                <Button
                    variant={selectedCurrency === 'EUR' ? 'contained' : 'outlined'}
                    onClick={() => handleCurrencyClick('EUR')}
                    startIcon={<EuroIcon />}
                >
                    <span className='d-none d-sm-inline'>Euro</span>
                </Button>

                <Button
                    variant={selectedCurrency === 'USD' ? 'contained' : 'outlined'}
                    onClick={() => handleCurrencyClick('USD')}
                    startIcon={<AttachMoneyIcon />}
                >
                    <span className='d-none d-sm-inline'>USD</span>
                </Button>

                <Button
                    variant={selectedCurrency === 'INR' ? 'contained' : 'outlined'}
                    onClick={() => handleCurrencyClick('INR')}
                    startIcon={<CurrencyRupeeIcon />}
                >
                    <span className='d-none d-sm-inline'>INR</span>
                </Button>

                </ButtonGroup>
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
                                    <h2 className="d-flex justify-content-center my-2"><span className="mx-1">{wallet.currency}</span> <b>{wallet.balance.toFixed(4)}</b></h2>
                                    <p className="d-flex justify-content-center text-muted">{wallet.wallet_id ? wallet.wallet_id : '9999-8888-1111'}</p>
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
    );
};