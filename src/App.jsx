import Wallet from './components/Wallet';
import AuthProvider from './components/ProtectedRoute/authProvider';
import AuthRoutes from './components/ProtectedRoute/routes';
// import { refreshAccessToken } from './components/Authentication/axios';
import { useEffect, useState } from 'react';
import axiosInstance from './components/Authentication/axios';
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT

let payment_gateway_url;
let banking_url;

if (IS_DEVELOPMENT === 'True') {
      payment_gateway_url = 'http://localhost:5175/'
} else {
      payment_gateway_url = 'https://react-uat.oyefin.com/'
}

if (IS_DEVELOPMENT === 'True') {
      banking_url = 'http://localhost:5173/'
} else {
      banking_url = 'https://react-uat.oyefin.com/'
}


const actions = [
  { icon: <CurrencyBitcoinIcon />, name: 'Crypto', url: banking_url },
  { icon: <PaidIcon />, name: 'Payment Gateway', url: payment_gateway_url  },
  { icon: <AccountBalanceIcon />, name: 'Banking', url: banking_url  },
  { icon: <ShareIcon />, name: 'Share', url: ''  },
];



function App() {

  // Speed Dial state and Methods
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const handlSpeedDialeOpen = () => setOpenSpeedDial(true);
  const handleSpeedDialClose = () => setOpenSpeedDial(false);

  // Method to redirect the user different project
  const handleActionIconClick = (url) => {
    window.location.href = url;
  };


useEffect(() => {
  const auth_token = localStorage.getItem('token')
  
  if(auth_token) {
    axiosInstance.get(`api/v3/user/wallet`).then((res)=> {

      if(res.data.user_wallet_data) {
        const GlobalDefaultUserSelectedWallet = localStorage.getItem('UserSelectedWalletID')
  
        if(!GlobalDefaultUserSelectedWallet) {
          const defaultWalletID = res.data.user_wallet_data.find(wallet => wallet.currency === 'USD');
  
          if (defaultWalletID) {
              localStorage.setItem('UserSelectedWalletID', defaultWalletID.id);
            }
        }
      }
    })
  };
  
}, []);




  return (
    <>
       
          <AuthProvider>

            {/* Spped Dial button */}
              <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                sx={{ position: 'fixed', bottom: 16, right: 16, transform: 'translateZ(0px)', flexGrow: 1 }}
                icon={<SpeedDialIcon icon={<SettingsIcon />} openIcon={<EditIcon />} />}
                onClose={handleSpeedDialClose}
                onOpen={handlSpeedDialeOpen}
                open={openSpeedDial}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={()=> {handleSpeedDialClose(); handleActionIconClick(action.url);} }
                  />
                ))}
              </SpeedDial>
              {/* Speed Dial Button Ends */}

              <AuthRoutes />
          </AuthProvider>
      </>

  );
};


export default App




