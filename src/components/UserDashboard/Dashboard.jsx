import {Main, DrawerHeader} from '../Content';
import Avatar from '@mui/material/Avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import IconButton from '@mui/material/IconButton';







export default function UserDashboard({open}) {
    return(
        <>
         <Main open={open}>
         <DrawerHeader />
         
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-8 col-xl-8 col-sm-12 col-xs-12">
                    <div className="d-flex justify-content-start">
                        <Avatar
                        alt="Remy Sharp"
                        src="/vite.svg"
                        sx={{ width: 60, height: 60 }} 
                        />
                        <div className='mx-1 my-1'>
                            <h1 className='fs-3'><b>Ranjit Kumar</b></h1>
                            <p className='my-1 text-muted'>Welcome here is a brief summary of your account.</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-4 col-md-4 col-xl-4 col-sm-12 col-xs-12 ">
                    
                    <Button variant="outlined" startIcon={<CallReceivedIcon />} className='mb-1'>
                        Deposite
                    </Button>
                    <Button variant="outlined" startIcon={<CallMadeIcon />} sx={{marginLeft: '2px'}} className='mb-1'>
                        Transfer
                    </Button>
                </div>

            </div>

            {/* Dashboard Cards  */}
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
         </div>

         </Main>
    
        </>
    )
}
