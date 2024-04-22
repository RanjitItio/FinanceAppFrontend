



export default function FiatMyCard() {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">My Card</h5>
                <div className="d-flex justify-content-between">
                    <div className="my-2">
                        <h6 className="card-subtitle mb-2 text-muted">
                        <i className="bi bi-credit-card"></i>&nbsp;
                            429 **** *** 963
                        </h6>
                    </div>

                    <button type="submit" className="btn btn-primary d-none d-sm-none d-xs-none d-md-inline d-lg-inline" style={{maxHeight: '35px'}}>Add Card</button>
                    <a href="" className="btn btn-primary d-md-none d-lg-none"><i className="bi bi-plus-lg"></i></a>
                </div>


                {/* Card Section */}
                <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card my-2 shadow-lg" style={{backgroundImage: 'linear-gradient(to bottom right, yellow, green)', color: "white", maxWidth: '20rem', marginLeft: '20px'}}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h6 className="card-title" >VISA</h6>
                                <i className="bi bi-three-dots-vertical"></i>
                            </div>&nbsp;

                            <h6 className="card-subtitle d-flex justify-content-around">
                                <b><p style={{fontSize: '20px'}}>123</p></b> 
                                <b><p style={{fontSize: '20px'}}>456</p></b>  
                                <b><p style={{fontSize: '20px'}}>789</p></b>  
                                <b><p style={{fontSize: '20px'}}>012</p></b> 
                            </h6>

                            <div className="d-flex justify-content-between my-2">
                                <p className="card-text" >Kh.Rasel</p><br/>
                                <div>
                                    <small>VALID FROM</small>
                                    <h6 className="text-muted">02/12</h6>
                                </div>
                                <div>
                                    <small>VALID THRU</small>
                                    <h6 className="text-muted">01/23</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>


                {/* Total Balance Section */}
                <div className="my-4"> 
                    <h6 className="text-muted">Total Balance</h6>
                    <h5><b>$32,909</b></h5>

                    <div className="d-flex justify-content-between my-4" >
                        <div className='d-flex justify-content-start'>
                            <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '30px', height: '30px', backgroundColor: '#a5d391'}}>
                                <i className="bi bi-arrow-up-right" style={{color: 'white', fontSize: '15px'}}></i>
                            </div>
                            &nbsp;
                            <div className='mb-2'>
                                <p className="card-subtitle"  style={{textOverflow: 'ellipsis', overflow:'hidden' }}>Income</p>
                                <small className="card-subtitle mb-2 text-muted" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>$745,90</small>
                            </div>
                        </div>

                        <div className='mb-2'>
                            <p className="card-subtitle"  style={{textOverflow: 'ellipsis', overflow:'hidden' }}>Taxes</p>
                            <small className="card-subtitle mb-2 text-muted" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>$745,90</small>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between" >
                        <div className='d-flex justify-content-start'>
                            <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '30px', height: '30px', backgroundColor: '#FFA500'}}>
                                <i className="bi bi-arrow-down-left" style={{color: 'white', fontSize: '15px'}}></i>
                            </div>
                            &nbsp;
                            <div className='mb-2'>
                                <p className="card-subtitle"  style={{textOverflow: 'ellipsis', overflow:'hidden' }}>Expenses</p>
                                <small className="card-subtitle mb-2 text-muted" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>$745,90</small>
                            </div>
                        </div>

                        <div className='mb-2'>
                            <p className="card-subtitle"  style={{textOverflow: 'ellipsis', overflow:'hidden' }}>Fees</p>
                            <small className="card-subtitle mb-2 text-muted" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>$745,90</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
