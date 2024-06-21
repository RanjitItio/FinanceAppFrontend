import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Grid from '@mui/material/Grid';
import { useTheme, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MerchantHTMLFormGenerator from './HtmlForm';
import MerchantDetails from './MerchantDetail';
import GenerateMerchantQRCode from './MerchantQRCode';
import axiosInstance from '../Authentication/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';






export default function Merchants ({open}) {
    const navigate =  useNavigate();

    const [htmlFormOpen, setHtmlFormOpen]             = useState(false);
    const [merchantdetailOpen, setMerchantDetailOpen] = useState(false);
    const [QRCodeOpen, setQRCodeOpen]                 = useState(false);
    const [merchantsData, setMerchantsData]           = useState([]);
    const [loader, setLoader]                         = useState(true);
    const [MerchantDetail, updateMerchantDetailData]  = useState([]);
    const [MerchantCurrency, updateMerchantCurrency]  = useState([]);
    const [merchantId, updateMerchanTID]              = useState([]);


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickHTMLFormOpen = (event, mct_id, currency) => {
        setHtmlFormOpen(true);

        updateMerchanTID(mct_id)
        updateMerchantCurrency(currency)
      };

    const handleClickMerchantDetailOpen = (evenet, merchant, currency) => {
        updateMerchantDetailData(merchant)
        updateMerchantCurrency(currency)
        setMerchantDetailOpen(true);
      };

    const handleClickQRCodeOpen = () => {
        setQRCodeOpen(true);
      };

    const handleEditRedirect = (merchant, curr) => {
        const merch    = merchant
        const currency = curr
        navigate('/edit/merchant/', {state: {merchant_details: merch, currency: currency}})
    };

    // Get all the Merchants created by the user
    useEffect(() => {
        axiosInstance.get(`api/v4/user/all/merchants/`).then((res) => {
            // console.log(res.data.data)
            if (res.data.data) {
                setMerchantsData(res.data.data)
                setLoader(false)
            }

        }).catch((error)=> {
            console.log(error)

        })

    }, []);



    if (merchantsData.length === 0) {
        return (
            <Main open={open}>
            <DrawerHeader />
            <div className="d-flex justify-content-center">
                <p className='fs-3'>MERCHANTS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>List of all merchant account in one place</p>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Link to={'/add/merchants/'} className="btn btn-primary">
                    <i className="bi bi-plus-lg mx-1"></i>
                    Add Merchant
                </Link>
            </div>
            <br />
                <p style={{justifyContent:'center', marginTop: '10%', marginLeft: '40%'}}><b>No Merchants available</b></p>
            </Main>
        )
    };

    if (loader) {
        return (
            <Main open={open}>
            <DrawerHeader />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%'}}>
                <CircularProgress />
            </Box>

            </Main>
        )
    };



    const getStatusColor = (status) => {
        switch(status){
            case 'Approved':
                return <span className="text-success mx-5">Approved</span>
            case 'Cancelled':
                return <span className="text-danger mx-5">Rejected</span>
            case 'Moderation':
                return <span className="text-warning mx-5">Moderation</span>
        }

    };


    return (
        <>
        <Main open={open}>
        <DrawerHeader />

            <div className="d-flex justify-content-center">
                <p className='fs-3'>MERCHANTS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>List of all merchant account in one place</p>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Link to={'/add/merchants/'} className="btn btn-primary">
                    <i className="bi bi-plus-lg mx-1"></i>
                    Add Merchant
                </Link>
            </div>
            <br />
            {merchantsData.map((mct, index)=> (
            <List key={index}>
                <ListItem
                    disablePadding
                    secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <ArrowRightIcon />
                    </IconButton>
                    }
                    className="shadow border border-secondary"
                >
                    <ListItemButton>
                    
                    <ListItemAvatar>
                        <img
                        src={mct.merchants.logo}
                        alt="Merchant logo"
                        style={{ maxWidth: '50px', maxHeight: '50px', overflow: 'auto' }}
                        />
                    </ListItemAvatar>
                   
                    <Grid container spacing={2} alignItems="center">
                            {/* Business Name and URL */}
                            <Grid item xs={12} sm={4} md={3}>
                                <ListItemText
                                style={{ marginLeft: isSmallScreen ? '0' : '5px' }}
                                primary={<p className="fs-7">{mct.merchants.bsn_name}</p>}
                                secondary={<span className="text-muted"><i>{mct.merchants.bsn_url}</i></span>}
                            />
                            </Grid>

                            {/* Merchant ID and Status */}
                            <Grid item xs={12} sm={4} md={3}>
                            <ListItemText
                                style={{ }}
                                primary={<small>{mct.merchants.merchant_id ? mct.merchants.merchant_id : 'NA'}</small>}
                                secondary={mct.merchants ? getStatusColor(mct.merchants.status) : 'NA'}

                                sx={{ textAlign: 'left', marginRight: isSmallScreen ? '0%' : '15%' }}
                            />
                            </Grid>

                            {/* Currency Name */}
                            <Grid item xs={12} sm={4} md={2}>
                            <ListItemText
                                primary={<p className="fs-7">{mct.currency.name}</p>}
                                
                                sx={{ textAlign: isSmallScreen ? 'left' : 'right' }}
                            />
                            </Grid>
                        
                        
                        {/* Icons */}
                        <Grid item xs={12} sm={12} md={4}>
                        <ListItemText
                            primary={
                                <>
                             
                            <Box display="flex" justifyContent={isSmallScreen ? 'center' : 'flex-end'} alignItems="center">
                                {mct.merchants && mct.merchants.is_active ? 
                                <>
                                   <Box mr={2}>
                                   <Tooltip title="Generate QR code">
                                       <IconButton
                                           onClick={handleClickQRCodeOpen}
                                       >
                                           <QrCodeScannerIcon 
                                           sx={{
                                               color: 'black', 
                                               '&:hover': {
                                               color: 'blue', 
                                               },
                                               transition: 'color 0.3s',
                                           }}
                                           
                                           />
                                       </IconButton>
                                   </Tooltip>
                                   
                                    </Box>
                                    <Box mr={2} >
                                        <Tooltip title="Generate html Form">
                                            <IconButton onClick={(event)=> {handleClickHTMLFormOpen(event, mct.merchants, mct.currency)}}>
                                                <SettingsIcon 
                                                
                                                sx={{
                                                    color: 'black', 
                                                    '&:hover': {
                                                    color: 'blue', 
                                                    },
                                                    transition: 'color 0.3s',
                                                }}
                                            />
                                            </IconButton>
                                        </Tooltip>
                                        
                                    </Box>
                               </>
                                : 
                                <>
                                    <Box mr={2}>
                                    <Tooltip title="Generate QR code">
                                        <IconButton
                                        >
                                            <QrCodeScannerIcon 
                                            sx={{
                                                color: 'black', 
                                                '&:hover': {
                                                color: 'blue', 
                                                },
                                                transition: 'color 0.3s',
                                            }}
                                            
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    
                                        </Box>
                                        <Box mr={2} >
                                            <Tooltip title="Generate HTML Form">
                                                <IconButton>
                                                    <SettingsIcon 
                                                    
                                                    sx={{
                                                        color: 'black', 
                                                        '&:hover': {
                                                        color: 'blue', 
                                                        },
                                                        transition: 'color 0.3s',
                                                    }}
                                                />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </>
                                    }
                                
                                <Box mr={2}>
                                    <Tooltip title="View detail">
                                        <IconButton onClick={(event)=> {handleClickMerchantDetailOpen(event, mct.merchants, mct.currency); }} >
                                            <VisibilityIcon 
                                            
                                            sx={{
                                                color: 'black', 
                                                '&:hover': {
                                                color: 'blue', 
                                                },
                                                transition: 'color 0.3s',
                                            }}
                                        />
                                        </IconButton>
                                    </Tooltip>
                                    
                                </Box>
                                <Box>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={()=> {handleEditRedirect(mct.merchants, mct.currency)}}>
                                            <EditOutlinedIcon 
                                            sx={{
                                                color: 'black', 
                                                '&:hover': {
                                                color: 'blue', 
                                                },
                                                transition: 'color 0.3s',
                                            }}
                                        />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            </>
                            }
                            sx={{ textAlign: 'right' }}
                        />
                        </Grid>
                    </Grid>
                    </ListItemButton>
                </ListItem>
            </List>
             ))}

             {/* Pagination */}
            <Pagination count={10} color="primary" sx={{float:'right', marginTop: '20px'}} />
        </Main>

        <MerchantHTMLFormGenerator 
             setHtmlFormOpen={setHtmlFormOpen} 
             htmlFormOpen={htmlFormOpen}
             merchantId={merchantId}
             MerchantCurrency={MerchantCurrency}
             />

        <MerchantDetails 
               merchantdetailOpen={merchantdetailOpen} 
               setMerchantDetailOpen={setMerchantDetailOpen} 
               MerchantDetail={MerchantDetail} 
               MerchantCurrency={MerchantCurrency}
            />

        <GenerateMerchantQRCode QRCodeOpen={QRCodeOpen} setQRCodeOpen={setQRCodeOpen} />

        </>

    );
};

