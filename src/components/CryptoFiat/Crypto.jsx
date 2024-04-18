import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import TotalBalanceChart from './BalanceChart';


const TrendingCrypto = [
    {
        name: 'Bitcoin',
        percentage: '-49%',
        color: 'red',
        icon: <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>,
        crypto_background_color: '#FFA500'
    },
    {
        name: 'Etherium',
        percentage: '-49%',
        color: 'red',
        icon: <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>,
        crypto_background_color: 'blue'
    },
    {
        name: 'Binance',
        percentage: '-49%',
        color: 'red',
        icon: <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>,
        crypto_background_color: '#dcd713'
    },
    {
        name: 'Dodge Coin',
        percentage: '-49%',
        color: 'red',
        icon: <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>,
        crypto_background_color: 'grey'
    },
    {
        name: 'Polkstar',
        percentage: '-49%',
        color: 'red',
        icon: <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>,
        crypto_background_color: '#dc13cd'
    },
]


export default function CryptoContent() {

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                {/* First Column */}
                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    <div className="row my-2">
                        {/* First Column */}
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2 ">
                            <div className="card shadow" >
                                <div className="card-body ">
                                    <div className='d-flex justify-content-start'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '45px', height: '45px', backgroundColor: '#FFA500'}}>
                                            <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                        </div>
                                        &nbsp;
                                        <div>
                                            <h5 className="card-title"><b>Bitcoin</b></h5>
                                            <h6 className="card-subtitle mb-2 text-muted">BTC</h6>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <h5 className='my-2 mx-1'><b>$590.89</b></h5>
                                        <div className='d-flex align-items-center justify-content-between rounded-pill my-2' style={{width: '80px', height: '25px', backgroundColor: '#ecf8ec'}}>
                                            <i className="bi bi-caret-up-fill" style={{color: 'green', marginLeft: '10px'}}></i>
                                            <small className='my-2 mx-2' style={{color: 'green'}}><b>+17%</b></small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second Column */}
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2 ">
                            <div className="card shadow" >
                                <div className="card-body">
                                    <div className='d-flex justify-content-start'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '45px', height: '45px', backgroundColor: 'blue'}}>
                                            <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                        </div>
                                        &nbsp;
                                        <div>
                                            <h5 className="card-title"><b>Etherium</b></h5>
                                            <h6 className="card-subtitle mb-2 text-muted">ETH</h6>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <h5 className='my-2 mx-1'><b>$590.89</b></h5>
                                        <div className='d-flex align-items-center justify-content-between rounded-pill my-2' style={{width: '80px', height: '25px', backgroundColor: '#f8eeec'}}>
                                            <i className="bi bi-caret-down-fill" style={{color: 'red', marginLeft: '10px'}}></i>
                                            <small className='my-2 mx-2' style={{color: 'red'}}><b>-10%</b></small>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        {/* Third Column */}
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2">
                            <div className="card shadow" >
                                <div className="card-body">
                                    <div className='d-flex justify-content-start'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '45px', height: '45px', backgroundColor: '#dcd713'}}>
                                            <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                        </div>
                                        &nbsp;
                                        <div>
                                            <h5 className="card-title"><b>Binance</b></h5>
                                            <h6 className="card-subtitle mb-2 text-muted">BNC</h6>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <h5 className='my-2 mx-1'><b>$590.89</b></h5>
                                        <div className='d-flex align-items-center justify-content-between rounded-pill my-2' style={{width: '80px', height: '25px', backgroundColor: '#ecf8ec'}}>
                                            <i className="bi bi-caret-up-fill" style={{color: 'green', marginLeft: '10px'}}></i>
                                            <small className='my-2 mx-2' style={{color: 'green'}}><b>+23%</b></small>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        {/* Fourth Column */}
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2 ">
                            <div className="card shadow" >
                                <div className="card-body">
                                    <div className='d-flex justify-content-start'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '45px', height: '45px', backgroundColor: '#dc13cd'}}>
                                            <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                        </div>
                                        &nbsp;
                                        <div>
                                            <h5 className="card-title"><b>Polkstar</b></h5>
                                            <h6 className="card-subtitle mb-2 text-muted">PLKS</h6>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <h5 className='my-2 mx-1'><b>$590.89</b></h5>
                                        <div className='d-flex align-items-center justify-content-between rounded-pill my-2' style={{width: '80px', height: '25px', backgroundColor: '#f8eeec'}}>
                                            <i className="bi bi-caret-down-fill" style={{color: 'red', marginLeft: '10px'}}></i>
                                            <small className='my-2 mx-2' style={{color: 'red'}}><b>-39%</b></small>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div className="row">

                        {/* First Column */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                            <div className="card shadow-lg" >
                                <div className="card-body">
                                    <h5 className="card-title"><b>Your Balance</b></h5>
                                        <TotalBalanceChart />
                                </div>
                            </div> 
                        </div>

                        {/* Second Column */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="card shadow" >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <h5 className="card-title">Trending</h5>
                                        <a className="card-title link-primary">See more</a>
                                    </div>

                                    {TrendingCrypto.map((item, index)=> (
                                    <div className="d-flex justify-content-between mb-2" key={index}>
                                        <div className='d-flex justify-content-start'>
                                            <div className='d-flex align-items-center justify-content-center rounded-circle my-1' style={{width: '35px', height: '35px', backgroundColor: item.crypto_background_color}}>
                                                {item.icon}
                                                {/* <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i> */}
                                            </div>
                                            &nbsp;
                                            <div>
                                                <p className='card-title mb-0'><b>{item.name}</b></p>
                                                <small className='text-muted mx-0'>{item.name}</small>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex align-items-center justify-content-between rounded-pill my-2' style={{width: '80px', height: '25px', backgroundColor: '#f8eeec'}}>
                                                <i className="bi bi-caret-down-fill" style={{color: 'red', marginLeft: '10px'}}></i>
                                                <small className='my-2 mx-2' style={{color: 'red'}}><b>{item.percentage}</b></small>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div className="row mx-1 my-2">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Market Value</h5>
                                
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div> 
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 my-2">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Transaction</h5>
                
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
}




