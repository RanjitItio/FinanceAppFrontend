



function Preferences() {
    return (
        <>
        <form>

            <div data-mdb-input-init className="form-outline mb-4">
                <label for="exampleDataList" class="form-label">Language</label>
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                <datalist id="datalistOptions">
                    <option value="English(US)" />
                    <option value="Hindi" />
                </datalist >
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <label for="DataList" class="form-label">Gender</label>
                    <input class="form-control" list="datalistOption" id="DataList" placeholder="Type to search..." />
                    <datalist id="datalistOption">
                        <option value="Male" />
                        <option value="Female" />
                        <option value="Other" />
                    </datalist >
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


export default Preferences;