import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/expense.css'


function ExpenseCategory(){
    return (
        <div className="card shadow card__body">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title"><b>Expense Category</b></h5>
                    <div class="btn-group">
                    <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Duration
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Monthly</a></li>
                        <li><a class="dropdown-item" href="#">Anually</a></li>
                    </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg col-md">
                        <img src="../src/images/expense_category.jpg" alt="" class="img-fluid img-large-device" />
                    </div>
                </div>
                {/* <img src="../src/images/expense_category.jpg" alt="" className='img-fluid' /> */}
            </div>
        </div>

    )
}



export default ExpenseCategory;

{/* <div className="card card__body shadow">
<div className="card-body">
    <h5 className="card-title"><b>Expense Category</b></h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    
</div>
</div> */}