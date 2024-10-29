import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, 
        TextField, InputAdornment, Button, Divider, FormControl, InputLabel } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import axiosInstance from '../Authentication/axios';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';



const Coin_Gecko_API     = import.meta.env.VITE_COIN_GECKO_API_KEY
const Coin_Gecko_API_URL = import.meta.env.VITE_COIN_GECKO_API_URL
const Free_currency_api  = import.meta.env.VITE_FREE_CURRENCY_API


const getCryptoIcons = (icon)=> {
    switch (icon) {
        case 'BTC':
            return <img src="/cryptoicons/BTCS.png" alt="BTC" width={20} height={20} />

        case 'ETH':
            return <img src="/cryptoicons/ETH.png" alt="ETH" width={20} height={20} />

        case 'XRP':
            return <img src="/cryptoicons/XRP.png" alt="XRP" width={20} height={20} />

        case 'DOGE':
            return <img src="/cryptoicons/DOGE.png" alt="DOGE" width={20} height={20} />

        case 'LTC':
            return <img src="/cryptoicons/LTC.png" alt="LTC" width={20} height={20} />

        case 'TOR':
            return <img src="/cryptoicons/TOR.png" alt="TOR" width={20} height={20} />

        case 'SOL':
            return <img src="/cryptoicons/SOL.png" alt="SOL" width={20} height={20} />

        default:
            return ''
    }
};


// Convert the Crypto name according to coin gecko Ids
const handleGetCryptoIds = (cryptoName)=> {
    if (cryptoName) {
        switch(cryptoName) {
            case 'BTC':
                return 'bitcoin'

            case 'ETH':
                return 'ethereum'

            case 'SOL':
                return 'solana'

            case 'XRP':
                return 'ripple'

            case 'DOGE':
                return 'dogecoin'

            case 'LTC':
                return 'litecoin'

            case 'BNB':
                return 'binancecoin'
            
            default:
                return 'bitcoin'
        }
    };
};



