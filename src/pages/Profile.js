import GAButton from "../components/Button";
import GACard from "../components/Card";
import { useState, useEffect } from "react";
import $ from 'jquery'
import Alumni from "../SampleAlumni";
import DesktopNav from "../components/DesktopNav";
import { useParams } from "react-router-dom";
import { useAppState } from "../AppState";


const Profile = (props) => {

    const {state, dispatch} = useAppState()
    const targetId = parseInt(props.match.params.id);
    // const targetId = parseInt(useParams().id)

    const [profile, setProfile] = useState(null)

    const getProfile = async () => {
        // const newProfile = Alumni.find(alumnus => alumnus.id===targetId);
        const alumni = await (await fetch(state.url + "/users")).json()
        const newProfile = await alumni.find(alumnus => alumnus.id === targetId)
        console.log(newProfile);
        setProfile(newProfile)
    }

    //need to do the thing that sets the initial state one time

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

    const loadingResults = () => {
        return <h3>Loading...</h3>
    }

    // useEffect(() => {setProfile(profile)}, [])
    useEffect(() => {setProfile(getProfile)}, [])


    console.log(profile)

    const loadedResults = () => {
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
                {profile.bio ? <div className="profile-blurb">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor eu. Aenean euismod elementum nisi quis eleifend quam adipiscing. Vulputate mi sit amet mauris commodo quis imperdiet. Mattis molestie a iaculis at erat pellentesque adipiscing. Tristique et egestas quis ipsum suspendisse. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Eget est lorem ipsum dolor sit amet consectetur. Habitant morbi tristique senectus et netus. Leo a diam sollicitudin tempor id eu nisl nunc.</div> : null}
                
                <div className="gray-background">
                    <GACard title="Resume" lastUpdated="DATE" />
                    <GACard title="Portfolio" lastUpdated="DATE" />
                </div>
                <div className="message-modal App-header">
                    <form  onSubmit={handleSubmit}className="message-box" id="message-box">
                        <h3 style={{margin: "0 auto 5px auto"}}>Send Message to {profile.firstname}</h3>
                        <div className="close-modal" onClick={closeOpenModal}>&#10005;</div>
                        <input style={{"fontWeight": "bold"}} onChange={handleChange} name="subject" type="text" value={message.subject} placeholder="Subject" className="fixed-width-input" />
                        <textarea onChange={handleChange} name="message" type="text" value={message.message} placeholder="Enter your message here..." className="fixed-width-input fixed-height-input" />
                        <input className="button" type="submit" value="Send Message" />
                    </form>
                </div>
            </div>
        )
    }

    return (
        profile ? loadedResults() : loadingResults()
    )
}

export default Profile;