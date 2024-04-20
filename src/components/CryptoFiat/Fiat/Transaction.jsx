

const FiatTransactionsData = [
    {
        currency_name: 'Bitcoin',
        price: '$6,134.90',
        cagr: '+18.98%',
        ltc: '0 LTC',
        value: '$0.00',
        percentage: '0%',
        crypto_color: 'orange'
    },
    {
        currency_name: 'Etherium',
        price: '$6,134.90',
        cagr: '+18.98%',
        ltc: '0 LTC',
        value: '$0.00',
        percentage: '0%',
        crypto_color: 'blue'
    },
    {
        currency_name: 'Dodge Coin',
        price: '$6,134.90',
        cagr: '+18.98%',
        ltc: '0 LTC',
        value: '$0.00',
        percentage: '0%',
        crypto_color: 'yellow'
    },
    {
        currency_name: 'Lite Coin',
        price: '$6,134.90',
        cagr: '+18.98%',
        ltc: '0 LTC',
        value: '$0.00',
        percentage: '0%',
        crypto_color: 'green'
    },
]

export default function FiatTransaction() {
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title"><b>Transaction</b></h5>
                
                <div className="table-responsive">
                <table className="table table-hover" style={{overflowX: 'auto', overflowY: 'auto'}}>
                    <thead>
                        <tr>
                            <th scope="col">Price</th>
                            <th scope="col">Currency</th>
                            <th scope="col">CAGR</th>
                            <th scope="col">LTC</th>
                            <th scope="col">Value</th>
                            <th scope="col">Percentage</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {FiatTransactionsData.map((item, index)=> (
                            <tr className="shadow" key={index}>
                                <th scope="row">
                                    <div className='d-flex justify-content-start'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '25px', height: '25px', backgroundColor: item.crypto_color}}>
                                            <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '15px'}}></i>
                                        </div>
                                        &nbsp;
                                        <div>
                                            <p className="card-subtitle"><b>{item.currency_name}</b></p>
                                            <small className="mb-2 text-muted">BTC</small>
                                        </div>
                                    </div>
                                </th>
                                <td>{item.price}</td>
                                <td className="text-primary">{item.cagr}</td>
                                <td className="text-warning">{item.ltc}</td>
                                <td>{item.value}</td>
                                <td>{item.percentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
            </div> 
        </div>

    )
}