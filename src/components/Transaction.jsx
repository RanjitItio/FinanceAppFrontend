import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import WelcomeSection from './welcome';
import TransactionTable from './transaction_table';


function Transaction() { 
    return (
      
        <div className='position-relative'>
           <WelcomeSection />
           <div style={{ position: 'absolute', top: '14rem', left: '4.2rem' }}>
                <TransactionTable />
           </div>
        </div>
        
    )
}


export default Transaction;