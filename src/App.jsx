import PageNavbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Transaction from './components/Transaction'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Statistics from './components/Statitics'
import WelcomeSection from './components/welcome'
import Container from './components/Container'
import Wallet from './components/Wallet'





function App() {

  return (
      <div>
        <Router>
         
            <PageNavbar />
            <WelcomeSection />

          <Container>
            <Routes>
                <Route exact path='/' Component={Dashboard}></Route>
                <Route exact path='/transaction' Component={Transaction}></Route>
                <Route exact path='/statitics' Component={Statistics}></Route>
                <Route exact path='/wallet' Component={Wallet}></Route>
            </Routes>
          </Container>
        </Router>
      </div>
  

  )
}

export default App
