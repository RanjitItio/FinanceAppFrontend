import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function WelcomeSection(){
    return (
        <div style={{backgroundColor: "#0E2F44", position: 'relative'}} className='pb-5'>

             <h4 className='pt-5 pb-2' style={{marginLeft: "4rem", color:"white"}}>
                <b>
                    Welcome back, Ranjit
                </b>
                <span>
                    <i className="bi bi-emoji-grin"></i>
                </span>
             </h4>
             <p style={{marginLeft: "4rem", color:"white"}}>Dashboard &gt; <b>Overview</b></p>

                <button type="button" className="btn mt-3 selected-btn" style={{marginLeft: "3.5rem", color:"white"}}>Overview</button>
                <button type="button" className="btn mt-3 text-secondary-btn">Transaction</button>
                <button type="button" className="btn mt-3 text-secondary-btn">Statitics</button>
                <hr style={{ width: "18rem", backgroundColor: "grey", height: "1px", marginTop: "10px", marginLeft: "3.5rem"}} className="green-line"></hr>

        </div>
    )
}



export default WelcomeSection;