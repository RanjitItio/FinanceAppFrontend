import axiosInstance from "../Authentication/axios";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';


const Coin_Gecko_API     = import.meta.env.VITE_COIN_GECKO_API_KEY
const Coin_Gecko_API_URL = import.meta.env.VITE_COIN_GECKO_API_URL
const Free_currency_api  = import.meta.env.VITE_FREE_CURRENCY_API


const handleGetCryptoIds = (cryptoName)=> {
    if (cryptoName) {
        switch(cryptoName) {
            case 'BTC':
                return 'bitcoin'
 
            case 'ETH':
                return 'ethereum'
 
            case 'SOL':
                return 'solana'
 
            case 'XRP':
                return 'ripple'
 
            case 'DOGE':
                return 'dogecoin'
 
            case 'LTC':
                return 'litecoin'
 
            case 'BNB':
                return 'binancecoin'
            
            default:
                return 'bitcoin'
        }
    };
 };



// Fetch all available Crypto Wallets of user
export const handleUserCryptoWallets = ({updateUserCryptoWallets})=> {
    axiosInstance.get(`/api/v2/user/crypto/wallets/`).then((res)=> {

        if (res.status === 200 && res.data.success === true) {
            updateUserCryptoWallets(res.data.user_crypto_wallets)
        }

    }).catch((error)=> {
        // console.log(error);
    });
};



// Check Wallet balance and inactive wallet
export const handleCheckCryptoWallet = ({exchangeAmount, cryptoWallet, setInsufficientFund, setError})=> {
    axiosInstance.post(`/api/v1/user/crypto/wallet/balance/check/`, {
        wallet_id: cryptoWallet,
        amount: parseFloat(exchangeAmount ? exchangeAmount : 0)

   }).then((res)=> {
      // console.log(res)
      if (res.status === 200) {
          setError('');
          setInsufficientFund(false);
      }

   }).catch((error)=> {
        if (error.response.data.message === 'Wallet not found') {
            setError('Invalid Crypto Wallet');
            setInsufficientFund(true);

        } else if (error.response.data.message === 'Donot have sufficient balance in Wallet') {
            setError('Insuficient balance in Crypto Wallet');
            setInsufficientFund(true);

        } else if (error.response.data.message === 'Inactive Wallet') {
            setError('Inactive Crypto Wallet');
            setInsufficientFund(true);

        } else {
            setInsufficientFund(false);
            setError('');

        }
   });
};




// Fetch all available FIAT Wallets of the user
export const handleUserFIATWallets = ({setUserFiatWallet})=> {
    axiosInstance.get(`/api/v3/user/wallet/`).then((res)=> {
        // console.log(res)

        if (res.status === 200) {
            setUserFiatWallet(res.data.user_wallet_data)
        }

    }).catch((error)=> {
        // console.log(error);
    })
};


//// Get Fee for Crypto Swap Transaction
export const handleCryptoExchangeAssignedFee = ({convertToFloat, setChargedFee})=> {

    axiosInstance.post(`/api/v2/charged/fee/`, {
        fee_type: 'Crypto Exchange',
        amount: convertToFloat

      }).then((res)=> {

        if (res.status === 200 && res.data.success === true){ 
            setChargedFee(res.data.fee)
        }
      })
};


// Convert Crypto to usd using CoinGecko
export const handleConvertCryptoToUSD = ({CryptoWalletName, setConvertedUSDValue, setError})=> {
    const crypto_ids = handleGetCryptoIds(CryptoWalletName);

    axiosInstance.get(`${Coin_Gecko_API_URL}/api/v3/simple/price/?ids=${crypto_ids}&vs_currencies=usd&x_cg_demo_api_key=${Coin_Gecko_API}`).then(
        (res)=> {
            if ( res.status === 200) {
                setConvertedUSDValue(res.data[crypto_ids].usd)
            }
        }
    ).catch((error)=> {
        // console.log(error)
        setError('Crypto Conversion API limit Exceeded');
    })
};


// Convert Wallet Currency against USD
export const handleWalletCurrencyConvertFromUSD = ({findWalletCurrencyName, setCurrencyConversionAmount, setError})=> {
    const freecurrencyapi = new Freecurrencyapi(Free_currency_api);

    setTimeout(() => {
        freecurrencyapi.latest({
            base_currency: 'USD',
            currencies: findWalletCurrencyName

        }).then(response => {
            // console.log(response.data[findWalletCurrencyName]);
            setCurrencyConversionAmount(response.data[findWalletCurrencyName])

        }).catch((error)=> {
            setError('Currency Conversion API Limit Exceeded')
        });
        
    }, 1500);
};