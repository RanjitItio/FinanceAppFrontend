import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



function PocketPlan() {
    return (
        <div className="card mt-3 shadow" style={{width: "25.5rem", height:"25rem"}}>
            <div className="card-body">
                <h5 className="card-title"><b>My Pocket Plans</b></h5>
                &nbsp;
                
                <div className="card" style={{width: "11rem", height:"8rem", display: "inline-block"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card title1</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    </div>
                </div>

                &nbsp;&nbsp;&nbsp;
                <div className="card" style={{width: "11rem", height:"8rem", display: "inline-block"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle2</h6>
                    </div>
                </div>

                
                <div className="card mt-3" style={{width: "11rem", height:"8rem", display: "inline-block"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card title3</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle3</h6>
                    </div>
                </div>

                &nbsp;&nbsp;&nbsp;

                <div className="card" style={{width: "11rem", height:"8rem", display: "inline-block"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card title4</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    </div>
                </div>

            </div>
        </div>
    )
}




export default PocketPlan;