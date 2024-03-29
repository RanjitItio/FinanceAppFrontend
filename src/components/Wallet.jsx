import TotalBalance from './total_balance';
import ScrollBar from './Scrollbar';
import Currency from './currency';
import Cards from './Card';
import BalanceAnalytics from './BalanceAnalytics';




function Wallet() {
    return (
        <>
        <div className="row">
           {/* First Row First Column*/}
            <div className="col-sm-12 col-xs-12 col-md-3 col-lg-3 ">
                <TotalBalance />
                <div className="col my-3">
                    <div className="card shadow">
                        <div className="card-body"style={{ overflow: "auto"}} >
                            <Cards maxCards={3} />
                        </div>
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

                <div className="row my-3">
                    <div className="col-md-7 col-lg-7 col-sm-12 col-xs-12">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Quick transfer</h5>
                                <ScrollBar />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12">
                        <Currency />
                    </div>
                </div>

            </div>
          </div>
        </>
    );
}   


export default Wallet;