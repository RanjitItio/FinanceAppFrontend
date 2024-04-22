import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/navbar.css'
import '../js/navbar.js'
import { Link } from "react-router-dom";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';






function PageNavbar() {

    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const clearSearch = () => {
        setShowSearch(false);
    };

    return (

          <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#0E2F44"}}>
            <div className="container-fluid">
                {/* Nav Icon and Logo */}
                <a className="navbar-brand d-none d-sm-block m-0" href="#">  
                    <div className="logo__icon">
                        <i className="bi bi-cash-coin"></i>&nbsp;
                    </div>
                </a>
                <a className="navbar-brand logo d-none d-sm-block m-0" href="#"><b>Itio</b></a>
                {/* Nav Icon and Logo End */}

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{color: "white"}}></span>
                </button>

                <div className="ml-auto">
                    {showSearch ? (
                        <>
                        <div className="input-group">
                            <input 
                                className="form-control" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                style={{ maxWidth: '100%' }} 
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={clearSearch}
                            >
                                <i className="bi bi-x" style={{color: "red"}}></i>
                            </button>
                        </div>
                        </>
                    ): (
                    <>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleSearch}>
                            <i className="bi bi-search" style={{color: "white"}}></i>
                        </button>
                        &nbsp;
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="bi bi-bell" style={{color: "white"}}></i>
                        </button>
                        &nbsp;
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <img src="./vite.svg" className="img-fluid profile_image notification_profile" alt="Profile" />
                        </button>
                    </>

                    )}

                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ms-4 me-4">
                         <Link className="nav-link active" aria-current="page" to='/' >Dashboard</Link>
                     </li>

                     <li className="nav-item ms-4 me-4">
                         <Link className="nav-link active"  to='/wallet' >Wallet</Link>
                     </li>                 

                     <li className="nav-item ms-4 me-4">
                         <Link className="nav-link active" to='/settings' >Settings</Link>
                     </li>

                     <li className="nav-item ms-4 me-4">
                         <Link className="nav-link active" to='/user/crypto-fiat/' >Fiat/Crypto</Link>
                     </li>

                     <li className="nav-item ms-4 me-4">
                         <Link className="nav-link active" to='/' >Help & Center</Link>
                     </li>
                </ul>

                <form className="d-flex ms-auto d-none d-sm-block" role="search">
                     <div className="input-group">
                         <input className="form-control me-5" type="search" placeholder="Search anything here" aria-label="Search" style={{borderRadius: "20px"}} />
                         <span className="input-group-text search-icon" >
                             <i className="bi bi-search"></i>
                         </span>
                    </div>
                    
                     {/* Hidden Button */}
                     <button className="btn btn-outline-success d-none" type="submit">Search</button>
                 </form>

                 {/* Notification Icon */}
                 <button className="btn btn-outline-secondary rounded-circle d-none d-sm-block" type="submit">
                     <i className="bi bi-bell" style={{color: "white"}}></i>
                 </button>

                 &nbsp;&nbsp;

                 {/* Profile Pic */}
                 <button className="btn btn-outline-secondary rounded-circle d-none d-sm-block" type="submit">
                     <img src="./vite.svg" className="img-fluid profile_image notification_profile" alt="Profile" />
                 </button>

                </div>
            </div>
        </nav>
        

        // <>
        // <nav className="navbar navbar-expand-lg flex-column" style={{backgroundColor: "#0E2F44"}}>

        //     <div className="container-fluid">
        //         <span className="nav__item_space">&nbsp;</span>

        //         <div className="logo__icon">
        //             <i className="bi bi-cash-coin"></i>&nbsp;
        //         </div>
                
        //         <a className="navbar-brand logo" href="#"><b>Itio</b></a>
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>

        //         <span className="nav__item_space">&nbsp;</span>

        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        //             <li className="nav-item">
        //                 <a className="nav-link active" aria-current="page" href="#" >Dashboard</a>
        //             </li>

        //             <span className="nav__item_space">&nbsp;</span>

        //             <li className="nav-item">
        //                 <a className="nav-link active" href="#" >Wallet</a>
        //             </li>

        //             <span className="nav__item_space">&nbsp;</span>
                 

        //             <li className="nav-item">
        //                 <a className="nav-link active" href="#" >Settings</a>
        //             </li>

        //             <span className="nav__item_space">&nbsp;</span>

        //             <li className="nav-item">
        //                 <a className="nav-link active" href="#" >Help & Center</a>
        //             </li>

        //         </ul>

        //         <form className="d-flex ms-auto" role="search">
        //             <div className="input-group">
        //                 <input className="form-control me-5" type="search" placeholder="Search anything here" aria-label="Search" style={{borderRadius: "20px"}} />
        //                 <span className="input-group-text search-icon" >
        //                     <i className="bi bi-search"></i>
        //                 </span>
        //             </div>
                    
        //             {/* Hidden Button */}
        //             <button className="btn btn-outline-success d-none" type="submit">Search</button>
        //         </form>

        //         {/* Notification Icon */}
        //         <button className="btn btn-outline-secondary rounded-circle notification_profile" type="submit">
        //             <i className="bi bi-bell" style={{color: "white"}}></i>
        //         </button>

        //         &nbsp;&nbsp;

        //         {/* Profile Pic */}
        //         <button className="btn btn-outline-secondary rounded-circle notification_profile" type="submit">
        //             <img src="./vite.svg" className="img-fluid profile_image" alt="Profile" />
        //         </button>

        //         </div>
        //     </div>
        // </nav>
        // </>
    )
}



export default PageNavbar;