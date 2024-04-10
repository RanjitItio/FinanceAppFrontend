import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/statistics.css'
import OnSeriesItemClick from './Charts/PieChart'
import SimpleBarChart from './Charts/BarChart'
import GridDemo from './Charts/LineChart'


// style={{ position:"absolute", top: "18rem", left: "5rem", zIndex: "1", right: "2rem"}}

function Statistics(){
    return (
        <>
        {/* <div className="container"> */}
            <div className="row">

                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 my-2">
                    <div className="card shadow h-100" >
                    <div className="card-body">
                        <h5 className="card-title"><b>Income Analysis</b></h5>
                        &nbsp;
                        <h4 className="card-subtitle mb-2 text"><b>$8,527,224</b></h4>
                        &nbsp;
                       
                            <div className="inline-items">
                                <div className="badge bg-success text-wrap">
                                    3.1%
                                </div>
                                <p className="card-text">VS This Month</p>
                            </div>
                            &nbsp;
                            <SimpleBarChart />                        
                    </div>
                    </div>  
                </div>

              
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 my-2">
                    <div className="card shadow h-100" >
                    <div className="card-body">
                        <h5 className="card-title"><b>Expense Analysis</b></h5>
                        &nbsp;
                        <h4 className="card-subtitle mb-2 text"><b>$2,056,123</b></h4>
                        &nbsp;
                        <div className="inline-items">
                            <div className="badge bg-danger text-wrap">
                                3.1%
                            </div>
                            <p className="card-text">VS This Month</p>
                        </div>
                        &nbsp;
                        <GridDemo />
                        {/* <img src="../src/images/graph.png" alt="Image" sizes="" srcSet="" className='img-fluid' /> */}
                    </div>
                    </div>
                </div>
                
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-2">
                    <div className="card shadow h-100" >
                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title balance-statitics"><b>Balance Statitics</b></h5>
                            
                            <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Monthly
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Monthly</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Anually</a></li>
                                
                            </ul>
                            </div>
                        </div>

                        <GridDemo />
                        {/* <img src="../src/images/graph.png" alt="Image" sizes="" srcSet="" className='img-fluid' /> */}

                    </div>
                    </div>
                </div>
                
            </div>

            &nbsp;  &nbsp;
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="card shadow">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title balance-statitics"><b>Expense Category</b></h5>
                            
                            <div className="btn-group">
                                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Monthly
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Monthly</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Anually</a></li>
                                    
                                </ul>
                            </div>
                        </div>
                        <OnSeriesItemClick />
                    </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-2">
                    <div className="card shadow">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title balance-statitics"><b>Last Transaction</b></h5>
                                
                                <div className="btn-group">
                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Monthly
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Monthly</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Anually</a></li>
                                        
                                    </ul>
                                </div>
                        </div>
                        <div className="table-responsive overflow-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                  
                                </tbody>
                            </table>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
        {/* </div> */}

        </>
    )
}


export default Statistics;


// style={{width: "18rem"}}