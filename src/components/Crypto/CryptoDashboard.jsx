import { useState, useEffect } from 'react';
import TotalBalanceChart from './BalanceChart';
import CryptoCards from './CryptoCards';
import TrendingCrypto from './TrendingCrypto';
import MarketValueCard from './MarketValue';
import CryptoTransactions from './Transactions';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';




const API_URL = 'https://rest.coinapi.io/v1/assets/'
const API_KEY = '34EB65AE-B800-438F-B09D-24D745B17D0C'



export default function CryptoContent() {
    const [CryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialCryptoConversion, setInitialCryptoConversion] = useState(0)


    // useEffect(()=> {
    //     let timedelay;

    //     const fetchData = async ()=> {
    //         try {
    //             const cryptos = 'BTC;ETH;PLN;LTC;VEN;XRP;NMC;USDT;DOGE;PPC;TRC;NVC;ORO;TOR;BRIT;BTS;NXT;MUE;KST;SONG;NAV;RICE;GEO;RED;MTLMC;TIT;CRAVE;FONZ;LUX;AIB;BTX;DRZ;HBN;BSTY;BITSD;LOG;CRW;ORB;IRL;MARS;GUN;UNO;DGB;XVG;FUNK;XMG;SAK;AC;8BIT;TES;BCF;ANI;DUO;PLC;SHA;$PAC;QRK;SJW;LEA;MOTO;FJC;SOON;ADC;BNX;V;UNIC;TTC;HYP;CTO;CFC;TEK;WDC;BLC;GDC;HYPER;MEC;CRE;WC;TRI;RBY;EUC;PAK;BLK;TRK;SKC;PRIME;VRC;CANN;INFX;START;CAPT;I0C;ZEIT;CLAM;XDC;CDN;EMC;ISL;XPM;BTCS;BOLI;VGC;GCN;SLG;MBL;BTA;NOTE;SMLY;WBB;EPC;AUR;CAP;CB;SXC;NKA;NYAN;BTB;EGC;EMD;CV2;CORG;DGC;BURST;EVO;BUCKS;XLM;GRC;PND;MINT;RBT;BKCAT;EVIL;ANTI;KLC;BITCNY;UIS;BAC;FCT;UNB;BVC;CBX;REV;NTRN;SKR;TRUMP;BIT;DASH;BLZ;GMX;DAO;ARG;FUN;VTC;BCN;OMNI;BLOCK;VIA;POT;IFC;SYNC;SWM;MAID;GAP;BITS;XUSD;INDEX;DSH;RVR;XDN;XCP;CURE;MMC;ARCH;MCN;XVC;SILK;CUBE;BXC;XTP;SMC;PENG;MEOW;POP;KRB;LBC;EL;CLOAK'
    //             const response = await axios.get(`https://rest.coinapi.io/v1/assets/${cryptos}/`,{
    //             headers: {
    //                 'X-CoinAPI-Key': API_KEY
    //             },
    //         });
    //             setCryptoData(response.data);
    //             setLoading(false);
    //             // console.log(response.data)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             // console.log(console.error.response)
    //         }
    //     };

    //   timedelay = setTimeout(fetchData, 200)

    //   return ()=> clearTimeout(timedelay);

    // }, []);


    useEffect(() => {
        setTimeout(() => {
            let Bitcoin_value_in_usd;
            let Etherium_value_in_usd;
    
            CryptoData.forEach(asset => {
                if (asset.asset_id === 'BTC') {
                    Bitcoin_value_in_usd = asset.price_usd;
                    // console.log(Bitcoin_value_in_usd)
                }
                if (asset.asset_id === 'ETH') {
                    Etherium_value_in_usd = asset.price_usd;
                }
            });

            if (Bitcoin_value_in_usd && Etherium_value_in_usd) {
                const EtheriumperBitcoin = parseFloat(Bitcoin_value_in_usd) / parseFloat(Etherium_value_in_usd);
                setInitialCryptoConversion(EtheriumperBitcoin);
                console.log(EtheriumperBitcoin)

            } else {
                console.log("Error: Bitcoin or Ethereum price not found");
            }
        }, 100); 
    }, []);


return (

    <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
            
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <CryptoCards CryptoData={CryptoData} loading={loading} />
                </Grid>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ mb: 2 }}>
                    <Card sx={{ height: '22rem' }}>
                        <CardContent>
                        <Typography variant="h5" sx={{ mb: 4 }}><b>Your Balance</b></Typography>
                            <TotalBalanceChart />
                        </CardContent>
                    </Card>
                    </Grid>

                    
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TrendingCrypto />
                    </Grid>
                </Grid>

                <Grid container >
                    <Grid item xs={12} sm={12} sx={{ mx: 1, my: 2 }}>
                        <Card>
                        <CardContent>
                            <Typography variant="h5"><b>Market Value</b></Typography>
                                <MarketValueCard />
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            
            <Grid item xs={12} sm={12} md={3} sx={{ my: 2 }}>
                <Card>
                    <CardContent>
                        <CryptoTransactions CryptoData={CryptoData} initialCryptoConversion={initialCryptoConversion} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Container>

    );
};




