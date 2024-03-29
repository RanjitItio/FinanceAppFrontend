import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import TransactionTable from './transaction_table';


function Transaction() { 
    return (
      
        // style={{ position: 'absolute', top: '18rem', left: '4rem' }}
        // col-md-12 col-sm-12 col-lg-12 col-xs-12
           <div>
                <TransactionTable />
           </div>
    )
}



export default Transaction;