import React from "react";
import '../styles/transaction_table.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'jquery/dist/jquery.min.js'


function TransactionTable() {
    return (
  
    <div className="card shadow-lg mx-auto rounded-4" style={{width: "80rem", height: "50rem"}}>
        <div className="card-body">
            
            <div className="d-flex justify-content-between align-items-center">
                <input className="form-control mr-sm-2 w-25 rounded-5 border border-secondary" type="search" placeholder="Search" aria-label="Search" />
                <div>
                    <button type="button" className="btn btn-light mr-2 border-secondary rounded-4" style={{fontSize: "20px"}} data-bs-toggle="collapse" data-bs-target="#transactionTypeDropdown" aria-expanded="false" aria-controls="transactionTypeDropdown">
                        <i class="bi bi-filter"></i> &nbsp;
                        <b>Filter</b>
                    </button>
                        &nbsp;&nbsp;
                    <button type="button" className="btn btn-light border-secondary rounded-4" style={{fontSize: "20px"}}>
                        <i class="bi bi-file-earmark-arrow-up"></i> &nbsp;
                        <b>Export</b></button>
                </div>
            </div>

            <div className="collapse my-2" id="transactionTypeDropdown">
                <div className="d-flex justify-content-around">
                    <div class="btn-group">
                        <button type="button" class="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Transaction Type
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                
                    <div class="btn-group">
                        <button type="button" class="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Business Type
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>

                    <div class="btn-group">
                        <button type="button" class="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Status
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>

                </div>
            </div>
                
        </div>
    </div>

    )
}


export default TransactionTable;