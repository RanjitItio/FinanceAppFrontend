


function PersonalInfo(){
    return(
        <>
        <form>
            <div className="row mb-4">
                <div className="col">
                    <div data-mdb-input-init className="form-outline d-flex justify-content-start">
                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{maxWidth: '90px'}} alt="Avatar" />
                    <input className="my-3 mx-2" type="file" id="formFile" placeholder="Upload Image"></input>
                    {/* <button type="button" className="btn btn-primary"><b>Delete</b></button> */}
                    </div>
                </div>

                {/* <div className="col">
                    <div data-mdb-input-init className="form-outline d-flex justify-content-start">
                    <button type="button" className="btn btn-primary"><b>Delete</b></button>
                    </div>
                </div> */}

            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <input type="text" id="form6Example3" className="form-control" style={{height: "3rem"}} placeholder="Type display name" />
                <label className="form-label text-muted" htmlFor="form6Example3">Display Name</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" id="form6Example4" className="form-control" style={{height: "3rem"}} placeholder="Type Email"/>
                <label className="form-label text-muted" htmlFor="form6Example4">Email</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <input type="number" id="form6Example4" className="form-control" style={{height: "3rem"}} placeholder="Type Mobile Number"/>
                <label className="form-label text-muted" htmlFor="form6Example4">Mobile Number</label>
            </div>

            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="date" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">Date of Birth</label>
                </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">Country</label>
                </div>
                </div>

                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">Province</label>
                </div>
                </div>
                <div className="col">
                <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form6Example1" className="form-control" style={{height: "3rem"}} />
                    <label className="form-label text-muted" htmlFor="form6Example1">City</label>
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


export default PersonalInfo;