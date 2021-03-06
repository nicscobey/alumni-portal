import './App.css';

//import pages
import Profile from './pages/Profile';
import Button from './components/Button';
import Card from './components/Card';
import Home from './pages/Home'
import Login from './pages/Login';
import AppTracker from './pages/AppTracker'
import {Switch, Route, useHistory} from 'react-router-dom'
import JobBoard from './pages/JobBoard';
import AlumniDatabase from './pages/AlumniDatabase';
import Forum from './pages/Forum';
import CreateAccount from './pages/CreateAccount';
import ForumPost from './pages/ForumPost'
import ForumNewThread from './pages/ForumNewThread'
import Auth from './pages/Auth'
import {useAppState} from './AppState.jsx'
import { useState } from 'react';

function App() {

//SCHEMA FOR MESSAGE
// sender: "String"
// recipient: "String"
// message: "String"
// timestamp: ????

  const history = useHistory()
  const {state, dispatch} = useAppState()

    const {token, url} = state

    const getProfile = async (targetId) => {
      // const newProfile = Alumni.find(alumnus => alumnus.id===targetId);
      const alumni = await (await fetch(state.url + "/users/" + targetId, {
          method: "get",
          headers: {
              Authorization: "bearer " + token,
          }
      })).json()
      // return await alumni.find(alumnus => alumnus.id === targetId)
      console.log(alumni)
      return alumni
      // console.log(newProfile);
  }

    const saveForumreply = async (message, forum_id) => {
        // console.log(newForumreply)

        // console.log(url)
        // console.log(url + "/replies")
        // console.log(token)
        console.log(state)

        //Create first message as the first forumreply
        await fetch(url + "/replies", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            // body: JSON.stringify(newForumreply)
            body: JSON.stringify({message: message, forum_id: forum_id, user_id: state.user_id, firstname: state.first_name, lastname: state.last_name})
        })
        console.log({message: message, forum_id: forum_id, user_id: state.user_id, firstname: state.first_name, lastname: state.last_name})

        // console.log({message: newForumreply.message, forum_id: forum.id, user_id: 4})
        // console.log(state)
        // console.log(newForumreply)
    }

    const deleteReply = async (replyId) => {
      console.log(replyId)
      await fetch(state.url + "/replies/" + replyId, {
        method: "delete",
        headers: {
          Authorization: "bearer " + token,
        }
      })
    }

    const editReply = async (replyId, message) => {
      await fetch(state.url + "/replies/" + replyId, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify({message: message})
        // body: JSON.stringify({message: message, forum_id: forum_id, user_id: state.user_id, firstname: state.first_name, lastname: state.last_name})
      })
    }


  useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"))

    if (auth) {
      console.log(auth)
      dispatch({type: "auth", payload: auth})
      console.log(state)
      history.push("/my/home")
    } else {
      // history.push("/auth/login")
      history.push("/")
    }
  }, [])
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup" render={(rp) => (
          <CreateAccount {...rp} />
        )} />
        {/* <Route path="/auth/:form">
          <Auth />
        </Route> */}
        <Route path="/my/home">
          <Home />
        </Route>
        <Route path="/my/alumni/:id" render={(rp) => (
          <Profile {...rp } getProfile={getProfile}/>
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
        <Route exact path="/my/forum/new">
          <ForumNewThread saveForumreply={saveForumreply}/>
        </Route>
        <Route path="/my/forum/:id">
          <ForumPost saveForumreply={saveForumreply} deleteReply={deleteReply} editReply={editReply}/>
        </Route>
          {/* <Route path="/create-account" >
            <CreateAccount />
          </Route> */}
      </Switch>
    </div>
  );
}

export default App;
