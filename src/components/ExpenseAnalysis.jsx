import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



function ExpenseAnalysis(){
    return (
        <div className="card shadow" style={{width: "24rem", height: "18.5rem"}}>
            <div className="card-body">
                <h5 className="card-title"><b>Expense Analysis</b></h5>
                <br></br>
                <h4 className="card-subtitle mb-2 text-muted"><b>$2,056,123</b></h4>
                <p className="card-text">VS This Month</p>
                
            </div>
        </div>
    )
}



export default ExpenseAnalysis;

