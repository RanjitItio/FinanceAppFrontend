import {Main, DrawerHeader} from '../Content';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';



export default function AddNewMerchant({open}) {

    const navigate = useNavigate();

    const initialFormData = {
        business_name: '',
        site_url:      '',
        currency:      '',
        message:       '',
        img:           null
    }

    const [currencies, setCurrencies]             = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [formData, updateFormData]              = useState(initialFormData);
    const [error, setError]                       = useState('');
    const [successMessage, setSuccessMessage]     = useState('');
    const [urlError, setUrlError]                 = useState('');


    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    // Load Currencies when page loads
    useEffect(() => {
      axiosInstance.get(`api/v2/currency/`).then((res)=> {
            // console.log(res.data.currencies)
            if (res.data && res.data.currencies){
                setCurrencies(res.data.currencies)

            };
      }).catch((error) => {
        console.log(error)

      })
    }, []);


    const validateURL = (url) => {
        const urlPattern = /^(https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return urlPattern.test(url);
    };

    const handleFormValueChange = (event)=> {
        const { name, value, files } = event.target;

        if (name == 'img') {
            updateFormData({
                ...formData,
                [name]: files[0],
            });

        } else {
            if (name == 'site_url') {
                if (!validateURL(value)) {
                    setUrlError('Please provide a valid url')

                } else {
                    setUrlError('')
                }
            }
            updateFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    

    const handleFormSubmit = (event) => {
       
        if(formData.business_name === '') {
            setError('Please type your Business Name')

        } else if (formData.site_url === '') {
            setError('Please type your url')

        } else if (formData.currency === '') {
            setError('Please select your transaction Currency')

        } else if (formData.message === '') {
            setError('Please type your Message')

        } else {
            setError('')

            const FormDataObj = new FormData()

            FormDataObj.append('bsn_name', formData.business_name)
            FormDataObj.append('bsn_url', formData.site_url)
            FormDataObj.append('currency', formData.currency)
            FormDataObj.append('bsn_msg', formData.message)
            FormDataObj.append('logo', formData.img)

            axiosInstance.post(`api/v4/user/merchant/`, FormDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }).then((res)=> {
                // console.log(res)
                if (res.status == 200) {
                    setSuccessMessage('Merchant created successfully please wait for admin Approval')

                    setTimeout(() => {
                        navigate('/merchants/')
                    }, 3000);

                }

            }).catch((error) => {
                console.log(error)

            })
        }
    };
    

    return (
        <Main open={open}>
            <DrawerHeader />
            <div className="d-flex justify-content-center">
                <p className='fs-3'>NEW MERCHANTS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>Fill in the Information needed to create a merchant account</p>
            </div>
            <br />
            
            {/* Carousel */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Paper elevation={3}> 
                        <p className='fs-5 d-flex justify-content-center text-primary'><b>Being A</b></p>
                        <p className='fs-4 d-flex justify-content-center my-2'><b>Merchant</b></p>

                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            {/* <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div> */}
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://python-uat.oyefin.com/media/add_merchant/merchant_payment.png" className="d-block" alt="..." style={{maxWidth: '200px', maxHeight: '200px', marginLeft: '120px'}} />
                                    <p style={{ textAlign: 'center', maxWidth: '300px', marginLeft: '85px' }} className='my-3 text-muted'>
                                        Merchant Account will allow your business to accept payment from your customers
                                    </p>
                                </div>

                                <div className="carousel-item" >
                                    <img src="https://python-uat.oyefin.com/media/signup/user.png" className="d-block" alt="..." style={{maxWidth: '200px', maxHeight: '200px', marginLeft: '120px'}} />
                                    <p style={{ textAlign: 'center', maxWidth: '300px', marginLeft: '85px' }} className='my-3 text-muted'>
                                        Once the a merchant is approved by the Administrtor, The merchant account is ready to accept payments.
                                    </p>
                                </div>

                                <div className="carousel-item">
                                    <img src="https://python-uat.oyefin.com/media/signup/merchant.png" className="d-block" alt="..." style={{maxWidth: '200px', maxHeight: '200px', marginLeft: '120px'}} />
                                    <p style={{ textAlign: 'center', maxWidth: '300px', marginLeft: '85px' }} className='my-3 text-muted'>
                                        Money added to your wallets when customer pays for product and service.
                                    </p>
                                </div>
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"  >
                                <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundColor: '#C4FCEF'}}></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor: '#C4FCEF'}}></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </Paper>
                </Grid>
                {/* Carousel */}

                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Paper elevation={3} sx={{ maxHeight: '100rem', overflow: 'auto' }}>
                       
                        <Box sx={{ p: 3 }}>
                            
                            <p style={{textAlign: 'center'}} className='fs-3 my-3'>Merchant Form</p>
                            <TextField 
                                id="business-name" 
                                name='business_name'
                                onChange={handleFormValueChange}
                                label="Business Name" 
                                variant="outlined" 
                                placeholder='Enter your business name'
                                fullWidth
                                sx={{marginBottom: 2}}
                                />

                            <TextField 
                                id="business-url" 
                                name='site_url'
                                onChange={handleFormValueChange}
                                label="Site URL" 
                                variant="outlined" 
                                placeholder='https://example.com'
                                fullWidth 
                                sx={{marginBottom: 2}}
                                error={Boolean(urlError)}
                                helperText={urlError}
                                />

                                <FormControl fullWidth sx={{marginBottom: 2}}>
                                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-currency-select"
                                    name='currency'
                                    value={selectedCurrency}
                                    label="Currency"
                                    onChange={(event) => {handleCurrencyChange(event); handleFormValueChange(event);}}
                                    >
                                        {currencies.map((curency)=> (
                                            <MenuItem value={curency.name} key={curency.id}>
                                                {curency.name}
                                            </MenuItem>
                                        ))}
                                    
                                    </Select>
                                </FormControl>

                            <Textarea 
                                color="primary"
                                name='message'
                                onChange={handleFormValueChange}
                                minRows={5} 
                                placeholder='Enter your Message here'
                                sx={{marginBottom: 2, width: '100%'}}
                                />

                            <input 
                                type="file" 
                                placeholder='Upload Logo'
                                name="img" 
                                id="logo" 
                                style={{marginBottom: 20, width: '100%'}}
                                onChange={handleFormValueChange}
                                /> 
                            <br />

                            <Button variant="contained" fullWidth sx={{marginBottom: 2}} onClick={handleFormSubmit}>Create Merchant</Button>
                            {error && <p className='text-danger'>{error}</p>}
                            {successMessage && <p className='text-success'>{successMessage}</p>}
                        </Box>
                       
                    </Paper>
                </Grid>
            </Grid>
        </Main>
    );
};

