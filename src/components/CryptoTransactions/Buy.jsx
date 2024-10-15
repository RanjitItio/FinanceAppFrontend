import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, 
        TextField, InputAdornment, Button, Divider, FormControl, InputLabel } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function BuyCrypto({open, setOpen}) {
    const handleClose = () => setOpen(false);
    const [operation, setOperation] = useState('buy');
    const [crypto, setCrypto] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [currencyType, setCurrencyType] = useState('USD');
    const [exchangeAmount, setExchangeAmount] = useState(50);
    const [exchangeResult, setExchangeResult] = useState(0.326477309826967);


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
                        <FormControlLabel value="buy" control={<Radio color='success' />} label="Buy" />    
                    </RadioGroup>  
                    
                    {/* Crypto Selection */}
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Select Crypto</InputLabel>
                        <Select
                            value={crypto}
                            onChange={(e) => setCrypto(e.target.value)}
                            label='Select Crypto'
                        >
                            <MenuItem value="SOL_TEST">SOL_TEST</MenuItem>
                            <MenuItem value="SOL_TEST">BTC</MenuItem>
                            <MenuItem value="SOL_TEST">ETH</MenuItem>
                            <MenuItem value="SOL_TEST">TOR</MenuItem>
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
                        </Select>
                    </FormControl>

                    {/* Wallet Address */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={walletAddress}
                        disabled
                        sx={{ mb: 2 }}
                        label='Wallet Address'
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Select Wallet Currency</InputLabel>
                        <Select
                            value={currencyType}
                            label="Select Wallet Currency"
                            onChange={(e) => setCurrencyType(e.target.value)}
                            >
                            <MenuItem value="USD">USD</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            value={exchangeAmount}
                            onChange={(e) => setExchangeAmount(e.target.value)}
                            sx={{ mr: 1, flexGrow: 1 }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <SwapHorizIcon sx={{ mx: 2 }} />

                        <TextField
                            value={exchangeResult}
                            disabled
                            sx={{ flexGrow: 1 }}
                        />
                    </Box>

                    <Typography variant="body2" color="textSecondary" gutterBottom>Fee Charge: $8</Typography>
                    
                    <Divider sx={{ my: 2 }} />

                    <Button variant="contained" color="primary" fullWidth>Proceed</Button>
                </Box>

            </Modal>
        </div>
    );
}
