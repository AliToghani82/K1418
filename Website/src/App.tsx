import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import './style.css'
import Home from './home'
import Account from './account'
import { Ranking } from './Ranking'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Account} path="/account" />
        <Route Component={Ranking} path="/Ranking" />
        <Route Component={Home} path="**" />
      </Routes>
    </Router>
  )
}
export default App;