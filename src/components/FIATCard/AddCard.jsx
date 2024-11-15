import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../Authentication/axios';
import VisibilityIcon from '@mui/icons-material/Visibility';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: 370, sm:400},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





///// Add new Fiat Card
export default function AddNewFiatCard({open, setOpen}) {
    const handleClose = () => setOpen(false);
    const [formData, updateFormData] = React.useState({card_name: '', card_currency: ''});
    const [successMessage, setSuccessMessage] = React.useState('');
    const [error, setError] = React.useState('');
    
    /// Get the form data
    const handleChangeFormData = (e)=> {
        const { name, value } = e.target;

        if (name === 'card_name' && value.length > 20) {
            setError('Card name must be less than 20 letters');

        } else {
            setError('');
            
            updateFormData({
                ...formData,
                [name]: value
            })
        };
    };

    //// Submit form data
    const handleCreateNewCard = ()=> {
        if (!formData.card_name) {
            setError('Please fill card name')

        } else if (!formData.card_currency) {
            setError('Please select card currency')

        } else {
            axiosInstance.post(`/api/v7/user/fiat/card/`, {
                card_name: formData.card_name,
                currency: formData.card_currency
    
            }).then((res)=> {
                // console.log(res)

                setTimeout(() => {
                    setSuccessMessage('');
                    handleClose();
                }, 3000);
    
                if (res.status === 200 && res.data.success === true) {
                    setError('')
                    setSuccessMessage('Card Created Successfully')
                }
    
            }).catch((error)=> {
                // console.log(error);
    
                setTimeout(() => {
                    setError('')
                }, 3000);
    
                if (error.response.data.message === 'Invalid Currency') {
                    setError('Invalid Currency')
                } else if (error.response.data.message === 'Fiat Card already exists') {
                    setError('Fiat Card already exist')
                }
            })
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: 400,
                            width: '100%',
                            height: '80vh',
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'fixed',
                                top: 0,
                                width: '100%',
                                maxWidth: 400,
                                backgroundColor: 'white',
                                zIndex: 1,
                                padding: 2,
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6">Add Card</Typography>

                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Scrollable Content */}
                        <Box
                            sx={{
                                flex: 1,
                                marginTop: '30px', // Adjust based on header height
                                overflowY: 'auto',
                                width: '100%',
                                padding: 2,
                            }}
                        >
                         

                            {/* Card Display */}
                            <Card
                                sx={{
                                    background: 'grey',
                                    color: 'white',
                                    maxWidth: 400,
                                    ml: 2,
                                    boxShadow: 3,
                                    borderRadius: 5,
                                    height: '11.4rem',
                                    margin: 0,
                                    cursor: 'pointer',
                                    mb:2
                                }}
                            >
                                <CardContent>
                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                        <Typography variant="h6" sx={{ml:1}}>Currency</Typography>
                                        <Box>
                                            <img src="/card/chip.png" style={{ width: '30px', height: '30px' }} />
                                            <IconButton color="inherit">
                                                <VisibilityIcon style={{ fontSize: '16px' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                 
                                    <Box display="flex" justifyContent="space-around" my={1.2}>
                                        <Typography variant="h6">12**</Typography>
                                        <Typography variant="h6">***</Typography>
                                        <Typography variant="h6">***</Typography>
                                        <Typography variant="h6">**34</Typography>
                                    </Box>

                                    <small style={{ textTransform: "uppercase", wordWrap:'break-word', marginLeft:4 }}>CARD NAME</small>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center", my:0.2, ml:0.2 }}>

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Box>
                                                <Typography variant="caption"><small>Valid From</small></Typography>
                                                <Typography color="text.secondary">01/12</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption"><small>Valid Thru</small></Typography>
                                                <Typography color="text.secondary">01/12</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                            <TextField
                                label="Card Name"
                                name='card_name'
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                                onChange={handleChangeFormData}
                                value={formData.card_name}
                            />

                            {/* Form Fields */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    id="card_currency"
                                    label="Currency"
                                    name='card_currency'
                                    onChange={handleChangeFormData}
                                >
                                    <MenuItem value='USD'>USD</MenuItem>
                                    <MenuItem value='INR'>INR</MenuItem>
                                    <MenuItem value='EUR'>EUR</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                sx={{ backgroundColor: '#9b59b6', marginTop: 2 }}
                                onClick={handleCreateNewCard}
                            >
                                SUBMIT
                            </Button>

                            <p style={{display:'flex', justifyContent:'center', color:'red'}}>{error && error}</p>
                            <p style={{display:'flex', justifyContent:'center', color:'green'}}>{successMessage && successMessage}</p>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>

    );
};