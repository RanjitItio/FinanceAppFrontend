import axiosInstance from "../Authentication/axios";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';



const Coin_Gecko_API     = import.meta.env.VITE_COIN_GECKO_API_KEY
const Coin_Gecko_API_URL = import.meta.env.VITE_COIN_GECKO_API_URL
const Free_currency_api  = import.meta.env.VITE_FREE_CURRENCY_API


//// Currency Icon
export const getCurrencyIcon = (currency)=> {
    switch (currency){
       case 'USD':
           return '$'
       case 'EUR':
           return '€'
       case 'INR':
           return '₹'
       case 'GBP':
           return '£'
       default:
           return ''
    }
};



/// Get Crypoto Icons
export const getCryptoIcons = (icon)=> {
    switch (icon) {
        case 'BTC':
            return <img src="/cryptoicons/BTCS.png" alt="BTC" width={20} height={20} />

        case 'ETH':
            return <img src="/cryptoicons/ETH.png" alt="ETH" width={20} height={20} />

        case 'XRP':
            return <img src="/cryptoicons/XRP.png" alt="XRP" width={20} height={20} />

        case 'DOGE':
            return <img src="/cryptoicons/DOGE.png" alt="DOGE" width={20} height={20} />

        case 'LTC':
            return <img src="/cryptoicons/LTC.png" alt="LTC" width={20} height={20} />

        case 'TOR':
            return <img src="/cryptoicons/TOR.png" alt="TOR" width={20} height={20} />

        case 'SOL':
            return <img src="/cryptoicons/SOL.png" alt="SOL" width={20} height={20} />

        default:
            return ''
    }
};

// Convert the Crypto name according to coin gecko Ids
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
export const handleCryptoWallets = ({updateCryptoWallets})=> {
    axiosInstance.get(`/api/v2/user/crypto/wallets/`).then((res)=> {

        if (res.status === 200 && res.data.success === true) {
            updateCryptoWallets(res.data.user_crypto_wallets)
        }

    }).catch((error)=> {
        // console.log(error);
    });
};


// Fetch Wallet address according to the Selected Crypto
export const handleCryptoWalletAddress = ({setWalletAddress, crypto})=> {
    axiosInstance.get(`/api/v2/user/crypto/wallet/address/${crypto}/`).then((res)=> {

        if (res.status === 200 && res.data.success === true) {
            setWalletAddress(res.data.wallet_address)
        }

    }).catch((error)=> {
        // console.log(error);
    })
};


// Fetch all available FIAT Wallets of the user
export const handleFIATWallets = ({setUserWallets})=> {
    axiosInstance.get(`/api/v3/user/wallet/`).then((res)=> {
        // console.log(res)

        if (res.status === 200) {
            setUserWallets(res.data.user_wallet_data)
        }

    }).catch((error)=> {
        // console.log(error);
    })
};



// Fetch Assigned Fee for Crypto Buy Transaction
export const handleCryptoSellAssignedFee = ({exchangeAmount, SetChargedFee})=> {
    axiosInstance.post(`/api/v2/charged/fee/`, {
        fee_type: 'Crypto Sell',
        amount: parseFloat(exchangeAmount ? exchangeAmount : 0)

      }).then((res)=> {

        if (res.status === 200 && res.data.success === true){ 
            SetChargedFee(res.data.fee)
        }
      })
};




// Convert Crypto to usd using CoinGecko
export const handleConvertCryptoToUSD = ({cryptoName, setConvertedUSDValue, setError})=> {
    const crypto_ids = handleGetCryptoIds(cryptoName);

    axiosInstance.get(`${Coin_Gecko_API_URL}/api/v3/simple/price/?ids=${crypto_ids}&vs_currencies=usd&x_cg_demo_api_key=${Coin_Gecko_API}`).then(
        (res)=> {
            if ( res.status === 200) {
                setConvertedUSDValue(res.data[crypto_ids].usd)
            }
        }
    ).catch((error)=> {
        // console.log(error)
        setError('Crypto Conversion API limit Exceeded')
    })

};


// Convert Wallet Currency against USD
export const handleWalletCurrencyConvertToUSD = ({findWalletCurrencyName, setCurrencyConversionAmount, setError})=> {
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



