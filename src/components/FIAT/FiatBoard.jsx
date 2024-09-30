import FiatAccount from './Account';
import FiatTransaction from './Trasaction';
import FiatMyCard from './Mycard';
import { Grid } from '@mui/material';



/// FIAT Dashboard Content
export default function FiatDashboard() {
    return (
        <>
        <Grid container spacing={3}>
            <Grid container item spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FiatAccount />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{mt:1}}>
                        <Grid item xs={12}>
                            <FiatTransaction />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <FiatMyCard />
                </Grid>
            </Grid>
        </Grid>

        </>
    )
}