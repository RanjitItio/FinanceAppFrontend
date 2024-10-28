import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./protectedroutes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import AllTransactions from "../Transactions/Transaction";
import DepositForm from "../Transactions/Deposit";
// import CryptoBuy from "../CryptoTransactions/CryptoBuy";
// import CryptoSell from "../CryptoTransactions/CryptoSell";
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
import CryptoList from "../CryptoExchange/cryptoexchangelist";
import Plan from "../Invesment/Plan";
import Invest from "../Invesment/Invest";
// import CryptoSwap from "../CryptoTransactions/CryptoSwap";
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
import DeveloperDocs from "../Developer/devdocs";
import DevIntroDoc from "../Developer/intro";
import CircularProgress from '@mui/joy/CircularProgress';
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery, createTheme } from '@mui/material';



const CryptoFiatHomePage     = React.lazy(()=> import('../CryptoFIATHome/Dashboard'));
const UserProfile            = React.lazy(()=> import('../Profile/profile'));
const ChangePassword         = React.lazy(()=> import('../Authentication/ChangePassword'));
const UserCryptoTransactions = React.lazy(()=> import('../CryptoTransactions/Transactions'));
const UserCryptoWallets      = React.lazy(()=> import('../CryptoWallet/Walltes'));
const CryptoBuy              = React.lazy(()=> import('../CryptoTransactions/BuyCrypto'));
const CryptoSell             = React.lazy(()=> import('../CryptoTransactions/SellCrypto'));
const CryptoSwap             = React.lazy(()=> import('../CryptoTransactions/CryptoSwap'));
const CryptoExchange         = React.lazy(()=> import('../CryptoTransactions/CryptoExchange'));
const ExchangesList          = React.lazy(()=> import('../Exchange/ExchangeList'));
const AdminLogin             = React.lazy(()=> import('../Authentication/AdminLogin'));


// All Routes
const AuthRoutes = () => {
    const theme           = createTheme(); 
    const isSmOrBelow     = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(!isSmOrBelow); // Close and open Leftbar

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { token } = useAuth();
  
    
    const routesForPublic = [
      {
        path: "/kyc/",
        element: <KYCForm />,
      },
      {
        path: "/kyc-submission-report/",
        element: <KYCSubmissionReport />,
      },
      {
        path: "/admin/user/login/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
              <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: "/reset/password/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
              <ResetPassword />
          </Suspense>
        ),
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
              <Suspense fallback={<CircularProgress />}>
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
                    <Route exact path='/dev/docs/intro/' element={<DevIntroDoc />}></Route>


                  <Route exact path='*' element={
                    <Box sx={{display: {xs: 'block', sm:'block', md:'block', lg:'flex'}}}>
                      <CssBaseline />
                      <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
                      <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

                      <Routes>
                          <Route exact path='/' element={<CryptoFiatHomePage open={open} />}></Route>

                          <Route exact path='/change/password/' element={<ChangePassword open={open} />}></Route>

                          <Route exact path='/test/transaction/table/' element={<TransactionTable open={open} />}></Route>
                          <Route exact path='/transactions/' element={<AllTransactions open={open} />}></Route>
                          <Route exact path='/deposit/' element={<DepositForm open={open} />}></Route>
                          <Route exact path='/moneytransfer/' element={<StepWisePaymentForm open={open} />}></Route>
                          <Route exact path='/request-payment/' element={<RequestMoneyForm open={open} />}></Route>
                          <Route exact path='/exchange-currency/' element={<ExchangeMoneyForm open={open} />}></Route>
                          <Route exact path='/exchange/list/' element={<ExchangesList open={open} />}></Route>
                          <Route exact path='/payout-payment/' element={<WithdrawalMoneyForm open={open} />}></Route>
                          <Route exact path='/withdrawal-history/' element={<WithdrawalList open={open} />}></Route>
                          <Route exact path='/withdrawal-settings/' element={<WithdrawalSettings open={open} />}></Route>
                          <Route exact path='/tickets/' element={<Ticket open={open} />}></Route>
                          <Route exact path='/tickets/add/' element={<AddTicket open={open} />}></Route>
                          <Route exact path='/tickets/reply/' element={<TicketReply open={open} />}></Route>
                          <Route exact path='/dispute/' element={<Dispute open={open} />}></Route>
                          <Route exact path='/dispute/reply/' element={<DisputeReply open={open} />}></Route>
                          <Route exact path='/profile/' element={<UserProfile open={open} />}></Route>
                          <Route exact path='/investment/plan/' element={<Plan open={open} />}></Route>
                          <Route exact path='/investment/invest/' element={<Invest open={open} />}></Route>
                          <Route exact path='/merchants/' element={<Merchants open={open} />}></Route>
                          <Route exact path='/add/merchants/' element={<AddNewMerchant open={open} />}></Route>
                          <Route exact path='/edit/merchant/' element={<EditMerchant open={open} />}></Route>
                          <Route exact path='/merchant/payments/' element={<MerchantPayments open={open} />}></Route>
                          <Route exact path='/add/merchant/bank/account/' element={<AddMerchantBankAccount open={open} />}></Route>
                          <Route exact path='/merchant/bank/accounts/' element={<MerchantBankAccounts open={open} />}></Route>
                          <Route exact path='/update/merchant/bank/accounts/' element={<UpdateMerchantBankAccount open={open} />}></Route>

                          {/* Crypto Section */}
                          <Route exact path='/crypto/transactions/' element={<UserCryptoTransactions open={open} />}></Route>
                          <Route exact path='/crypto-list/' element={<CryptoList open={open} />}></Route>
                          <Route exact path='/crypto/wallets/' element={<UserCryptoWallets open={open} />}></Route>
                          <Route exact path='/crypto/buy/' element={<CryptoBuy open={open} />}></Route>
                          <Route exact path='/crypto/sell/' element={<CryptoSell open={open} />}></Route>
                          <Route exact path='/crypto/swap/' element={<CryptoSwap open={open} />}></Route>
                          <Route exact path='/crypto/exchange/' element={<CryptoExchange open={open} />}></Route>

                      </Routes>
                    </Box>
                  }></Route>
                </Routes>
              </Suspense>
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
        path: "/reset/password/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
              <ResetPassword />
          </Suspense>
        ),
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
      {
        path: "/dev/docs/",
        element: <DeveloperDocs />,
      },
      {
        path: "/dev/docs/intro/",
        element: <DevIntroDoc />,
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