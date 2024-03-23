import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Transaction from './components/Transaction'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Statitics from './components/Statitics'


function App() {

  return (
    <Router>
      <div>
        <Navbar />

      <Routes>
          <Route exact path='/' Component={Dashboard}></Route>
          <Route exact path='/transaction' Component={Transaction}></Route>
          <Route exact path='/statitics' Component={Statitics}></Route>
      </Routes>

      </div>
    </Router>
  

  )
}

export default App
