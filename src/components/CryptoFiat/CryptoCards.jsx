





export default function CryptoCards() {
    return (
        <>
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
        </>
    )
}