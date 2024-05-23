import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import TotalBalanceChart from './BalanceChart';
import CryptoCards from './CryptoCards';
import TrendingCrypto from './TrendingCrypto';
import MarketValueCard from './MarketValue';
import CryptoTransactions from './Transactions';
import { useState, useEffect } from 'react';
import axios from 'axios';




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
        <>
        <div className="container">
            <div className="row">
                {/* First Column */}
                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    {/* First Row */}
                    <div className="row my-2">
                        <CryptoCards CryptoData={CryptoData} loading={loading} />
                    </div>

                     {/* Second Row */}
                    <div className="row">
                        {/* First Column */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                            <div className="card shadow-lg" style={{height: '22rem'}} >
                                <div className="card-body">
                                    <h5 className="card-title my-4"><b>Your Balance</b></h5>
                                        <TotalBalanceChart />
                                </div>
                            </div> 
                        </div>

                        {/* Second Column */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <TrendingCrypto />
                        </div>
                    </div>


                    <div className="row mx-1 my-2">
                        <div className="card" >
                            <div className="card-body"  >
                                <h5 className="card-title"><b>Market Value</b></h5>
                                    {/* <MarketValueCard />  */}
                            </div>
                        </div> 
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 my-2">
                    <div className="card" >
                        <div className="card-body">
                            {/* <h5 className="card-title mb-2">Transaction</h5> */}
                            <CryptoTransactions CryptoData={CryptoData} initialCryptoConversion={initialCryptoConversion} />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
}




