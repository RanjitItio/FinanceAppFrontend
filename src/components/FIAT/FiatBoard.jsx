import FiatAccount from './Account';
import FiatTransaction from './Trasaction';
import FiatMyCard from '../FIATCard/Mycard';
import { Grid } from '@mui/material';
import { useState } from 'react';




/// FIAT Dashboard Content
export default function FiatDashboard() {
    const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem('UserSelectedDefaultCurrency') || 'USD');  // Currency iniside Wallet Section

    return (
        <>
        <Grid container spacing={3}>
            <Grid container item spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FiatAccount 
                               selectedCurrency={selectedCurrency}
                               setSelectedCurrency={setSelectedCurrency}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{mt:1}}>
                        <Grid item xs={12}>
                            <FiatTransaction />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <FiatMyCard 
                       selectedCurrency={selectedCurrency}
                    />
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}