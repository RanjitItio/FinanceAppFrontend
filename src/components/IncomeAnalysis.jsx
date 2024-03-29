import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';




function IncomeAnalysis(){
    return (
        
        <div className="card shadow h-100" style={{maxWidth: "30rem"}}>
            <div className="card-body" style={{overflow: "auto", maxHeight: "18rem"}}>
                <h5 className="card-title"><b>Income Analysis</b></h5>
                &nbsp;
                <h4 className="card-subtitle mb-2 text"><b>$8,527,224</b></h4>
                <p className="card-text">VS This Month</p>
                <img src="../src/images/BarChart.png" alt="" className='img-fluid'/>
            </div>
        </div>
    )
}



export default IncomeAnalysis;