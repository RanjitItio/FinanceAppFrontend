import Wallet from './components/Wallet';
import AuthProvider from './components/ProtectedRoute/authProvider';
import AuthRoutes from './components/ProtectedRoute/routes';
// import { refreshAccessToken } from './components/Authentication/axios';
import { useEffect } from 'react';
<<<<<<< HEAD
=======

>>>>>>> 4ba5639aa290050e6481484fa688fd8821bac65f




function App() {

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//         refreshAccessToken();
//     }, 5  * 1000); // 2 seconds

    
//     return () => clearInterval(intervalId);
// }, []);

  return (
     
      <AuthProvider>
          <AuthRoutes />
      </AuthProvider>

  );
};


export default App








// <div>

        // <Router>
        //   <Routes> 
        //     <Route exact path='/signup/' element={<Register />}></Route>
        //     <Route exact path='/signin/' element={<Login />}></Route>
        //     <Route exact path='/signout/' element={<UserLogout />}></Route>
        //     <Route exact path='/forgot-password/' element={<ForgotPassword />}></Route>
        //     <Route exact path='/kyc/' element={<KYCForm />}></Route>
        //     <Route exact path='/kyc-submission-report/' element={<KYCSubmissionReport />}></Route>
        //     <Route exact path='/payment-info/' element={<PaymentInformation />}></Route>
        //     <Route exact path='/payment-form/' element={<StepWisePaymentForm />}></Route> 

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

            {/* <Route exact path='*' element={
              <>
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
                      <Route exact path='/crypto-swap/' element={<CryptoSwap open={open} />}></Route>
                      <Route exact path='/request-payment/' element={<RequestMoneyForm open={open} />}></Route>
                      <Route exact path='/exchange-currency/' element={<ExchangeMoneyForm open={open} />}></Route>
<<<<<<< HEAD
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
=======
                      <Route exact path='/payout-payment/' element={<WithdrawalMoneyForm open={open} />}></Route>
                      <Route exact path='/withdrawal-history/' element={<WithdrawalList open={open} />}></Route>
                      <Route exact path='/withdrawal-settings/' element={<WithdrawalSettings open={open} />}></Route>
                      <Route exact path='/tickets/' element={<Ticket open={open} />}></Route>
                      <Route exact path='/tickets/add/' element={<AddTicket open={open} />}></Route>
                      <Route exact path='/tickets/reply/' element={<TicketReply open={open} />}></Route>
>>>>>>> 918fc62507cf25ce32ef439a27a76d9b65a16e84
                    </Routes>
                </Box>
              </>
            }>
            </Route>  */}
      //     </Routes>
      //   </Router>
        
      // </div>
