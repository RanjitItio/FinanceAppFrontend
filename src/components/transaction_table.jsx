import React from "react";
import '../styles/transaction_table.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Table from 'react-bootstrap/Table';
// import 'jquery/dist/jquery.min.js'



function TransactionTable() {
    return (
        <>
        <div className="row">
            <div className="col-4">
                <input className="form-control mr-sm-2 w-100 rounded-5 border border-secondary my-2" type="search" placeholder="Search" aria-label="Search" />
            </div>

            <div className="col-8 d-flex justify-content-end my-2">
                <div className="col-2">
                    <button type="button" className="btn btn-light mr-2 border-secondary rounded-4 d-none d-sm-block" data-bs-toggle="collapse" data-bs-target="#transactionTypeDropdown" aria-expanded="false" aria-controls="transactionTypeDropdown">
                        <i className="bi bi-filter"></i> &nbsp;
                        <b>Filter</b>
                    </button>
                    {/* For small Device */}
                    <button className="btn btn btn-secondary d-sm-none rounded-2 border-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#transactionTypeDropdown" aria-controls="transactionTypeDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-filter"></i>
                    </button>

                </div>
                &nbsp;&nbsp;
                <div className="col-2"> 
                    <button type="button" className="btn btn-light border-secondary rounded-4 d-none d-sm-block">
                        <i className="bi bi-file-earmark-arrow-up"></i>
                        <b>Export</b>
                    </button>
                    {/* For small Device */}
                    <button className="btn btn btn-secondary d-sm-none rounded-2 border-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-file-earmark-arrow-up" ></i>
                    </button>
                </div>
            </div>
        </div>
        
        {/* Collapse Dropdown Transaction Business etc */}
        
         {/* </div> */}
         <div className="row">
         
            <div className="collapse my-2" id="transactionTypeDropdown">
                <div className="d-flex justify-content-around">
                <div className="col-sm-12">
                    <div className="btn-group">
                        <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Transaction Type
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                </div>
                
                    <div className="col-sm-12">
                    <div className="btn-group">
                        <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Business Type
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    </div>

                    <div className="col-sm-12">
                    <div className="btn-group">
                        <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Status
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    </div>

                    <div className="col-sm-12">
                    <div className="btn-group">
                        <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
                            Status
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    </div>

                </div>
            </div>
            </div>

        {/* End Collapse Dropdown Transaction Business etc */}

        {/* style={{maxWidth: "75rem", maxHeight: "20rem"}} */}
        <div className="" style={{overflow: "auto"}}>
           <table className="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" className="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <th scope="col" className="col">Invoice</th>
                        <th scope="col" className="col-sm-3 col-xs-3 col-md-2 ">Name/ Business</th>
                        <th scope="col" className="col-sm-3 col-md-2">Transaction type</th>
                        <th scope="col" className="col-sm-3 col-md-2">Date & Time</th>
                        <th scope="col" className="col">Amount</th>
                        <th scope="col" className="col">Status</th>
                        <th scope="col" className="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>78956435</td>
                        <td>Ranjit Pvt. Ltd.</td>
                        <td>UPI</td>
                        <td>22 Oct 12:56:19</td>
                        <td>900 Rs.</td>
                        <td>Success</td>
                        <td>Delete, Edit</td>
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
                    <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                  
                </tbody>
            </table>
        </div>
        

        <div className="row">
            <div className="col-lg-6">
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-lg-start justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">...</a></li>
                        <li className="page-item"><a className="page-link" href="#">99</a></li>
                        <li className="page-item"><a className="page-link" href="#">100</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="col-lg-6">
                <p className="text-secondary text-lg-end">Showing 6 of 50 Entries &nbsp;
                <div className="btn-group">
                    <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Choose Range
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Show 10</a></li>
                        <li><a className="dropdown-item" href="#">Show 20</a></li>
                        <li><a className="dropdown-item" href="#">Show 30</a></li>
                    </ul>
                    </div>
                </p>   
            </div>
        </div>

        </>

    // <div className="card shadow-lg mx-auto rounded-4" style={{ maxHeight: "50rem"}}>
    //     <div className="card-body">
    //         <div className="d-flex justify-content-between align-items-center">
    //             <input className="form-control mr-sm-2 w-25 rounded-5 border border-secondary" type="search" placeholder="Search" aria-label="Search" />
    //             <div>
                    // <button type="button" className="btn btn-light mr-2 border-secondary rounded-4" style={{fontSize: "20px"}} data-bs-toggle="collapse" data-bs-target="#transactionTypeDropdown" aria-expanded="false" aria-controls="transactionTypeDropdown">
                    //     <i className="bi bi-filter"></i> &nbsp;
                    //     <b>Filter</b>
                    // </button>
    //                     &nbsp;&nbsp;
                    // <button type="button" className="btn btn-light border-secondary rounded-4" style={{fontSize: "20px"}}>
                    //     <i className="bi bi-file-earmark-arrow-up"></i> &nbsp;
                    //     <b>Export</b></button>
    //             </div>
    //         </div>

            // <div className="collapse my-2" id="transactionTypeDropdown">
            //     <div className="d-flex justify-content-around">
            //         <div className="btn-group">
            //             <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
            //                 Transaction Type
            //             </button>
            //             <ul className="dropdown-menu">
            //                 <li><a className="dropdown-item" href="#">Action</a></li>
            //                 <li><a className="dropdown-item" href="#">Another action</a></li>
            //                 <li><a className="dropdown-item" href="#">Something else here</a></li>
            //                 <li><hr className="dropdown-divider" /></li>
            //                 <li><a className="dropdown-item" href="#">Separated link</a></li>
            //             </ul>
            //         </div>
                
            //         <div className="btn-group">
            //             <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
            //                 Business Type
            //             </button>
            //             <ul className="dropdown-menu">
            //                 <li><a className="dropdown-item" href="#">Action</a></li>
            //                 <li><a className="dropdown-item" href="#">Another action</a></li>
            //                 <li><a className="dropdown-item" href="#">Something else here</a></li>
            //                 <li><hr className="dropdown-divider" /></li>
            //                 <li><a className="dropdown-item" href="#">Separated link</a></li>
            //             </ul>
            //         </div>

            //         <div className="btn-group">
            //             <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
            //                 Status
            //             </button>
            //             <ul className="dropdown-menu">
            //                 <li><a className="dropdown-item" href="#">Action</a></li>
            //                 <li><a className="dropdown-item" href="#">Another action</a></li>
            //                 <li><a className="dropdown-item" href="#">Something else here</a></li>
            //                 <li><hr className="dropdown-divider" /></li>
            //                 <li><a className="dropdown-item" href="#">Separated link</a></li>
            //             </ul>
            //         </div>

            //         <div className="btn-group">
            //             <button type="button" className="btn btn-light dropdown-toggle border-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "15rem"}}>
            //                 Status
            //             </button>
            //             <ul className="dropdown-menu">
            //                 <li><a className="dropdown-item" href="#">Action</a></li>
            //                 <li><a className="dropdown-item" href="#">Another action</a></li>
            //                 <li><a className="dropdown-item" href="#">Something else here</a></li>
            //                 <li><hr className="dropdown-divider" /></li>
            //                 <li><a className="dropdown-item" href="#">Separated link</a></li>
            //             </ul>
            //         </div>

            //     </div>
            // </div>

    //         <br></br>
            
            // <table className="table table-hover">
            //     <thead className="table-secondary">
            //         <tr>
            //             <th scope="col">
            //                 <div className="form-check">
            //                 <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                              
            //                 </div>
            //             </th>
            //             <th scope="col">Invoice</th>
            //             <th scope="col">Name/Business</th>
            //             <th scope="col">Transaction Type</th>
            //             <th scope="col">Date & Time</th>
            //             <th scope="col">Amount</th>
            //             <th scope="col">Status</th>
            //             <th scope="col">Action</th>
                       
            //         </tr>
            //     </thead>
            //     <tbody>
            //         <tr>
            //             <th scope="row">
            //                 <div className="form-check">
            //                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                               
            //                 </div>
            //             </th>

            //             <td><b>B12341</b></td>
            //             <td>
            //                 <b>Figma Pro</b>
            //                 <p className="fw-light">Software</p>
            //             </td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-secondary"><b>Subscribe</b></button>
            //             </td>
            //             <td>
            //                 <b>October 20, 2023</b>
            //                 <p className="fw-light">1:32 PM</p>
            //             </td>
            //             <td><b>-$32.00</b></td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-success"><b>Success</b></button>
            //             </td>
            //             <td>
            //                 <b>
            //                     <i className="bi bi-eye-fill"></i>
            //                     &nbsp;&nbsp;&nbsp;&nbsp;
            //                     <i className="bi bi-trash-fill"></i>
            //                 </b>
            //             </td>

            //         </tr>
            //         <tr>
            //             <th scope="row">
            //                 <div className="form-check">
            //                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            //                 </div>
            //             </th>

            //             <td><b>B12341</b></td>
            //             <td>
            //                 <b>Fiver International</b>
            //                 <p className="fw-light">Freelance platform</p>
            //             </td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-secondary"><b>Receive</b></button>
            //             </td>
            //             <td>
            //                 <b>November 01 , 2022</b>
            //                 <p className="fw-light">01:32 PM</p>
            //             </td>
            //             <td><b>+$100.00</b></td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-warning"><b>Pending</b></button>
            //             </td>
            //             <td>
            //                 <b>
            //                     <i className="bi bi-eye-fill"></i>
            //                     &nbsp;&nbsp;&nbsp;&nbsp;
            //                     <i className="bi bi-trash-fill"></i>
            //                 </b>
            //             </td>
            //         </tr>

            //         <tr>
            //             <th scope="row">
            //                 <div className="form-check">
            //                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                               
            //                 </div>
            //             </th>
            //            <td><b>B12341</b></td>
            //             <td>
            //                 <b>Adobe</b>
            //                 <p className="fw-light">Software</p>
            //             </td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-secondary"><b>Subscribe</b></button>
            //             </td>
            //             <td>
            //                 <b>October 20, 2023</b>
            //                 <p className="fw-light">01:32 PM</p>
            //             </td>
            //             <td><b>-$32.00</b></td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-danger"><b>Danger</b></button>                        </td>
            //             <td>
            //                 <b>
            //                     <i className="bi bi-eye-fill"></i>
            //                     &nbsp;&nbsp;&nbsp;&nbsp;
            //                     <i className="bi bi-trash-fill"></i>
            //                 </b>
            //             </td>
            //         </tr>

            //         <tr>
            //             <th scope="row">
            //                 <div className="form-check">
            //                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                               
            //                 </div>
            //             </th>
            //            <td><b>B12341</b></td>
            //             <td>
            //                 <b>Starbucks</b>
            //                 <p className="fw-light">Freelance platform</p>
            //             </td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-secondary"><b>Receive</b></button>
            //             </td>
            //             <td>
            //                 <b>November 01 , 2022</b>
            //                 <p className="fw-light">01:32 PM</p>
            //             </td>
            //             <td><b>$100.00</b></td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-warning"><b>Warning</b></button>
            //             </td>
            //             <td>
            //                 <b>
            //                     <i className="bi bi-eye-fill"></i>
            //                     &nbsp;&nbsp;&nbsp;&nbsp;
            //                     <i className="bi bi-trash-fill"></i>
            //                 </b>
            //             </td>
            //         </tr>

            //         <tr>
            //             <th scope="row">
            //                 <div className="form-check">
            //                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                              
            //                 </div>
            //             </th>
            //            <td><b>B12341</b></td>
            //             <td>
            //                 <b>Figma Pro</b>
            //                 <p className="fw-light">Software</p>
            //             </td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-secondary"><b>Subscribe</b></button>
            //             </td>
            //             <td>
            //                 <b>October 20, 2023</b>
            //                 <p className="fw-light">1:32 PM</p>
            //             </td>
            //             <td><b>-$32.00</b></td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-success"><b>Success</b></button>
            //             </td>
            //             <td>
            //                 <b>
            //                     <i className="bi bi-eye-fill"></i>
            //                     &nbsp;&nbsp;&nbsp;&nbsp;
            //                     <i className="bi bi-trash-fill"></i>
            //                 </b>
            //             </td>
            //         </tr>

            //         <tr>
            //             <th scope="row">
            //                 <div className="form-check">
            //                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                              
            //                 </div>
            //             </th>
            //            <td><b>B12341</b></td>
            //             <td>
            //                 <b>Figma Pro</b>
            //                 <p className="fw-light">Software</p>
            //             </td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-secondary"><b>Subscribe</b></button>
            //             </td>
            //             <td>
            //                 <b>October 20, 2023</b>
            //                 <p className="fw-light">1:32 PM</p>
            //             </td>
            //             <td><b>-$32.00</b></td>
            //             <td>
            //                 <button type="button" className="btn btn-outline-success"><b>Success</b></button>
            //             </td>
            //             <td>
            //                 <b>
            //                     <i className="bi bi-eye-fill"></i>
            //                     &nbsp;&nbsp;&nbsp;&nbsp;
            //                     <i className="bi bi-trash-fill"></i>
            //                 </b>
            //             </td>
            //         </tr>
            //     </tbody>
            // </table>
            

    //         <hr />
            // <nav aria-label="Page navigation">
            //     <ul className="pagination">
            //         <li className="page-item">
            //         <a className="page-link" href="#" aria-label="Previous">
            //             <span aria-hidden="true">&laquo;</span>
            //         </a>
            //         </li>
            //         <li className="page-item"><a className="page-link" href="#">1</a></li>
            //         <li className="page-item"><a className="page-link" href="#">2</a></li>
            //         <li className="page-item"><a className="page-link" href="#">3</a></li>
            //         <li className="page-item"><a className="page-link" href="#">4</a></li>
            //         <li className="page-item"><a className="page-link" href="#">...</a></li>
            //         <li className="page-item"><a className="page-link" href="#">99</a></li>
            //         <li className="page-item"><a className="page-link" href="#">100</a></li>
            //         <li className="page-item">
            //         <a className="page-link" href="#" aria-label="Next">
            //             <span aria-hidden="true">&raquo;</span>
            //         </a>
            //         </li>
            //     </ul>
                
            // </nav>
                
    //     </div>
    // </div>

    )
}




export default TransactionTable;