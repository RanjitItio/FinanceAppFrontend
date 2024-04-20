import PageNavbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Transaction from './components/Transaction'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Statistics from './components/Statitics';
import WelcomeSection from './components/welcome';
import Container from './components/Container';
import Wallet from './components/Wallet';
import CardUpdate from './components/CardUpdate';
import Settings from './components/Setting';
import Preferences from './components/Preference';
import PasswordReset from './components/PasswordReset';
import FAQs from './components/FAQs';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import ForgotPassword from './components/Authentication/ForgotPassword';
import UserLogout from './components/Authentication/Logout';
import KYCForm from './components/Authentication/KYCForm';
import KYCSubmissionReport from './components/Authentication/KYCSubmission';
import PaymentInformation from './components/Payment/PaymentInfo';
import StepWisePaymentForm from './components/Payment/StepForm';
import CryptoFiat from './components/CryptoFiat/CryptoFiat';
import React from "react";
import Box from '@mui/material/Box';
import UpperNavbar from './components/UpNavbar';
import LeftNavbar from './components/LeftNavbar';





function App() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <div>

        <Router>
          <Routes>
            <Route exact path='/signup/' element={<Register />}></Route>
            <Route exact path='/signin/' element={<Login />}></Route>
            <Route exact path='/signout/' element={<UserLogout />}></Route>
            <Route exact path='/forgot-password/' element={<ForgotPassword />}></Route>
            <Route exact path='/kyc/' element={<KYCForm />}></Route>
            <Route exact path='/kyc-submission-report/' element={<KYCSubmissionReport />}></Route>
            <Route exact path='/payment-info/' element={<PaymentInformation />}></Route>
            <Route exact path='/payment-form/' element={<StepWisePaymentForm />}></Route>

            {/* <Route exact path='*' element={
              <>
                  <PageNavbar />
                  <WelcomeSection />
                  <Container>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/transaction" element={<Transaction />} />
                      <Route path="/statistics" element={<Statistics />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/wallet/card-update" element={<CardUpdate />} />
                      <Route exact path="/settings" element={<Settings />} />
                      <Route path="/settings/preference" element={<Preferences />} />
                      <Route path="/settings/password-reset" element={<PasswordReset />} />
                      <Route path="/faqs" element={<FAQs />} />
                      <Route path="/signup" element={<Register />} />
                    </Routes>
                  </Container>
              </>
            }>

            </Route> */}

            <Route exact path='*' element={
              <>
               <Box sx={{ display: 'flex' }}>
                  <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
                  <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

                    <Routes>
                      <Route exact path='/crypto-fiat/' element={<CryptoFiat open={open} />}></Route>
                    </Routes>
                </Box>
              </>
            }>
            </Route> 
          </Routes>
        </Router>
        
      </div>
  

  )
}

export default App

