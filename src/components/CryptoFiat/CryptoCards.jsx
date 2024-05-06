import '/src/styles/CryptoCards.css'
import { useState, useEffect } from 'react'
import { Carousel } from 'antd';
import axios from 'axios';
import CryptoIcons from '../../../cryptoicons';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';







export default function CryptoCards({CryptoData, loading}) {
    const [imageLoader, setImageLoader] = useState([]);


    const chunkedData = [];

    for (let i = 0; i < CryptoData.length; i += 4) {
        chunkedData.push(CryptoData.slice(i, i + 4));
    };

    
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
        <Skeleton animation={'pulse'} />
    </Box>
   ): (
    <Carousel {...carouselSettings} >
      {chunkedData.map((chunk, index) => (
        <div key={index}>
          <div className="row">
            {chunk.map((item, innerIndex) => (
              <div className="col-xs-12 col-sm-12 col-md-3 mb-2" key={innerIndex}>
                <div className="card shadow" >
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{ width: "45px", height: "45px", backgroundColor: 'item.coin_color' }}
                      >
                        {/* {CryptoIcons.map((icon, index)=> (
                            <div key={index}>
                                {!imageLoader && <CircularProgress />}
                            <img src={icon.asset_id == item.asset_id ? icon.url : 'icon' } alt={''} style={{ display: imageLoader ? 'block' : 'none' }} onLoad={() => setImageLoader(true)} />
                            </div>
                        ))} */}
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
                        style={{ width: "40%", height: "1%", backgroundColor: "#ecf8ec" }}
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
    
 
        </>

    )
}


 