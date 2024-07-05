import { DevMain, DevDrawerHeader } from "./Content";
import DevLeftNavbar from "./Leftbar";
import DevUpperNavbar from "./Navbar";
import Box from '@mui/material/Box';
import { useState } from "react";
import React from 'react';
import { Container, Grid, Typography, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import Textarea from '@mui/joy/Textarea';
import { useEffect } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';





const DevIntroDoc = () => {

    const [open, setOpen] = useState(true);
    const [pythonCode, setPythonCode] = useState();


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const MainColumn = styled(Box)(({ theme }) => ({
        flex: 1,
        overflowY: 'auto',
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1),
        },
      }));
      
      const FixedColumn = styled(Box)(({ theme }) => ({
        width: 400,
        position: 'fixed',
        top: theme.spacing(10),
        right: 0,
        padding: theme.spacing(2),
        // backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }));

      useEffect(() => {
        setPythonCode(
            `import requests

            url = "https://react-uat.oyefin.com"
            
            payload = {  }
            headers = {
                "accept": "text/plain",
                
                Content-Type : "application/json" 
            }
            
            response = requests.post(url, json=payload, headers=headers)
            
            print(response.text)
            `
        )
      }, [])
      


  return (
    <Box sx={{ display: 'flex' }}>
        <DevUpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
        <DevLeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

        <DevMain open={open}>
            <DevDrawerHeader />

            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <CssBaseline />
                {/* <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6">Responsive Layout</Typography>
                    </Toolbar>
                </AppBar> */}

                <Container maxWidth="lg" sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

                    <Grid container sx={{ flex: 1 }}>

                        {/* Left Column */}
                        <Grid item xs={12} md={8}>
                            <MainColumn>
                                <Typography variant="h5">Payment API</Typography>
                                <small>jkl</small>
                                <hr style={{marginBottom: '20px'}}/>

                                <Typography variant="h7" sx={{padding: '5px'}}><b>Note: </b></Typography>

                                <Typography paragraph>
                                    Please note that API integration is exclusively supported for web apps. 
                                    By opting for SDK integration, you can enhance the payment experience for 
                                    your customers, minimizing unnecessary steps in the process.
                                </Typography>

                            </MainColumn>
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={0} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <FixedColumn>
                                <Typography variant="h6">SDK</Typography>
                                    <TextareaAutosize
                                        minRows={12}
                                        style={{
                                          width: '100%',
                                          backgroundColor: '#010009',
                                          color: '#ffffff',
                                          fontSize: '12px',
                                          padding: '10px',
                                          borderRadius: '4px',
                                          border: '1px solid #ccc',
                                          overflow: 'auto',
                                        }}
                                        value={pythonCode}
                                        readOnly
                                        />
                            </FixedColumn>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </DevMain>
    </Box>
    );
};



export default DevIntroDoc;