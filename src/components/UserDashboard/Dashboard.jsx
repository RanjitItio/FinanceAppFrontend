import {Main, DrawerHeader} from '../Content';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css'






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
                            <h1><b>Ranjit Kumar</b></h1>
                            <p className='my-1'>Welcome here is a brief summary of your account.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-xl-4 col-sm-6 col-xs-6">
                    <button type="button" className="btn btn-primary">Deposit Money</button>
                    <button type="button" className="btn btn-primary mx-2">Withdraw Money</button>
                </div>

            </div>
         </div>

         </Main>
    
        </>
    )
}
