



const TrendingCryptoCoins = [
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


export default function TrendingCrypto() {
    return(
        <>
          <div className="card" >
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <h5 className="card-title">Trending</h5>
                        <a className="card-title link-primary">See more</a>
                    </div>

                    {TrendingCryptoCoins.map((item, index)=> (
                    <div className="d-flex justify-content-between mb-2" key={index}>
                        <div className='d-flex justify-content-start'>
                            <div className='d-flex align-items-center justify-content-center rounded-circle my-1' style={{width: '35px', height: '35px', backgroundColor: item.crypto_background_color}}>
                                {item.icon}
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
        </>
    );
};