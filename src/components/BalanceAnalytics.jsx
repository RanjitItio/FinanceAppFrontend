import React from "react";
import '../styles/balance_analytics.css'
import GridDemo from "./Charts/LineChart";


function BalanceAnalytics() {
    return(
        <>
          <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-6">
                    <h5 className="card-title fs-md-4 fs-lg-5 fs-xl-6"><b>Balance Analytics1</b></h5>
                </div>
                <div className="col-md-3 col-lg-3 col-sm-12">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Income Statitics</label>
                    </div>
                </div>
                <div className="col-md-3 col-lg-3 col-sm-12">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Expense Statitics</label>
                    </div>
                </div>
                
                {/* <div className="col-md-3 col-lg-3 col-sm-6">Drop Down</p>
                </div> */}
            </div>   
            &nbsp;       
            <div className="overflow-auto" style={{maxHeight: "300px"}}>
                <GridDemo />
                {/* <img src="../src/images/barinvestchart.jpg" alt="Bar Chart" className='img-fluid' /> */}
            </div>
        </>
    );
}


export default BalanceAnalytics;