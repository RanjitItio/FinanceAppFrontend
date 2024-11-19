import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Button, IconButton, Divider, Avatar, ButtonBase,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactCardFlip from 'react-card-flip';
import axiosInstance from '../Authentication/axios';
import AddNewFiatCard from './AddCard';
import UpdateFiatCard from './UpdateCard';
import UpdateFiatCardPIN from './UpdatePIN';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Tooltip from '@mui/material/Tooltip';
import DeleteFiatCard from './DeleteCard';




//// Format datetime into card date month
const DateTimeFormat = (dateString)=> {
    const date = new Date(dateString)
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;

    return formattedDate
};


//// Card Color
const handleChangeCardColor = (currency, status)=> {
    if (status === 'Inactive') {
        return 'linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%)'
    } else if (currency === 'USD') {
        return 'linear-gradient(to top, #37ecba 0%, #72afd3 100%)'
     } else if (currency === 'EUR') {
        return 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)'
     } else if (currency === 'INR') {
        return 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)'
     }
};


//// User FIAT Card section
export default function FiatMyCard({selectedCurrency}) {
    const [isFlipped, setIsFlipped]      = useState(false);  /// Card flip state
    const [cardDetail, updateCardDetail] = useState([]);  /// User Cards
    const [noCard, setNoCard]            = useState(false);  /// 
    const [openAddCard, setOpenAddCard]  = useState(false);  /// Add card Modals state
    const [availableCard, setAvailableCard] = useState(false);  //// Card available for selected wallet
    const [availableCardDetail, setAvailableCardDetail] = useState([]);  //// Specific Card detail
    const [showCardNumber, setShowCardNumber] = useState(false);
    const [openUpdateCard, setOpenUpdateCard] = useState(false);   /// Update Card Modal
    const [openUpdatePIN, setOpenUpdatePIN]   = useState(false);  /// Update PIN Modal
    const [openDeleteCard, setOpenDeleteCard] = useState(false);

    


    /// Card Flip Method
    const handleCardFlipClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    ////// Open Add New Card Modal
    const handleOpenAddNewCard = ()=> {
        setOpenAddCard(true);
    };


    //// Selected Wallet currency
    useEffect(()=> {
        if (selectedCurrency && cardDetail) {
           ///// Check the card of the wallet
           const walletCard = cardDetail.find((a,b)=> a.currency === selectedCurrency);
           
           if (walletCard) {
                setAvailableCard(true);
                setAvailableCardDetail(walletCard);
           } else {
                setAvailableCard(false);
           }
        }
    }, [selectedCurrency,cardDetail]);

    
    //// Get card related to a user
    useEffect(() => {
       axiosInstance.get(`/api/v7/user/fiat/card/`).then((res)=> {
        //   console.log(res)

          if (res.status === 200 && res.data.success === true) {
            updateCardDetail(res.data.user_fiat_cards)
            setNoCard(false);
          }

       }).catch((error)=> {
        //   console.log(error);
          if (error.response.data.message === 'No Card found') {
            setNoCard(true);
          }

       })
    }, []);

      

    return (
    <>
        <Card variant="outlined" sx={{borderRadius:4 }}>
            <CardContent>
                <CardHeader
                    title="My Card"
                    titleTypographyProps={{ variant: 'h5' }}
                    action={
                        <>
                            {availableCard && (
                                <>
                                    <Tooltip title="Update">
                                        <IconButton onClick={()=> setOpenUpdateCard(true)}>
                                            <BorderColorIcon color='primary' />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton onClick={()=> setOpenDeleteCard(true)}>
                                            <DeleteIcon color='primary' />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </>
                    }
                />

                

            {!noCard && availableCard ? (
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <Card
                        onClick={handleCardFlipClick}
                        sx={{
                            background: `${handleChangeCardColor(selectedCurrency, availableCardDetail.status)}`,
                            color: 'white',
                            maxWidth: 400,
                            ml: 2,
                            boxShadow: 3,
                            borderRadius: 5,
                            height: '11.4rem',
                            margin: 0,
                            cursor: 'pointer',
                        }}
                    >
                        <CardContent>
                            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography variant="h6" sx={{ml:1}}>{selectedCurrency}</Typography>
                                <Box>
                                    <img src="/card/chip.png" style={{ width: '30px', height: '30px' }} />
                                        <IconButton color="inherit" onClick={(e)=> {
                                                e.stopPropagation()
                                                setShowCardNumber(!showCardNumber); 
                                            }}>
                                            <VisibilityIcon style={{ fontSize: '16px' }} />
                                        </IconButton>
                                </Box>
                            </Box>

                            {!showCardNumber ? (
                                 <Box display="flex" justifyContent="space-around" my={1.2}>
                                    <Typography variant="h6">{availableCardDetail.card_number.slice(0,2)}**</Typography>
                                    <Typography variant="h6">***</Typography>
                                    <Typography variant="h6">***</Typography>
                                    <Typography variant="h6">*{availableCardDetail.card_number.slice(14,16)}</Typography>
                                </Box>
                            ) : (
                                <Box display="flex" justifyContent="space-around" my={1.2}>
                                    <Typography variant="h6">{availableCardDetail.card_number.slice(0,4)}</Typography>
                                    <Typography variant="h6">{availableCardDetail.card_number.slice(4,8)}</Typography>
                                    <Typography variant="h6">{availableCardDetail.card_number.slice(8,12)}</Typography>
                                    <Typography variant="h6">{availableCardDetail.card_number.slice(12,16)}</Typography>
                                </Box>
                            )}

                            <small style={{ textTransform: "uppercase", wordWrap:'break-word', marginLeft:4 }}>{availableCardDetail.card_name}</small>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center", my:0.2, ml:0.2 }}>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Box>
                                        <Typography variant="caption"><small>Valid From</small></Typography>
                                        <Typography color="text.secondary">{DateTimeFormat(availableCardDetail.valid_from)}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption"><small>Valid Thru</small></Typography>
                                        <Typography color="text.secondary">{DateTimeFormat(availableCardDetail.valid_thru)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Backside Card */}
                    <Card
                        onClick={handleCardFlipClick}
                        sx={{
                            maxWidth: 400,
                            height: '11.4rem',
                            backgroundColor: '#e0dddd',
                            borderRadius: 5,
                            padding: 2,
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        {/* Magnetic Line */}
                        <Box
                            sx={{
                                backgroundColor: 'black',
                                height: 30,
                                width: '100%',
                                borderRadius: 1,
                                marginBottom: 2,
                            }}
                        />

                        {/* Signature Lines */}
                        <Box
                            sx={{
                                backgroundColor: '#fdf4ca',
                                height: 50,
                                padding: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                marginBottom: 2,
                            }}
                        >
                            {/* Yellow Strips */}
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: 0.04,
                                        backgroundColor: '#ffd700',
                                        width: '80%',
                                        marginLeft: 1,
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Security Code */}
                        <Typography
                            sx={{
                                position: 'absolute',
                                top: '76px',
                                right: '25px',
                                fontWeight: 'bold',
                            }}
                        >
                            {availableCardDetail.cvv}
                        </Typography>

                        {/* Set PIN Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                sx={{ backgroundColor: '#8a2be2', color: 'white' }}
                                onClick={(e)=> {
                                    e.stopPropagation();
                                    setOpenUpdatePIN(true);
                                }}
                            >
                                SET PIN
                            </Button>
                        </Box>
                    </Card>
                </ReactCardFlip>
            ) : (
                <Card
                    sx={{
                        background: 'linear-gradient(to top, #37ecba 0%, #72afd3 100%)',
                        color: 'white',
                        maxWidth: 400,
                        ml: 2,
                        boxShadow: 3,
                        borderRadius: 5,
                        height: '11.4rem',
                        margin: 0,
                        cursor: 'pointer',
                    }}
                >
                    <CardContent>
                        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Typography variant="h6" sx={{ml:1}}>Demo Card</Typography>
                        </Box>

                      
                        <Box display="flex" justifyContent="space-around" my={1.2}>
                            <Button variant='contained' size='small' onClick={handleOpenAddNewCard}>Generate Card</Button>
                        </Box>

                        {/* <small style={{ textTransform: "uppercase", wordWrap:'break-word', marginLeft:4 }}>Card Name</small> */}
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", my:0.2, ml:0.2 }}>
                            <Box>
                                <Typography variant="caption"><small>Valid From</small></Typography>
                                <Typography color="text.secondary">01/12</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption"><small>Valid Thru</small></Typography>
                                <Typography color="text.secondary">01/12</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}


                {/* Total Balance Section */}
                <Box my={4}>
                    <Typography variant="subtitle1" color="text.secondary">Total Balance</Typography>
                    <Typography variant="h5" fontWeight="bold">$32,909</Typography>

                    <Box display="flex" justifyContent="space-between" my={4}>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ width: 30, height: 30, bgcolor: '#a5d391' }}>
                                <ArrowUpward fontSize="small" sx={{ color: 'white' }} />
                            </Avatar>
                            
                            <Box ml={1}>
                                <Typography variant="subtitle2">Income</Typography>
                                <Typography variant="body2" color="text.secondary">$745.90</Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2">Taxes</Typography>
                            <Typography variant="body2" color="text.secondary">$745.90</Typography>
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ width: 30, height: 30, bgcolor: '#FFA500' }}>
                                <ArrowDownward fontSize="small" sx={{ color: 'white' }} />
                            </Avatar>
                            <Box ml={1}>
                                <Typography variant="subtitle2">Expenses</Typography>
                                <Typography variant="body2" color="text.secondary">$745.90</Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2">Fees</Typography>
                            <Typography variant="body2" color="text.secondary">$745.90</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>

        {/* Add New Card Component */}
        <AddNewFiatCard 
          open={openAddCard}
          setOpen={setOpenAddCard}
        />

        {/* Update Card Component */}
        <UpdateFiatCard 
            open={openUpdateCard}
            setOpen={setOpenUpdateCard}
            availableCardDetail={availableCardDetail}
        />

        {/* Update PIN Component */}
        <UpdateFiatCardPIN 
            open={openUpdatePIN}
            setOpen={setOpenUpdatePIN}
            availableCardDetail={availableCardDetail}
        />

        <DeleteFiatCard 
           open={openDeleteCard}
           setOpen={setOpenDeleteCard}
           availableCardDetail={availableCardDetail}
        />
    </>
    )
};
