import Wallet from './components/Wallet';
import AuthProvider from './components/ProtectedRoute/authProvider';
import AuthRoutes from './components/ProtectedRoute/routes';
// import { refreshAccessToken } from './components/Authentication/axios';
import { useEffect } from 'react';
import axiosInstance from './components/Authentication/axios';
import * as React from 'react';
import ShareIcon from '@mui/icons-material/Share';
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
};


if (IS_DEVELOPMENT === 'True') {
      banking_url = 'http://localhost:5173/'
} else {
      banking_url = 'https://react-uat.oyefin.com/'
};



const actions = [
  { icon: <CurrencyBitcoinIcon />, name: 'Crypto', url: banking_url },
  { icon: <PaidIcon />, name: 'Payment Gateway', url: payment_gateway_url  },
  { icon: <AccountBalanceIcon />, name: 'Banking', url: banking_url  },
  { icon: <ShareIcon />, name: 'Share', url: ''  },
];



function App() {

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
              <AuthRoutes />
          </AuthProvider>
      </>

  );
};


export default App




