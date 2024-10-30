import axiosInstance from "../Authentication/axios";



const Coin_Gecko_API     = import.meta.env.VITE_COIN_GECKO_API_KEY
const Coin_Gecko_API_URL = import.meta.env.VITE_COIN_GECKO_API_URL



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



//// Get Fee for Crypto Swap Transaction
export const handleCryptoSwapAssignedFee = ({convertToFloat, setChargedFee})=> {

    axiosInstance.post(`/api/v2/charged/fee/`, {
        fee_type: 'Crypto Swap',
        amount: convertToFloat

      }).then((res)=> {

        if (res.status === 200 && res.data.success === true){ 
            setChargedFee(res.data.fee)
        }
      })
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



// Convert Crypto to usd using CoinGecko
export const handleConvertFromCrypto = ({fromWalletCryptoName,setFromCryptoUSDValue, setError})=> {
    const crypto_id = handleGetCryptoIds(fromWalletCryptoName);

    axiosInstance.get(`${Coin_Gecko_API_URL}/api/v3/simple/price/?ids=${crypto_id}&vs_currencies=usd&x_cg_demo_api_key=${Coin_Gecko_API}`).then(
        (res)=> {
            // console.log(res.data)
            // console.log('crypto', res.data[crypto_ids].usd)
            if ( res.status === 200) {
                setFromCryptoUSDValue(res.data[crypto_id].usd)
            }
        }
    ).catch((error)=> {
        console.log(error)
        setError('Crypto conversion API limit reached')
    })
};


// Convert Crypto to usd using CoinGecko
export const handleConvertToCrypto = ({toWalletCryptoName, setError, setToCryptoUSDValue})=> {
    const crypto_ids = handleGetCryptoIds(toWalletCryptoName);

    axiosInstance.get(`${Coin_Gecko_API_URL}/api/v3/simple/price/?ids=${crypto_ids}&vs_currencies=usd&x_cg_demo_api_key=${Coin_Gecko_API}`).then(
        (res)=> {
            // console.log(res.data)
            // console.log('crypto', res.data[crypto_ids].usd)
            if ( res.status === 200) {
                setToCryptoUSDValue(res.data[crypto_ids].usd)
            }
        }
    ).catch((error)=> {
        // console.log(error)
        setError('Crypto conversion API limit reached')
    })
};