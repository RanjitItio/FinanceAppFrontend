import React from "react";


function CardForm(){
    return(
        <>
        <form>
            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control"  style={{height: "3rem"}}/>
                    <label className="form-label" htmlFor="form6Example1">Name on Card</label>
                </div>
                </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" id="form6Example3" className="form-control" style={{height: "3rem"}} />
                <label className="form-label" htmlFor="form6Example3">Email Address</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <input type="text" id="form6Example4" className="form-control" style={{height: "3rem"}} />
                <label className="form-label" htmlFor="form6Example4">Card Number</label>
            </div>

            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="date" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label" htmlFor="form6Example1">Expiry</label>
                </div>
                </div>

                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="password" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label" htmlFor="form6Example1">CVV</label>
                </div>
                </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <input type="text" id="form6Example6" className="form-control" style={{height: "3rem"}} />
                <label className="form-label" htmlFor="form6Example6">Country</label>
            </div>

            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label" htmlFor="form6Example1">State</label>
                </div>
                </div>

                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label" htmlFor="form6Example1">City</label>
                </div>
                </div>
            </div>

            <div className="d-flex justify-content-center">
            <button data-mdb-ripple-init type="button" className="btn btn-light btn-block mb-4"><b>Cancel</b></button>
                &nbsp;&nbsp;&nbsp;
            <button data-mdb-ripple-init type="submit" className="btn btn-block mb-4" style={{backgroundColor: "#43CBA5", color:"whitesmoke"}}><b>Submit</b></button>
            </div>
        </form>
        </>
    );
}


export default CardForm;