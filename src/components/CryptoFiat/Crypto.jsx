import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import TotalBalanceChart from './BalanceChart';
import CryptoCards from './CryptoCards';
import TrendingCrypto from './TrendingCrypto';
import MarketValueCard from './MarketValue';
import Transactions from './Transactions';




export default function CryptoContent() {

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                {/* First Column */}
                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    {/* First Row */}
                    <div className="row my-2">
                        <CryptoCards />
                    </div>

                     {/* Second Row */}
                    <div className="row">
                        {/* First Column */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                            <div className="card shadow-lg" >
                                <div className="card-body">
                                    <h5 className="card-title"><b>Your Balance</b></h5>
                                        <TotalBalanceChart />
                                </div>
                            </div> 
                        </div>

                        {/* Second Column */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <TrendingCrypto />
                        </div>
                    </div>


                    <div className="row mx-1 my-2">
                        {/* <div className="card" >
                            <div className="card-body"  > */}
                                <h5 className="card-title"><b>Market Value</b></h5>
                                    <MarketValueCard />
                            {/* </div>
                        </div>  */}
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 my-2">
                    <div className="card" >
                        <div className="card-body">
                            {/* <h5 className="card-title mb-2">Transaction</h5> */}
                            <Transactions />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
}




