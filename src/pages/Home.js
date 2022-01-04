import Button from "../components/Button";
import GACard from "../components/Card";
import {Link, useHistory} from 'react-router-dom'
import DesktopNav from "../components/DesktopNav";
import { useAppState } from "../AppState";
import { useEffect, useState } from "react";
import ForumCloseModal from "../components/ForumCloseModal";
import { TextField } from "@mui/material";

const Profile = () => {

    const {state, url, user_id} = useAppState()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const history = useHistory()

    const [bio, setBio] = useState('')
    let myProfile = null

    const updateBio = (event) => {
        setBio(event.target.value)
        console.log(event)
        console.log(event.target.value)
        console.log(bio)
    }

    console.log(state)
    // console.log(state.user_id)

    // const checkForBio = async () => {
    //     const response = await fetch(url + "/users/" + user_id, {
    //         method: "get",
    //         headers: {
    //             Authorization: "bearer " + token
    //         }
    //     })
    //     const user = 

    // }

    const getProfile = async () => {
        // const newProfile = Alumni.find(alumnus => alumnus.id===targetId);
        console.log(state)
        console.log(state.token)
        const alumni = await (await fetch(state.url + "/users", {
            method: "get",
            headers: {
                Authorization: "bearer " + state.token,
            }
        })).json()
        console.log(alumni)
        myProfile = await alumni.find(alumnus => alumnus.id === state.user_id)
        console.log(myProfile);
        if (myProfile.bio == null) {
            console.log('please update your bio!')
            setOpen(true)
        }
    }

    useEffect(() => {getProfile()}, [])

    // const redirect = () => {
    //     history.push(`/my/alumni/${state.user_id}`)
    // }

    const addBio = () => {
        return (
            <>
                <TextField label="Brief Bio" onChange={updateBio} value={bio} sx={{width: 400, marginBottom: 3}}></TextField>
            </>
        )
    }

    const saveBio = async () => {
        const response = await fetch(state.url + "/users/" + state.user_id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + state.token
            },
            body: JSON.stringify({bio: bio})
        })
        console.log(response)
    }

    return (
        <div className="">
            <DesktopNav />
            <h2>Career Center</h2>
                <GACard bgcolor="#F6F6F6" title="Application Tracker" description="Description of what this is. Description of what this is. Description of what this is. " path="/my/apptracker"/>
                <GACard bgcolor="#F6F6F6" title="Alumni Job Board" lastUpdated="DATE"  path="/my/job-board"/>
            <h2>Alumni & Community</h2>
                <GACard bgcolor="#F6F6F6" title="Alumni Database" description="Description of what this is. Description of what this is. Description of what this is. "  path="/my/alumni"/>
                <GACard bgcolor="#F6F6F6" title="Community Forum" lastUpdated="DATE"  path="/my/forum"/>
            {/* {open ? <ForumCloseModal open={open} handleOpen={handleOpen} handleClose={handleClose} action={saveBio} message={"It looks like your profile is incomplete. Please enter a bio below."} buttonA={"Cancel"} buttonB={"Save"} addBio={addBio} /> : null} */}
        </div>
    )
}

export default Profile;