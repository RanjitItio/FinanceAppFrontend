import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Button, IconButton, Divider, Avatar, ButtonBase,
} from '@mui/material';
import { Add, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactCardFlip from 'react-card-flip';


export default function FiatMyCard() {
    const [isFlipped, setIsFlipped] = useState(false);

      const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
      };
      

    return (
        <Card variant="outlined" sx={{borderRadius:4 }}>
            <CardContent>
                <CardHeader
                    title="My Card"
                    titleTypographyProps={{ variant: 'h5' }}
                    action={
                        <>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ display: { xs: 'none', md: 'inline-flex' }, maxHeight: 35 }}
                        >
                            Add Card
                        </Button>
                        <IconButton color="primary" sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
                            <Add />
                        </IconButton>
                        </>
                    }
                />

                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        
                        <Card onClick={handleClick}
                            sx={{
                                background: 'linear-gradient(to bottom right, yellow, green)',
                                color: 'white',
                                maxWidth: 400,
                                ml: 2,
                                boxShadow: 3,
                                borderRadius:5,
                                height:'11.1rem',
                                margin:0,
                                cursor:'pointer'
                            }}
                        >
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">INR</Typography>

                                <Box>
                                    <img src='/card/chip.png' style={{width:'30px', height:'30px'}} />
                                    <IconButton color="inherit">
                                        <VisibilityIcon  style={{fontSize:'16px'}} />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-around" my={0.4}>
                                <Typography variant="h6">123</Typography>
                                <Typography variant="h6">***</Typography>
                                <Typography variant="h6">***</Typography>
                                <Typography variant="h6">*12</Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" my={1.8}>
                                <Box>
                                    <Typography variant="caption"><small>Valid From</small></Typography>
                                    <Typography color="text.secondary">02/12</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption"><small>Valid Thru</small></Typography>
                                    <Typography color="text.secondary">01/23</Typography>
                                </Box>
                            </Box>

                        </CardContent>
                    </Card>

                  
                    <Card onClick={handleClick}
                        sx={{
                            maxWidth: 400,
                            height:'11.1rem',
                            backgroundColor: '#e0dddd',
                            borderRadius: 5,
                            padding: 2,
                            position: 'relative',
                            cursor:'pointer'
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
                            backgroundColor: '#fdf4ca', // light yellow background for signature area
                            height: 50,
                            padding: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            marginBottom: 2,
                            }}
                        >
                            {/* Yellow Strip */}
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
                            123
                        </Typography>

                        {/* Set PIN Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button variant="contained" color="secondary" sx={{ backgroundColor: '#8a2be2', color: 'white' }}>
                            SET PIN
                            </Button>
                        </Box>
                    </Card>
                    
                </ReactCardFlip>


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
    )
};
