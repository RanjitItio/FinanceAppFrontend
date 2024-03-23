import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/total_balance.css'


function TotalBalance() {
   return (

        <div className='container'>
            <div className="card shadow card__body_margin">
               <div className="card-body">
                  <h5 className="card-title"><b>Total Balance</b></h5>

                  <h1 className="card-subtitle mb-2"><b>$12,456,315</b></h1>
                  <br></br>
                     <a className="btn p-2 transfer_receiver_btn" href="#" role="button" >
                        <b>Transfer</b>
                        &nbsp;<i className="bi bi-box-arrow-in-up"></i>
                     </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <a className="btn p-2 transfer_receiver_btn" href="#" role="button" >
                        
                     <b>Receive</b>
                        &nbsp;
                     <i className="bi bi-box-arrow-down"></i>
                     </a>
               </div>
            </div>
         </div>

      );
}


export default TotalBalance;
