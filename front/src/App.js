import React from 'react'
import Login from './Components/Login/Login.js'
import HRPanel from './Components/HR Panel/HRPanel.js'
import CreateJob from './Views/Forms/CreateJob.js'
import Candidates from './Views/Contents/Candidates/Candidates.js'
import Dashboard from './Views/Contents/Dashboard.js'
import Education from './Views/Contents/Education.js'
import Feedback from './Views/Contents/Feedback.js'
import Finance from './Views/Contents/Finance.js'
import Insurance from './Views/Contents/Insurance.js'
import Jobs from './Views/Contents/Jobs/Jobs.js'
import Management from './Views/Contents/Management.js'
import LogOut from './Views/LogOut/LogOut.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/hrpanel' component={HRPanel} />
        <Route exact path='/createjob' component={CreateJob} />
        <Route exact path='/candidates' component={Candidates} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/education' component={Education} />
        <Route exact path='/feedback' component={Feedback} />
        <Route exact path='/finance' component={Finance} />
        <Route exact path='/insurance' component={Insurance} />
        <Route exact path='/jobs' component={Jobs} />
        <Route exact path='/management' component={Management} />
        <Route exact path='/logout' component={LogOut} />
      </Switch>
    </Router>
    // <Login> </Login>
    // <HRPanel> </HRPanel>
  )
}
export default App
