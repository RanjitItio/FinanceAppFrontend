import BasicSparkLine from "./InsideTableChart"



const CurrencyMarketValue = [
    {
        curency_name: 'Bitcoin',
        price:        '$290',
        CAGR:         '24.65% / 6',
        chart_color:  'orange',
        crypto_color: 'orange'
    },
    {
        curency_name: 'Etherium',
        price:        '$860',
        CAGR:         '19.65% / 6',
        chart_color:  'blue',
        crypto_color: 'blue'
    },
    {
        curency_name: 'Dodgecoin',
        price:        '$590',
        CAGR:         '67.65% / 6',
        chart_color:  'yellow',
        crypto_color: 'yellow'
    },
]


export default function MarketValueCard() {
    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="text-muted">
                            Currency Name
                        </th>
                        <th scope="col" className="text-muted">
                            Price
                        </th>
                        <th scope="col" className="text-muted">
                            CAGR / Month
                        </th>
                        <th scope="col" className="text-muted">
                            Statitics
                        </th>
                        <th scope="col" className="text-muted">
                            Exchnages
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {CurrencyMarketValue.map((item, index)=> (
                        <tr key={index}>
                            <th scope="row" >
                                <div className="d-flex justify-content-start my-2">
                                    <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '25px', height: '25px', backgroundColor: item.crypto_color}}>
                                        <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                    </div>
                                    &nbsp;
                                    {item.curency_name}
                                </div>
                            </th>
                            <td>
                                <div className="my-2">
                                    <b>{item.price}</b>
                                </div>
                            </td>
                            <td>
                                <div className="my-2 mx-1">
                                    <b>{item.CAGR}</b>
                                </div>
                            </td>
                            <td><BasicSparkLine ChartColor={item.chart_color}/></td>
                            <td><button type="button" className="btn btn-outline-success my-1">Transfer Now</button></td>
                        </tr>
                    ))}
                    {/* <tr>
                        <th scope="row">
                            <div className="d-flex justify-content-start my-2">
                                <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '25px', height: '25px', backgroundColor: '#FFA500'}}>
                                    <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                </div>
                                &nbsp;
                                Bitcoin / BTC
                            </div>
                        </th>
                        <td>
                            <div className="my-2">
                                <b>$1800.24</b>
                            </div>
                        </td>
                        <td>
                            <div className="my-2 mx-1">
                                <b>24.65% / 6</b>
                            </div>
                        </td>
                        <td><BasicSparkLine /></td>
                        <td><button type="button" className="btn btn-outline-success my-1">Transfer Now</button></td>
                    </tr> */}
                    
                </tbody>
            </table>
        </>
    )
}