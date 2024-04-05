import React from "react";



function AddNewCard() {
    return(
        <>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel"><b>Add New Card</b></h5><br />
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="d-flex justify-content-center">
                <img
                    src="../src/images/debit-card.png"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: '20rem', maxHeight: '15rem' }}
                />
            </div>

            <div class="modal-body">
                <form>
                    <div className="row mb-4">
                        <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id="form6Example1" className="form-control"  style={{height: "3rem"}} placeholder="Type card holder name"/>
                            <label className="form-label" htmlFor="form6Example1">Card Holder Name</label>
                        </div>
                        </div>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="form6Example4" className="form-control" style={{height: "3rem"}} placeholder="Type card number" />
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
                            <input type="password" id="form6Example1" className="form-control" style={{height: "3rem"}} placeholder="Type CVV/CVC" />
                            <label className="form-label" htmlFor="form6Example1">CVV</label>
                        </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button data-mdb-ripple-init type="submit" className="btn btn-light btn-block mb-4" ><b>Submit</b></button>
                        <button data-mdb-ripple-init type="submit" className="btn btn-light btn-block mb-4" data-bs-dismiss="modal"><b>Cancel</b></button>
                    </div>
                </form>
            </div>

            </div>
        </div>
        </div>
        </>
    );
}


export default AddNewCard;