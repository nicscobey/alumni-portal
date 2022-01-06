import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";
import ForumReply from "../components/ForumReply";
import Forum from "./Forum";
import GAButton from '../components/Button'
import ForumNewReply from "../components/ForumNewReply";
import { useState } from "react";
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from "dompurify";
import { Stack, TextField } from "@mui/material";
import ForumCloseModal from "../components/ForumCloseModal";
import { useAppState } from "../AppState";
import { useHistory } from "react-router-dom";



const JobBoard = (props) => {

    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {state, dispatch} = useAppState()
    const {token, url} = state
    const history = useHistory()

    const [newForum, setNewForum] = useState({
        title: "",
        user_id: state.user_id, 
        firstname: state.first_name,
        lastname: state.last_name 
    })

    const [newForumreply, setNewForumreply] = useState({
        message: "",
        user_id: state.user_id, 
        forum_id: null
    })

    const handleChange = event => {
        const plainText = event.getCurrentContent().getPlainText() // for plain text
        const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
        setValue(draftToHtml(rteContent))
        setNewForumreply({...newForumreply, message: draftToHtml(rteContent)})
    }

    const updateTitle = (event) => {
        const newState = {...newForum, title: event.target.value}
        setNewForum(newState)
    }

    const saveForumreply = props.saveForumreply

    const handleSubmit = async () => {
        if (newForum.title !== "") {

            //Create new forum
            await fetch(url + "/forums", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token,
                },
                body: JSON.stringify(newForum)
            }).then((response) => response.json())
            .then((forum) => {
                setNewForumreply({...newForumreply, forum_id: forum.id})
                saveForumreply(newForumreply.message, forum.id)
                history.push(`/my/forum/${forum.id}`)
            })
        }
        else {
            alert("Please choose a title")
        }
    }

    const redirect = () => {
        history.push("/my/forum")
      }

    return (
        <div className="">
            <DesktopNav />
            <h2>Create a New Thread</h2>
            <TextField className="fixed-width-input" label="Thread Title" placeholder="Enter a title for your thread..." onChange={updateTitle} value={newForum.title}></TextField>
            <div className="flex-center-column">
                <ForumNewReply myWidth={900} handleChange={handleChange}/>
                <Stack direction="row" spacing={2}>
                    <GAButton onClick={handleSubmit}>Post</GAButton>
                    <GAButton onClick={handleOpen}>Cancel</GAButton>
                </Stack>
            </div>
            {open ? <ForumCloseModal open={open} handleOpen={handleOpen} handleClose={handleClose} action={redirect} message={"Are you sure you wish to cancel this post? This action cannot be undone."} buttonA={"No, keep writing"} buttonB={"Yes, cancel post"} /> : null }
        </div>
    )
}

export default JobBoard;