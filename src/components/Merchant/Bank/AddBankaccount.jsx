import { Main, DrawerHeader } from '../../Content';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';





export default function AddMerchantBankAccount({open}) {

    const [currency, setCurrency] = useState('');

    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
      };
    
      return (
        <Main open={open}>
            <DrawerHeader/>
            <Box sx={{ flexGrow: 1 }}>
                <Paper 
                    elevation={3} 
                    sx={{
                           height: {xs: '60rem', sm: '35rem', md:'33rem'}, 
                           padding:'20px', 
                           borderRadius: '20px',
                           marginTop: '10px'
                        }}
                    >
                <p className='fs-4'><b>Add Bank Account</b></p>
                <Grid container spacing={3} sx={{marginTop: '8px', marginBottom: '30px'}}>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            label="Account Holder Name" 
                            variant="outlined" 
                            fullWidth
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Account Holder Address" 
                            variant="outlined" 
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            label="Account Number/ IBAN No" 
                            variant="outlined" 
                            fullWidth
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            label="Short Code" 
                            variant="outlined"
                            fullWidth
                            // size="small" 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            label="SWIFT Code" 
                            variant="outlined" 
                            fullWidth
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                label="Bank Name" 
                                variant="outlined" 
                                fullWidth
                                // size="small"
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                label="Bank Address" 
                                variant="outlined"
                                fullWidth
                                // size="small" 
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                label="Additional Information" 
                                variant="outlined"
                                fullWidth
                                // size="small" 
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Requested Currency</InputLabel>
                            <Select
                            labelId="requested-currency"
                            id="requested-currency"
                            value={currency}
                            label="Requested Currency"
                            onChange={handleChangeCurrency}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                    <FormControl sx={{marginBottom: '2px'}}>
                        <input
                            style={{ display: 'none' }}
                            accept="*"
                            id="bank_doc"
                            type="file"
                        />
                        <label htmlFor="bank_doc">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component="span" 
                                sx={{ ml: 2 }}
                                htmlFor='bank_doc'
                                >
                                Upload Doc
                            </Button>
                        </label>
                        <FormHelperText><i>Max upload size 1MB</i></FormHelperText>
                        <FormHelperText><i>Supported format:jpeg, png, bmp, gif, pdf or svg</i></FormHelperText>

                        </FormControl>
                    </Grid>
                </Grid>

                <Stack 
                    direction="row" 
                    spacing={4} 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center',
                        }} >
                    <Button variant="outlined" startIcon={<CheckRoundedIcon />}>
                        Submit
                    </Button>
                    <Button variant="contained" endIcon={<FirstPageRoundedIcon />}>
                        Back
                    </Button>
                </Stack>

                </Paper>
            </Box>
                
                
                
                
                
                
                
                
                

                

        </Main>
        
      );
};