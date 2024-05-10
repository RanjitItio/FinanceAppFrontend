import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./protectedroutes";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import UserLogout from "../Authentication/Logout";
import KYCForm from "../Authentication/KYCForm";
import KYCSubmissionReport from "../Authentication/KYCSubmission";
import PaymentInformation from "../Payment/PaymentInfo";
import StepWisePaymentForm from "../Payment/StepForm";
import ForgotPassword from "../Authentication/ForgotPassword";
import Box from '@mui/material/Box';
import UpperNavbar from "../UpNavbar";
import LeftNavbar from "../LeftNavbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AllTransactions from "../Transactions/Transaction";
import React from "react";
import CryptoFiat from "../CryptoFiat/CryptoFiat";
import DepositForm from "../Transactions/Deposit";
import SendMoneyForm from "../Transactions/SendMoney";
import CryptoBuy from "../CryptoTransactions/CryptoBuy";
import CryptoSell from "../CryptoTransactions/CryptoSell";
import RequestMoneyForm from "../Transactions/RequestMoney";
import ExchangeMoneyForm from "../Transactions/ExchangeMoney";
import WithdrawalMoneyForm from "../Withdraw/withdrawalmoney";
import WithdrawalList from "../Withdraw/withdrawallist";
import WithdrawalSettings from "../Withdraw/withdrawlsettings";
import Ticket from "../Ticket/ticket";
import AddTicket from "../Ticket/addtickets";
import TicketReply from "../Ticket/ticketreply";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dispute from "../Dispute/dispute";
import DisputeReply from "../Dispute/disputereply";
import Profile from "../Profile/profile";









const AuthRoutes = () => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { token } = useAuth();
  
    
    const routesForPublic = [
      {
        path: "/service",
        element: <div>Service Page</div>,
      },
      {
        path: "/about-us",
        element: <div>About Us</div>,
      },
    ];
  
   
    const routesForAuthenticatedOnly = [
      {
        path: "*",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "*",
            element: (
              
              
                <Routes>
                    <Route exact path='/signup/' element={<Register />}></Route>
                    <Route exact path='/signin/' element={<Login />}></Route>
                    <Route exact path='/signout/' element={<UserLogout />}></Route>
                    <Route exact path='/forgot-password/' element={<ForgotPassword />}></Route>
                    <Route exact path='/kyc/' element={<KYCForm />}></Route>
                    <Route exact path='/kyc-submission-report/' element={<KYCSubmissionReport />}></Route>
                    <Route exact path='/payment-info/' element={<PaymentInformation />}></Route>
                    <Route exact path='/payment-form/' element={<StepWisePaymentForm />}></Route> 

                    
                  <Route exact path='*' element={
                    <Box sx={{ display: 'flex' }}>
                    <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
                    <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

                      <Routes>
                          <Route exact path='/' element={<CryptoFiat open={open} />}></Route>
                          <Route exact path='/transactions/' element={<AllTransactions open={open} />}></Route>
                          <Route exact path='/deposit/' element={<DepositForm open={open} />}></Route>
                          <Route exact path='/moneytransfer/' element={<SendMoneyForm open={open} />}></Route>
                          <Route exact path='/crypto-buy/' element={<CryptoBuy open={open} />}></Route>
                          <Route exact path='/crypto-sell/' element={<CryptoSell open={open} />}></Route>
                          <Route exact path='/request-payment/' element={<RequestMoneyForm open={open} />}></Route>
                          <Route exact path='/exchange-currency/' element={<ExchangeMoneyForm open={open} />}></Route>
                          <Route exact path='/payout-payment/' element={<WithdrawalMoneyForm open={open} />}></Route>
                          <Route exact path='/withdrawal-history/' element={<WithdrawalList open={open} />}></Route>
                          <Route exact path='/withdrawal-settings/' element={<WithdrawalSettings open={open} />}></Route>
                          <Route exact path='/tickets/' element={<Ticket open={open} />}></Route>
                          <Route exact path='/tickets/add/' element={<AddTicket open={open} />}></Route>
                          <Route exact path='/tickets/reply/' element={<TicketReply open={open} />}></Route>
                          <Route exact path='/dispute/' element={<Dispute open={open} />}></Route>
                          <Route exact path='/dispute/reply/' element={<DisputeReply open={open} />}></Route>
                          <Route exact path='/profile/' element={<Profile open={open} />}></Route>
                      </Routes>
                    </Box>
                  }></Route>
                </Routes>
            ),
          },
        ],
      },
    ];
  

    const routesForNotAuthenticatedOnly = [
      {
        path: "/signup/",
        element: <Register />,
      },
      {
        path: "/signin/",
        element: <Login />,
      },
      {
        path: "/signout/",
        element: <UserLogout />,
      },
      {
        path: "/forgot-password/",
        element: <ForgotPassword />,
      },
      {
        path: "/kyc/",
        element: <KYCForm />,
      },
      {
        path: "/kyc-submission-report/",
        element: <KYCSubmissionReport />,
      },
      {
        path: "/payment-info/",
        element: <PaymentInformation />,
      },
      {
        path: "/payment-form/",
        element: <StepWisePaymentForm />,
      },
    ];
  
    
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
    
    return <RouterProvider router={router} />;
  
  };



export default AuthRoutes;