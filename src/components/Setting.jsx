import PersonalInfo from "./PersonalInfo";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SettingsInfoCard from "./SettingsInfoCard";
import Preferences from "./Preference";
import { useState } from "react";
import { event } from "jquery";
import PasswordReset from "./PasswordReset";




function Settings() {
   const [showPersonalInfo, setShowPersonalInfo] = useState(false);
   const [showPreference, setshowPreference] = useState(false);
   const [restPassword, setResetPassword] = useState(false)

   const handlePersonalInfo = (event) => {
      setShowPersonalInfo(true);
      setshowPreference(false);
      setResetPassword(false)
   }

   const handlePreference = () => {
    setshowPreference(true);
    setShowPersonalInfo(false);
    setResetPassword(false);
   }

   const handleResetPassword = ()=> {
    setResetPassword(true);
    setshowPreference(false);
    setShowPersonalInfo(false);
   }

    return(
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12" >
                <div className="card shadow-lg" style={{overflow:'auto'}}>
                    <div className="card-body">
                            <SettingsInfoCard handlePersonalInfo={handlePersonalInfo} handlePreference={handlePreference} handleResetPassword={handleResetPassword}/>
                    </div>
                </div>
            </div>

            <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 my-2">
                <div className="card shadow-lg">
                    <div className="card-body">
                       
                    {showPersonalInfo ? (
                            <>
                                <h5 className="card-title"><b>Personal Information</b></h5>
                                <hr /> 
                                <PersonalInfo />
                            </>
                        ) : showPreference ? (
                            <>
                                <h5 className="card-title"><b>Preference</b></h5>
                                <hr />
                                <Preferences />
                            </>
                        ) : restPassword ? (
                            <>
                                <h5 className="card-title"><b>Reset Password</b></h5>
                                <hr />
                                <PasswordReset />
                            </>
                        ) : (
                            <div>No component selected.</div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    </div>


{/*    
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12" >
                    <div className="card shadow-lg" style={{overflow:'auto'}}>
                        <div className="card-body">
                                <SettingsInfoCard />
                        </div>
                    </div>
                </div>

                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 my-2">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title"><b>Personal Information</b></h5>
                            <hr />
                            <Preferences />
                        </div>
                    </div>
                </div>
            </div>
        </div>       */}
               
        </>
    );
}


export default Settings;