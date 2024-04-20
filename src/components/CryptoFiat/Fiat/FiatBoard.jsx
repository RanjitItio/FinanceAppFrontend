import 'bootstrap/dist/css/bootstrap.min.css';
import FiatAccount from './Account';
import FiatTransaction from './Transaction';
import FiatMyCard from './Mycard';
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function FiatDashboard() {
    return (
        <>
          <div className="container-fluid">
            {/* First Row */}
            <div className="row">
                {/* First row first column */}
                <div className="col-md-8 col-lg-8 col-xl-8 col-sm-12 col-xs-12 mb-2 my-3">
                    <div className="row">
                        <div className="col mb-3">
                            <FiatAccount />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <FiatTransaction />
                        </div>
                    </div>
                </div>

                {/* First Row Second Column */}
                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12 my-3">
                    <FiatMyCard />
                </div>
            </div>
          </div>
        </>
    )
}