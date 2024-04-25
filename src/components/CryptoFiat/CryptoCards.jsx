import '/src/styles/CryptoCards.css'
import { useState, useEffect } from 'react'
import { Carousel } from 'antd';
import axios from 'axios';
import CryptoIcons from '../../../cryptoicons';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';




const API_URL = 'https://rest.coinapi.io/v1/assets/'
const API_KEY = '34EB65AE-B800-438F-B09D-24D745B17D0C'





export default function CryptoCards() {
    const [CryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoader, setImageLoader] = useState([]);


    useEffect(()=> {
        let timedelay;

        const fetchData = async ()=> {
        try{
            const cryptos = 'BTC;ETH;PLN;LTC;VEN;XRP;NMC;USDT;DOGE;PPC;TRC;NVC;ORO;TOR;BRIT;BTS;NXT;MUE;KST;SONG;NAV;RICE;GEO;RED;MTLMC;TIT;CRAVE;FONZ;LUX;AIB;BTX;DRZ;HBN;BSTY;BITSD;LOG;CRW;ORB;IRL;MARS;GUN;UNO;DGB;XVG;FUNK;XMG;SAK;AC;8BIT;TES;BCF;ANI;DUO;PLC;SHA;$PAC;QRK;SJW;LEA;MOTO;FJC;SOON;ADC;BNX;V;UNIC;TTC;HYP;CTO;CFC;TEK;WDC;BLC;GDC;HYPER;MEC;CRE;WC;TRI;RBY;EUC;PAK;BLK;TRK;SKC;PRIME;VRC;CANN;INFX;START;CAPT;I0C;ZEIT;CLAM;XDC;CDN;EMC;ISL;XPM;BTCS;BOLI;VGC;GCN;SLG;MBL;BTA;NOTE;SMLY;WBB;EPC;AUR;CAP;CB;SXC;NKA;NYAN;BTB;EGC;EMD;CV2;CORG;DGC;BURST;EVO;BUCKS;XLM;GRC;PND;MINT;RBT;BKCAT;EVIL;ANTI;KLC;BITCNY;UIS;BAC;FCT;UNB;BVC;CBX;REV;NTRN;SKR;TRUMP;BIT;DASH;BLZ;GMX;DAO;ARG;FUN;VTC;BCN;OMNI;BLOCK;VIA;POT;IFC;SYNC;SWM;MAID;GAP;BITS;XUSD;INDEX;DSH;RVR;XDN;XCP;CURE;MMC;ARCH;MCN;XVC;SILK;CUBE;BXC;XTP;SMC;PENG;MEOW;POP;KRB;LBC;EL;CLOAK'
            const response = await axios.get(`https://rest.coinapi.io/v1/assets/${cryptos}/`,{
            headers: {
                'X-CoinAPI-Key': API_KEY
              },
        });
            setCryptoData(response.data);
            setLoading(false);
            // console.log(response.data)
        } catch (error) {
            // console.error('Error fetching data:', error);
            console.log(console.error.response)
        }
      };

      timedelay = setTimeout(fetchData, 100)

      return ()=> clearTimeout(timedelay);

    }, []);


    const chunkedData = [];

    for (let i = 0; i < CryptoData.length; i += 4) {
        chunkedData.push(CryptoData.slice(i, i + 4));
    }

    const isSmallDevice = window.innerWidth <= 768;
    
      // Settings for the Carousel component
      const carouselSettings = {
        autoplay: true,
        vertical: isSmallDevice,
        autoplaySpeed: 3000,
        dots: true,
        speed: 1400,
      };



    return (
    <>
   {loading ? (
    <Box sx={{ width: '100%' }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
    </Box>
   ): (
    <Carousel {...carouselSettings} >
      {chunkedData.map((chunk, index) => (
        <div key={index}>
          <div className="row">
            {chunk.map((item, innerIndex) => (
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2" key={innerIndex}>
                <div className="card shadow" >
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{ width: "45px", height: "45px", backgroundColor: 'item.coin_color' }}
                      >
                        {CryptoIcons.map((icon, index)=> (
                            <div key={index}>
                                {!imageLoader && <CircularProgress />}
                            <img src={icon.asset_id == item.asset_id ? icon.url : 'icon' } alt={''} style={{ display: imageLoader ? 'block' : 'none' }} onLoad={() => setImageLoader(true)} />
                            </div>
                        ))}
                        
                        {/* <i className="bi bi-currency-bitcoin" style={{ color: "green", fontSize: "20px" }}></i> */}
                      </div>
                      &nbsp;
                      <div>
                        <h5 className="card-title">
                          <b>{item.name}</b>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">{item.asset_id}</h6>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <h5 className="my-2 mx-1">
                        <b>{parseFloat(item.price_usd).toFixed(5)}</b>
                      </h5>
                      <div
                        className="d-flex align-items-center justify-content-between rounded-pill my-2"
                        style={{ width: "80px", height: "25px", backgroundColor: "#ecf8ec" }}
                      >
                        <i className="bi bi-caret-up-fill" style={{ color: "green", marginLeft: "10px" }}></i>
                        <small className="my-2 mx-2" style={{ color: "green" }}>
                          {/* <b>{item.change_perc}</b> */}
                          <b>+1.2%</b>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
         </div>
      ))}
    </Carousel>
   )}
    
 

         {/* {CryptoData.map((item, index)=> (
           <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2 ">
            <Carousel autoplay>
                <div className="card shadow" style={{overflowX: 'auto'}}>
                    <div className="card-body">
                            <div className='d-flex justify-content-start'>
                            <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '45px', height: '45px', backgroundColor: item.coin_color}}>
                                <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                            </div>
                            &nbsp;
                            <div>
                                <h5 className="card-title"><b>{item.name}</b></h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.Shortform}</h6>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <h5 className='my-2 mx-1'><b>{item.current_value}</b></h5>
                            <div className='d-flex align-items-center justify-content-between rounded-pill my-2' style={{width: '80px', height: '25px', backgroundColor: '#ecf8ec'}}>
                                <i className="bi bi-caret-up-fill" style={{color: 'green', marginLeft: '10px'}}></i>
                                <small className='my-2 mx-2' style={{color: 'green'}}><b>{item.change_perc}</b></small>
                            </div>
                        </div>
                    </div>
                </div>
                </Carousel>
            </div>
          
        
         ))}  */}
       

        {/* {isScrollVisible ? <ScrollButtons onScroll={onScroll} /> : null}  */}
        </>

    )
}


 