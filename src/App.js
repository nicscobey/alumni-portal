import './App.css';

//import pages
import Profile from './pages/Profile';
import Button from './components/Button';
import Card from './components/Card';
import Home from './pages/Home'
import Login from './pages/Login';
import AppTracker from './pages/AppTracker'
import {Switch, Route} from 'react-router-dom'
import JobBoard from './pages/JobBoard';
import AlumniDatabase from './pages/AlumniDatabase';
import Forum from './pages/Forum';
import CreateAccount from './pages/CreateAccount';
import ForumPost from './pages/ForumPost'

function App() {

//SCHEMA FOR MESSAGE
// sender: "String"
// recipient: "String"
// message: "String"
// timestamp: ????



  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/my/home">
          <Home />
        </Route>
        <Route path="/my/alumni/:id" render={(rp) => (
          <Profile {...rp}/>
        )} />
        {/* </Route> */}
        <Route path="/my/apptracker">
          <AppTracker />
        </Route>
        <Route path="/my/job-board">
          <JobBoard />
        </Route>
        <Route exact path="/my/alumni">
          <AlumniDatabase />
        </Route>
        <Route exact path="/my/forum">
          <Forum />
        </Route>
        <Route exact path="/my/forum/:id">
          <ForumPost />
        </Route>
        <Route path="/create-account" render={(rp) => (
          <CreateAccount {...rp} />
        )} />
          {/* <Route path="/create-account" >
            <CreateAccount />
          </Route> */}
      </Switch>
    </div>
  );
}

export default App;