// Sell Crypto for user
export default function SellCrypto({open, setOpen}) {
    const handleClose = () => setOpen(false);
    const [operation, setOperation] = useState('buy');
    const [crypto, setCrypto]                  = useState('');    // Selected Crypto
    const [cryptoWallets, updateCryptoWallets] = useState([]);    // Crypto Wallet from API
    const [paymentType, setPaymentType] = useState('');           // Payment Type
    const [walletAddress, setWalletAddress] = useState('');       // Crypto Wallet Address
    const [userWallets, setUserWallets]        = useState([]);    // user Wallets from API
    const [Walletcurrency, setWalletCurrency]  = useState('');    // Wallet ID state
    const [findWalletCurrencyName, setFindWalletCurrencyName] = useState('');  // Currency Name
    const [cryptoName, setCryptoName]         = useState(''); // Crypto name from crypto wallets
    const [successMessage, setSuccessMessag]  = useState(''); // Success Message
    const [error, setError]                   = useState('');  // Error Message
    const [chargedFee, SetChargedFee]          = useState(0);  // Fee charged for Crypto Buy Transactions state
    const [convertedUSDValue, setConvertedUSDValue]  = useState(0);  // Value after crypto conversion
    const [currencyConversionAmount, setCurrencyConversionAmount] = useState(0); // From Crypto usd to Wallet currency

    const [exchangeAmount, setExchangeAmount] = useState(0); // Crypto input value
    const [exchangeResult, setExchangeResult] = useState(0);  // Exchange Result 


    // Fetch all the available crypto wallet of user
    useEffect(() => {
        axiosInstance.get(`/api/v2/user/crypto/wallets/`).then((res)=> {

            if (res.status === 200 && res.data.success === true) {
                updateCryptoWallets(res.data.user_crypto_wallets)
            }

        }).catch((error)=> {
            // console.log(error);
        })
    }, []);


     // Fetch wallet address according to the selected Crypto
     useEffect(() => {
        if (crypto) {
            axiosInstance.get(`/api/v2/user/crypto/wallet/address/${crypto}/`).then((res)=> {
    
                if (res.status === 200 && res.data.success === true) {
                    setWalletAddress(res.data.wallet_address)
                }
    
            }).catch((error)=> {
                // console.log(error);
            })
        }
    }, [crypto]);

    // Fetch available wallet of the User
    useEffect(() => {
        axiosInstance.get(`/api/v3/user/wallet/`).then((res)=> {
            // console.log(res)

            if (res.status === 200) {
                setUserWallets(res.data.user_wallet_data)
            }

        }).catch((error)=> {
            // console.log(error);
        })
    }, []);


    /// Get Crypto currency name from user wallets
    useEffect(() => {
        if (cryptoWallets && crypto) {
           const findCryptoCurrencyName = cryptoWallets.find((wallet)=> wallet.id === crypto)
           setCryptoName(findCryptoCurrencyName.crypto_name)
        }

   }, [cryptoWallets, crypto]);


   /// Get currency name from user wallets
    useEffect(() => {
        if (userWallets && Walletcurrency) {
        const findWalletCurrency = userWallets.find((wallet)=> wallet.id === Walletcurrency)
        setFindWalletCurrencyName(findWalletCurrency.currency)
        }

    }, [userWallets, Walletcurrency]);


    // Get assigned fee for Crypto Sell Transaction
    useEffect(() => {
       if (exchangeAmount) {
         axiosInstance.post(`/api/v2/charged/fee/`, {
            fee_type: 'Crypto Sell',
            amount: exchangeAmount

         }).then((res)=> {

            if (res.status === 200 && res.data.success === true){ 
                SetChargedFee(res.data.fee)
            }
         })
       }
    }, [exchangeAmount]);


    
    // Get The USD value of crypto from CoinGecko
    useEffect(() => {
        if (cryptoName) {
          const crypto_ids = handleGetCryptoIds(cryptoName);
  
          axiosInstance.get(`${Coin_Gecko_API_URL}/api/v3/simple/price/?ids=${crypto_ids}&vs_currencies=usd&x_cg_demo_api_key=${Coin_Gecko_API}`).then(
              (res)=> {
                  // console.log(res.data)
                  // console.log('crypto', res.data[crypto_ids].usd)
  
                  if ( res.status === 200) {
                      setConvertedUSDValue(res.data[crypto_ids].usd)
                  }
              }
          ).catch((error)=> {
              // console.log(error)
          })
        } else {
          console.log('crypto and Exchange Amount not present')
        }
      }, [cryptoName]);



      // Convert USD to Wallet currency
      useEffect(() => {
        if (findWalletCurrencyName) {
            const freecurrencyapi = new Freecurrencyapi(Free_currency_api);

            setTimeout(() => {
                freecurrencyapi.latest({
                    base_currency: 'USD',
                    currencies: findWalletCurrencyName
    
                }).then(response => {
                    // console.log(response.data[findWalletCurrencyName]);
                    setCurrencyConversionAmount(response.data[findWalletCurrencyName])
                });
            }, 700);
            
        } else {
            console.log('Wallet Currency Name not present to convert')
        }
      }, [findWalletCurrencyName]);



    // Calculate Crypto Value
    useEffect(() => {
        setTimeout(() => {
            if (currencyConversionAmount && convertedUSDValue && exchangeAmount) {
                const AmountToBeConvert = (parseFloat(currencyConversionAmount) * parseFloat(convertedUSDValue)) * parseFloat(exchangeAmount)
                setExchangeResult(AmountToBeConvert)

            } else {
                console.log('Not able to calculate crypto value')
            }
        }, 1000);

    }, [currencyConversionAmount, convertedUSDValue, exchangeAmount]);
    

    // Submmit Crypto Sell data
    const handleSubmitCryptoSell = ()=> {
        if (!exchangeAmount) {
            setError('Please type valid exchange amount')
        } else {

            axiosInstance.post(`/api/v2/user/crypto/sell/`, {
                crypto_wallet_id: parseInt(crypto),
                payment_type: paymentType,
                wallet_id: parseInt(Walletcurrency),
                selling_qty: parseFloat(exchangeAmount),
                converted_amount: parseFloat(exchangeResult)
    
            }).then((res)=> {
                console.log(res)
    
                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessag('Crypto Sold successfully Please wait for Admin Approval')

                    setTimeout(() => {
                        setSuccessMessag('')
                        handleClose();
                    }, 2000);
                }
    
            }).catch((error)=> {
                // console.log(error);
    
                if (error.response.data.message === 'Invalid Crypto Wallet') {
                    setError('Invalid Crypto Wallet')
                } else if (error.response.data.message === 'Insufficient fund') {
                    setError('Insufficient Funds')
                } else if (error.response.data.message === 'Crypto wallet has not approved') {
                    setError('Crypto wallet has not approved yet')
                } else if (error.response.data.message === 'Invalid Wallet') {
                    setError('Invalid Wallet')
                } else {
                    setError('')
                };
             });
        }
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ p: 3, maxWidth: '400px', mx: 'auto', borderRadius: '8px', boxShadow: 3, backgroundColor: 'white', overflow:'auto', maxHeight: '100vh' }}>
                    <Typography variant="h6" gutterBottom>Buy Crypto Currency</Typography>
                    
                    {/* Buy/Sell Toggle */}
                    <RadioGroup
                        row
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        sx={{ mb: 2 }}
                        color='success'
                    >
                        <FormControlLabel value="sell" control={<Radio color='error' checked />} label="Sell" />    
                    </RadioGroup>
                    
                    {/* Crypto Selection */}
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Select Crypto</InputLabel>
                        <Select
                            value={crypto}
                            onChange={(e) => setCrypto(e.target.value)}
                            label='Select Crypto'
                        >
                            {cryptoWallets.map((wallet, index)=> (
                                <MenuItem key={index} value={wallet.id}>{wallet.crypto_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Payment Type */}
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                            <Select
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                label="Payment Type"
                                >
                            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                            <MenuItem value="Paypal">Paypal</MenuItem>
                            <MenuItem value="UPI">UPI</MenuItem>
                            <MenuItem value="Stripe">Stripe</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Wallet Address */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={walletAddress ? walletAddress : ''}
                        disabled
                        sx={{ mb: 2 }}
                        label='Wallet Address'
                        inputProps={{
                            sx: {
                                fontSize: '12px'
                            }
                        }}
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Select Wallet Currency</InputLabel>
                        <Select
                            value={Walletcurrency}
                            label="Select Wallet Currency"
                            onChange={(e) => setWalletCurrency(e.target.value)}
                            >
                            {userWallets.map((wallet, index)=> (
                                    <MenuItem key={index} value={wallet.id}>{wallet.currency}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            type='number'
                            value={exchangeAmount}
                            onChange={(e) => setExchangeAmount(e.target.value)}
                            sx={{ mr: 1, flexGrow: 1 }}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {getCryptoIcons(cryptoName ? cryptoName : '')}
                                </InputAdornment>
                                ),
                            }}
                        />
                        <SwapHorizIcon sx={{ mx: 2 }} />

                        <TextField
                            value={exchangeResult}
                            disabled
                            sx={{ flexGrow: 1 }}
                        />
                    </Box>

                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{display:'flex', justifyContent:'flex-start'}}>
                        Fee Charge: &nbsp;{getCryptoIcons(cryptoName ? cryptoName : '')} &nbsp;{chargedFee}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />

                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmitCryptoSell}>
                        Proceed
                    </Button>

                    <p style={{color:'green', display:'flex', justifyContent:'center'}}>{successMessage && successMessage}</p>
                    <p style={{color:'red', display:'flex', justifyContent:'center'}}>{error && error}</p>

                </Box>
            </Modal>
        </div>
    );
}
