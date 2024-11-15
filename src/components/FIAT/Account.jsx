import React, { useEffect, useState } from "react"
import axiosInstance from '../Authentication/axios';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography, ButtonGroup, Button, Box, IconButton } from "@mui/material";
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiatMyCard from "../FIATCard/Mycard";



/// ALl Fiat Accounts
export default function FiatAccount({selectedCurrency, setSelectedCurrency}) {
    const [userWallet, updateUserWallet] = useState([]);
    const [error, setError] = useState('');
    const [selectedWalletId, setSelectedWalletId] = useState(localStorage.getItem('UserSelectedWalletID') || '');
    const [showMyCard, setShowMyCard] = useState(false);  /// 


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
            // console.log(error.response)

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

    //// Get Selected Currency of Wallet
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
    <>
        <div className="card" style={{backgroundColor: '#95b02f'}}>
            <div className="card-body">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Title */}
                <Typography variant="h5" component="div" sx={{fontSize: {xs:'1.08rem', sm:'1.7rem'}}}>
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
                                    <h5 className="d-flex justify-content-center my-2"><span className="mx-1">{wallet.currency}</span> <b>{wallet.balance.toFixed(4)}</b></h5>
                                    <p className="d-flex justify-content-center text-muted">{wallet.wallet_id ? wallet.wallet_id : '9999-8888-1111'}</p>
                                    <br />
                                </React.Fragment>
                            )}
                            </React.Fragment>
                        ))
                    )}
                
                
                {/* For large Device */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex'}, justifyContent:'center' }}>
                        <Button variant="contained" startIcon={<ArrowDownwardIcon />} sx={{ mx: 0 }}>
                            Receive
                        </Button>

                        <Button
                            component={Link}
                            to="/deposit/"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ mx: 1, minWidth:'100px' }}
                        >
                            Add
                        </Button>

                        <Button
                            component={Link}
                            to="/moneytransfer/"
                            variant="contained"
                            startIcon={<ArrowUpwardIcon />}
                            sx={{ mx: 0.3 }}
                        >
                            Send
                        </Button>

                        <Button
                            component={Link}
                            to="/exchange-currency/"
                            variant="contained"
                            startIcon={<SwapHorizIcon />}
                            sx={{ mx: 0.3 }}
                        >
                            Convert
                        </Button>

                        <Button variant="contained" startIcon={<MoreVertIcon />} sx={{ mx: 0.3 }}>
                            More
                        </Button>
                    </Box>

                {/* For small devices */}
                    {/* Visible on small devices, hidden on medium devices */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none' }, justifyContent:"center" }}>
                        <IconButton sx={{ mr: '1px' }} color="primary">
                            <ArrowDownwardIcon />
                        </IconButton>

                        <IconButton sx={{ mr: '1px' }} color="primary">
                            <AddIcon />
                        </IconButton>

                        <IconButton sx={{ mr: '1px' }} color="primary">
                            <ArrowUpwardIcon />
                        </IconButton>

                        <IconButton sx={{ mr: '1px' }} color="primary">
                            <SwapHorizIcon />
                        </IconButton>

                        <IconButton sx={{ mr: '1px' }} color="primary">
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
            </div>
        </div>
    </>
    );
};