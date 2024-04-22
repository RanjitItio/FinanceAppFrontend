import BasicSparkLine from "./InsideTableChart"




function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



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
        <div className='' style={{overflowX: 'auto', width: '100vw', maxWidth: '100%'}} >
            <table responsive  className="table table-hover align-middle" style={{ width: '100%', tableLayout: 'auto' }}>
                <caption>List of Currency values</caption>
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
                            <th  scope="row" >
                                <div className="d-flex justify-content-start my-2">
                                    <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '25px', height: '25px', backgroundColor: item.crypto_color}}>
                                        <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                                    </div>
                                    &nbsp;
                                    {item.curency_name}
                                </div>
                            </th >
                            <td >
                                <div className="my-2">
                                    <b>{item.price}</b>
                                </div>
                            </td >
                            <td >
                                <div className="my-2 mx-1">
                                    <b>{item.CAGR}</b>
                                </div>
                            </td >
                            <td ><BasicSparkLine ChartColor={item.chart_color}/></td>
                            <td><button type="button" className="btn btn-outline-success my-1">Transfer Now</button></td>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table >
            </div>
{/* 
<div style={{overflowX: 'auto', maxWidth: '200px'}}>
  <table style={{ }}>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
      <td>94</td>
    </tr>
    <tr>
      <td>Adam</td>
      <td>Johnson</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
      <td>67</td>
    </tr>
  </table>
</div> */}

          
        </>
    )
}