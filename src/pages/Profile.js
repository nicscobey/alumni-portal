import GAButton from "../components/Button";
import GACard from "../components/Card";
import { useState, useEffect } from "react";
import $ from 'jquery'
import Alumni from "../SampleAlumni";
import DesktopNav from "../components/DesktopNav";
import { useParams } from "react-router-dom";
import { useAppState } from "../AppState";
import LoadingIcon from '../components/LoadingIcon'
// import GAButton from '../components/Button'
import { TextField } from "@mui/material";


const Profile = (props) => {

    const {state, dispatch} = useAppState()
    const {token, url } = state;
    const targetId = parseInt(props.match.params.id);
    const [profile, setProfile] = useState(null)

    const getProfile = async () => {
        const alumni = await (await fetch(state.url + "/users", {
            method: "get",
            headers: {
                Authorization: "bearer " + token,
            }
        })).json()
        const newProfile = await alumni.find(alumnus => alumnus.id === targetId)
        setProfile(newProfile)
    }

    const [message, setMessage] = useState({
        subject: "",
        message: ""
    });

    const handleChange = (event)=> {
        setMessage({...message, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('message sent!');
        setMessage({
            subject: "",
            message: ""
        })
        closeOpenModal();
    }

    const closeOpenModal = () => {
        $(".message-modal").toggle();
    }

    // useEffect(() => {setProfile(profile)}, [])
    useEffect(() => {setProfile(getProfile)}, [])

    const loadedResults = () => {

        // const bio = () => {
        //     if (state.user_id === targetId) {
        //         console.log('this is your profile!')
        //     }
        //     else {
        //         console.log('not your profile :(')
        //     }
        // }

        // bio()

        return (
            <div className="alumni-profile">
                <DesktopNav />
                <div className="profile-header">
                    <img className="profile-photo" src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_624206636_200013332000928034_376810.jpg" alt="profile"></img>
                    <div className="profile-header-text">
                        {profile.firstname} {profile.lastname}
                    </div>
                </div>
                <GAButton className="message-button" onClick={closeOpenModal}>Message</GAButton>
                {profile.bio ? <div className="profile-blurb">{profile.bio}</div> : null}
                
                <div className="gray-background">
                    <GACard title="Resume" lastUpdated="DATE" />
                    <GACard title="Portfolio" lastUpdated="DATE" />
                </div>
                <div className="message-modal App-header">
                    <form  onSubmit={handleSubmit}className="message-box" id="message-box">
                        <h3 style={{margin: "0 auto 5px auto"}}>Send Message to {profile.firstname}</h3>
                        <div className="close-modal" onClick={closeOpenModal}>&#10005;</div>
                        <TextField style={{"fontWeight": "bold", margin: 20}} onChange={handleChange} name="subject" label="Subject" type="text" value={message.subject} placeholder="Subject" className="fixed-width-input" />
                        <TextField multiline sx={{height: "300px"}} onChange={handleChange} label="Message" name="message" type="text" value={message.message} placeholder="Enter your message here..." className="fixed-width-input fixed-height-input" />
                        <GAButton>Send</GAButton>
                    </form>
                </div>
            </div>
        )
    }

    return (
        profile ? loadedResults() : <LoadingIcon />
    )
}

export default Profile;