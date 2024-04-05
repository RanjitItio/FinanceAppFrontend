import React from "react";
import CardForm from "./CardForm";



function CardUpdate() {
    return(
        <>
        <div className="container-fluid">
            <div className="row my-2">
                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                <div className="card shadow-lg">
                    <div className="card-body">
                    <h5><b>Card Details</b></h5>&nbsp;
                        <CardForm/> 
                    </div>
                </div>
                </div>

                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h6><b>Card Design</b></h6><br></br>
                            <div className="card my-2" style={{backgroundColor: "#22c1c3", color: "white"}}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="card-title" >Visa Card</h6>
                                        <h5 className="card-title" ><b>Visa Card</b></h5>
                                    </div>&nbsp;
                                    <h6 className="card-subtitle mb-2" ><b>**** **** ****6543</b></h6>
                                    <p className="card-text" >Name</p><br/>
                                    <p className="card-text" >Ranjit Kumar Sahoo</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-light text-center"><b>Change Card Design</b></button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        </>       
    );
}


export default CardUpdate;