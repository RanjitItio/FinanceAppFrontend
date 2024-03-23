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
import WelcomeSection from './welcome';




function Dashboard() {
    return (
        <>
         <WelcomeSection />

        <div style={{ position: 'absolute', top: '18rem', left: '4.2rem' }}>
            <TotalBalance />
            <PocketPlan></PocketPlan>
                <span style={{marginRight: "20px"}}>&nbsp;</span>
            <RecentActivity />
        </div>

        <div style={{ position: 'absolute', top: '18rem', left: '31rem' }}>
            <ExpenseCategory />

            <div className="d-flex justify-content-start mt-3">
                <div className="mr-3">
                    <IncomeAnalysis />
                </div>
                    <span style={{marginRight: "20px"}}>&nbsp;</span>
                <div>
                    <ExpenseAnalysis />
                </div>
            </div>

            <div style={{ position: 'absolute', top: '39.5rem', left: '15rem' }}>
                <Currency />    
            </div>
        </div>

        </>

    )
}



export default Dashboard;