import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/dashboard.css';
import TotalBalance from './total_balance';
import ExpenseCategory from './Expense';
import PocketPlan from './pocket_plan';
import IncomeAnalysis from './IncomeAnalysis';
import ExpenseAnalysis from './ExpenseAnalysis';
import RecentActivity from './recent_activity';
import Currency from './currency';




function Dashboard() {
    return (
        <>
         {/* <WelcomeSection /> */}
         {/* style={{ position: 'absolute', top: '18rem', left: '4.2rem' }} */}
         {/* <div className="container-fluid"> */}
         
            <div className="row">
                <div className="col-md-4 col-sm-12 col-lg-4 col-xs-12">
                    <TotalBalance />
                    <div className="row">
                        <div className="col my-2">
                            <PocketPlan />
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-12 col-lg-8 col-xs-12">
                    <ExpenseCategory />
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                            <IncomeAnalysis />
                        </div>
                        <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                            <ExpenseAnalysis />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                    <RecentActivity />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12 my-2">
                    <Currency /> 
                </div>
            </div>

        </>

    )
}



export default Dashboard;