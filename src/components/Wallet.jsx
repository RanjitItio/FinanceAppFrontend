import TotalBalance from './total_balance';
import ScrollBar from './Scrollbar';
import Currency from './currency';
import Cards from './Card';
import BalanceAnalytics from './BalanceAnalytics';
import AddNewCard from './AddCard';




function Wallet() {
    return (
        <>
        <div className="row">
           {/* First Row First Column*/}
            <div className="col-sm-12 col-xs-12 col-md-3 col-lg-3 ">
                <TotalBalance />
                <div className="col my-3">
                    <div className="card shadow">
                            <h5 className='mx-3 my-3'><b>Card Lists</b></h5><br />
                        <div className="card-body"style={{ overflow: "auto", maxHeight: "31rem"}} >
                            <Cards maxCards={3} />
                        </div>
                        <button className="btn btn-light mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><b>Add new card</b></button>  
                       <AddNewCard />
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-xs-12 col-md-9 col-lg-9">

            {/* Balance Analytics */}
            <div className="card shadow">
                <div className="card-body">
                    <BalanceAnalytics />
                </div>
            </div>
            {/* Balance Analytics End */}

                {/* <div className="row my-3">
                    <div className="col-md-7 col-lg-7 col-sm-12 col-xs-12">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title"><b>Quick transfer</b></h5>
                                <ScrollBar />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12">
                        <Currency />
                    </div>
                </div> */}

            </div>
          </div>
        </>
    );
}   


export default Wallet;