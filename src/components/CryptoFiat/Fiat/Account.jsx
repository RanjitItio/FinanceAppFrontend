



export default function FiatAccount() {
    return (
        <div className="card" style={{backgroundColor: '#e4e4e4'}}>
            <div className="card-body">

                <div className="d-flex justify-content-between">
                    <h5 className="card-title my-1">Accounts</h5>

                    <div className="btn-group " role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-currency-euro"></i>
                            <span className='d-none d-sm-inline'>Euro</span> 
                        </button>
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-currency-dollar"></i>
                            <span className='d-none d-sm-inline'>USD</span>
                        </button>
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-currency-rupee"></i>
                            <span className='d-none d-sm-inline'>INR</span>
                        </button>
                    </div>
                </div>

              
                <h2 className="d-flex justify-content-center my-2">$56,707.89</h2>
                <p className="d-flex justify-content-center text-muted">9090 7867 5467</p>

                {/* For large Device */}
                <div className='d-flex justify-content-center'>
                    <div className='d-none d-sm-none d-md-inline d-lg-inline'>
                        <button type="button" className="btn btn-light mx-1">
                            <i class="bi bi-arrow-down"></i>&nbsp;
                            Receive
                        </button>
                        <button type="button" className="btn btn-light mx-1">
                            <i class="bi bi-plus-lg"></i>&nbsp;
                            Add
                        </button>
                        <button type="button" className="btn btn-light mx-1">
                        <i class="bi bi-arrow-up"></i>&nbsp;
                            Send
                        </button>
                        <button type="button" className="btn btn-light mx-1">
                            <i class="bi bi-arrows"></i>&nbsp;
                            Convert
                        </button>
                        <button type="button" className="btn btn-light mx-1">
                            <i class="bi bi-three-dots-vertical"></i>&nbsp;
                            More
                        </button>
                    </div>
                </div>

                {/* For small devices */}
                <div className='d-flex justify-content-center '>
                    <div className='d-sm-inline d-md-none'>
                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i class="bi bi-arrow-down"></i>
                        </a>

                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i class="bi bi-plus-lg"></i>
                        </a>
                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i class="bi bi-arrow-up"></i>
                        </a>

                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i class="bi bi-arrows"></i>
                        </a>

                        <a className='btn btn-light' style={{marginRight: '1px'}}>
                            <i class="bi bi-three-dots-vertical"></i>&nbsp;
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}