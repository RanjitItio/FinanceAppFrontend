


function PasswordReset() {

    return(
        <>
        <form>
            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">Old Password</label>
                </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">New Password</label>
                </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">Confirm Password</label>
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



export default PasswordReset;


