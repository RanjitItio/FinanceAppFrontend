import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./protectedroutes";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import UserLogout from "../Authentication/Logout";
import KYCForm from "../Authentication/KYCForm";
import KYCSubmissionReport from "../Authentication/KYCSubmission";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Dispute from "../Dispute/dispute";
import DisputeReply from "../Dispute/disputereply";
import Profile from "../Profile/profile";
import CryptoList from "../CryptoExchange/cryptoexchangelist";
import Plan from "../Invesment/Plan";
import Invest from "../Invesment/Invest";
import CryptoSwap from "../CryptoTransactions/CryptoSwap";
import ResetPassword from "../Authentication/ResetPassword";
import PaymentStepper from "../Payment/payment";
import Merchants from "../Merchant/merchants";
import AddNewMerchant from "../Merchant/add_merchant";
import EditMerchant from "../Merchant/EditMerchant";
import PaymentForm from "../MerchantPayment/paymentCheckout";
import MerchantPayments from "../MerchantPayment/payments";
import PaymoneyCheckout from "../MerchantPayment/paymoneyChekout";
import OtherPaymentCheckoutForm from "../MerchantPayment/OtherCheckout";
import PaymentFailure from "../MerchantPayment/paymentFailure";
import PaymentSuccess from "../MerchantPayment/paymentSuccess";
import TransactionTable from "../transaction_table";
import AddMerchantBankAccount from "../Merchant/Bank/AddBankaccount";
import MerchantBankAccounts from "../Merchant/Bank/BankAccounts";
import UpdateMerchantBankAccount from "../Merchant/Bank/updateBank";





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
                    <Route exact path='/reset-password/:id' element={<ResetPassword />}></Route>
                    <Route exact path='/kyc/' element={<KYCForm />}></Route>
                    <Route exact path='/kyc-submission-report/' element={<KYCSubmissionReport />}></Route>
                    <Route exact path='/payment/' element={<PaymentStepper />}></Route>
                    <Route exact path='/payment/form/' element={<PaymentForm />}></Route>
                    <Route exact path='/paymoney/checkout/form/' element={<PaymoneyCheckout />}></Route>
                    <Route exact path='/other/checkout/form/' element={<OtherPaymentCheckoutForm />}></Route>
                    <Route exact path='/payment/form/success/' element={<PaymentSuccess />}></Route>
                    <Route exact path='/payment/form/fail/' element={<PaymentFailure />}></Route>
                    


                  <Route exact path='*' element={
                    <Box sx={{ display: 'flex' }}>
                    <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
                    <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

                      <Routes>
                          <Route exact path='/test/transaction/table/' element={<TransactionTable open={open} />}></Route>
                          <Route exact path='/' element={<CryptoFiat open={open} />}></Route>
                          <Route exact path='/transactions/' element={<AllTransactions open={open} />}></Route>
                          <Route exact path='/deposit/' element={<DepositForm open={open} />}></Route>
                          <Route exact path='/moneytransfer/' element={<StepWisePaymentForm open={open} />}></Route>
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
                          <Route exact path='/crypto-list/' element={<CryptoList open={open} />}></Route>
                          <Route exact path='/investment/plan/' element={<Plan open={open} />}></Route>
                          <Route exact path='/investment/invest/' element={<Invest open={open} />}></Route>
                          <Route exact path='/crypto-swap/' element={<CryptoSwap open={open} />}></Route>
                          <Route exact path='/merchants/' element={<Merchants open={open} />}></Route>
                          <Route exact path='/add/merchants/' element={<AddNewMerchant open={open} />}></Route>
                          <Route exact path='/edit/merchant/' element={<EditMerchant open={open} />}></Route>
                          <Route exact path='/merchant/payments/' element={<MerchantPayments open={open} />}></Route>
                          <Route exact path='/add/merchant/bank/account/' element={<AddMerchantBankAccount open={open} />}></Route>
                          <Route exact path='/merchant/bank/accounts/' element={<MerchantBankAccounts open={open} />}></Route>
                          <Route exact path='/update/merchant/bank/accounts/' element={<UpdateMerchantBankAccount open={open} />}></Route>
  
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
        path: "/reset-password/",
        element: <ResetPassword />,
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
        path: "/payment/form/",
        element: <PaymentForm />,
      },
      {
        path: "/paymoney/checkout/form/",
        element: <PaymoneyCheckout />,
      },
      {
        path: "/other/checkout/form/",
        element: <OtherPaymentCheckoutForm />,
      },
      {
        path: "/payment/form/success/",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/form/fail/",
        element: <PaymentFailure />,
      },
      // {
      //   path: "/payment-form/",
      //   element: <StepWisePaymentForm />,
      // },
    ];
  
    
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
    
    return <RouterProvider router={router} />;
  
  };



export default AuthRoutes;