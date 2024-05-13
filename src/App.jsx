import PageNavbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Transaction from './components/Transaction'
import Statistics from './components/Statitics';
import WelcomeSection from './components/welcome';
import Container from './components/Container';
import Wallet from './components/Wallet';
import CardUpdate from './components/CardUpdate';
import Settings from './components/Setting';
import Preferences from './components/Preference';
import PasswordReset from './components/PasswordReset';
import FAQs from './components/FAQs';
// import UserDashboard from './components/UserDashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
import Transactions from './components/Transactions/Transaction';
import DepositForm from './components/Transactions/Deposit';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import SendMoneyForm from './components/Transactions/SendMoney';
import CryptoBuy from './components/CryptoTransactions/CryptoBuy';
import CryptoSell from './components/CryptoTransactions/CryptoSell';
import CryptoSwap from './components/CryptoTransactions/CryptoSwap';
import RequestMoneyForm from './components/Transactions/RequestMoney';
import ExchangeMoneyForm from './components/Transactions/ExchangeMoney';
import Ticket from './components/Ticket/ticket';
import Dispute from './components/Dispute/dispute';
import AddTicket from './components/Ticket/addtickets';
import TicketReply from './components/Ticket/ticketreply';
import DisputeReply from './components/Dispute/disputereply';
import Profile from './components/Profile/profile';
// import CryptoList from './components/CryptoExchange/cryptoexchangelist';
import CryptoList from './components/CryptoExchange/cryptoexchangelist';
import Plan from './components/Invesment/Plan';
import Invest from './components/Invesment/Invest';







function App() {

  const [open, setOpen] = React.useState(true);

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

            {/* <Route exact path='user/*' element={
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
                      <Route exact path='/' element={<CryptoFiat open={open} />}></Route>
                      <Route exact path='/transactions/' element={<Transactions open={open} />}></Route>
                      <Route exact path='/deposit/' element={<DepositForm open={open} />}></Route>
                      <Route exact path='/moneytransfer/' element={<SendMoneyForm open={open} />}></Route>
                      <Route exact path='/crypto-buy/' element={<CryptoBuy open={open} />}></Route>
                      <Route exact path='/crypto-sell/' element={<CryptoSell open={open} />}></Route>
                      <Route exact path='/crypto-swap/' element={<CryptoSwap open={open} />}></Route>
                      <Route exact path='/request-payment/' element={<RequestMoneyForm open={open} />}></Route>
                      <Route exact path='/exchange-currency/' element={<ExchangeMoneyForm open={open} />}></Route>
                      <Route exact path='/tickets/' element={<Ticket open={open} />}></Route>
                      <Route exact path='/tickets/add/' element={<AddTicket open={open} />}></Route>
                      <Route exact path='/tickets/reply/' element={<TicketReply open={open} />}></Route>
                      <Route exact path='/tickets/reply/' element={<TicketReply open={open} />}></Route>
                      <Route exact path='/dispute/' element={<Dispute open={open} />}></Route>
                      <Route exact path='/dispute/reply/' element={<DisputeReply open={open} />}></Route>
                      <Route exact path='/profile/' element={<Profile open={open} />}></Route>
                      <Route exact path='/crypto-list/' element={<CryptoList open={open} />}></Route>
                      <Route exact path='/investment/plan/' element={<Plan open={open} />}></Route>
                      <Route exact path='/investment/invest/' element={<Invest open={open} />}></Route>
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

