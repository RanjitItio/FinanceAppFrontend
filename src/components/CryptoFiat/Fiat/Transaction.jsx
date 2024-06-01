import { useState, useEffect } from "react";
import axiosInstance from "../../Authentication/axios";




// const FiatTransactionsData = [
//     {
//         currency_name: 'Bitcoin',
//         price: '$6,134.90',
//         cagr: '+18.98%',
//         ltc: '0 LTC',
//         value: '$0.00',
//         percentage: '0%',
//         crypto_color: 'orange'
//     },
//     {
//         currency_name: 'Etherium',
//         price: '$6,134.90',
//         cagr: '+18.98%',
//         ltc: '0 LTC',
//         value: '$0.00',
//         percentage: '0%',
//         crypto_color: 'blue'
//     },
//     {
//         currency_name: 'Dodge Coin',
//         price: '$6,134.90',
//         cagr: '+18.98%',
//         ltc: '0 LTC',
//         value: '$0.00',
//         percentage: '0%',
//         crypto_color: 'yellow'
//     },
//     {
//         currency_name: 'Lite Coin',
//         price: '$6,134.90',
//         cagr: '+18.98%',
//         ltc: '0 LTC',
//         value: '$0.00',
//         percentage: '0%',
//         crypto_color: 'green'
//     },
// ]




export default function FiatTransaction() {
    
    const [error, setError] = useState('')
    const  [FiatTransactionsData, updateFiatTransactionsData] = useState([])


    useEffect(() => {
        try{
            axiosInstance.get(`api/v4/users/transactions/`).then((res)=> {
    
                if(res.data && res.data.all_transactions) {
                    updateFiatTransactionsData(res.data.all_transactions)
                    // console.log(res.data)
                };
            })
        }catch(error) {
            console.log(error)

            if (error.response.status === 401) {
                setError('UnAuthorized Access')
            }
        }
       
    }, [])


    return(
        <div className="card" style={{maxHeight: ''}}>
            <div className="card-body">
                <h5 className="card-title"><b>Transaction History</b></h5>
                
                <div className="table-responsive" style={{maxHeight: '300px'}}>
                <table className="table table-hover" style={{overflowX: 'auto'}}>
                    <thead>
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Credited</th>
                        </tr>
                    </thead>

                    <tbody>
                        {FiatTransactionsData.map((item, index)=> (
                            
                            <tr className="shadow" key={index}>
                                <td scope="row">
                                    <div style={{maxWidth: '100px', overflow: 'scroll', textOverflow: 'ellipsis', whiteSpace: 'nowrap', wordWrap: 'break-word'}}>
                                    <div className='d-flex justify-content-start'>
                                        
                                        <div>
                                            <small className="card-subtitle">{item.transaction.txdid}</small>
                                        </div>
                                    </div>
                                    </div>
                                </td>
                                <td>{item.transaction.txdtype}</td>
                                <td><i>{item.transaction.amount} {item.currency.name}</i></td>
                                <td>{item.transaction.txddate}</td>
                                <td>
                                    {item.transaction.txdstatus === 'Success' ? 
                                      <p className="text-success">Success</p>
                                    : 
                                    item.transaction.txdstatus === 'Pending' ? 
                                      <p className="text-warning">Pending</p>
                                    : 
                                    item.transaction.txdstatus === 'Cancelled' ? 
                                      <p className="text-danger">Cancelled</p>
                                    : 'NA'
                                    }
                                </td>
                                <td className="text-primary">{item.credited_amount ? item.credited_amount : 'NA'} {item.credited_currency ? item.credited_currency : ''}</td>
                            </tr>
                          
                        ))}
                    </tbody>
                </table>
             </div>
            </div> 
        </div>

    )
}