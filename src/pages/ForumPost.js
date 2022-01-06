import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";
import ForumReply from "../components/ForumReply";
import Forum from "./Forum";
import GAButton from '../components/Button'
import ForumNewReply from "../components/ForumNewReply";
import { useState, useEffect } from "react";
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from "dompurify";
import { Stack } from "@mui/material";
import { useAppState } from "../AppState";
import { useParams } from "react-router-dom";
import ForumCloseModal from '../components/ForumCloseModal'
import LoadingIcon from '../components/LoadingIcon'


const JobBoard = (props) => {

    const [value, setValue] = useState('')
    const [showNewReply, setShowNewReply] = useState(false)
    const {state, dispatch} = useAppState()
    const {token, url} = state
    const [replies, setReplies] = useState(null)
    const forumId = parseInt(useParams().id) 
    const saveForumreply = props.saveForumreply
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState(null)

    const handleChange = event => {
        const plainText = event.getCurrentContent().getPlainText() // for plain text
        const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
        setValue(draftToHtml(rteContent))
    }

    // const convertText = (str) => {
    //     const myHTML = str;
    //     const mySafeHTML = DOMPurify.sanitize(myHTML);
    //     return mySafeHTML
    // }

    const toggleNewReply = () => {
        setShowNewReply(!showNewReply)
        setOpen(false)
    }

    const getReplies = async () => {
        const response = await fetch(url + "/replies", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const data = await response.json()
        const filteredReplies = data.filter(reply => reply.forum_id === forumId)
        setReplies(filteredReplies)
        const forumTitleResponse = await fetch(url + "/forums", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const  titleData = await forumTitleResponse.json()
        const myTitle = titleData.find(forum => forum.id === forumId)
        setTitle(myTitle.title)
    }

    const saveReply = async () => {
        await saveForumreply(value, forumId)
        await getReplies()
        setShowNewReply(false)
        setValue('')
    }

    const NewReply = () => {
        return (
            <div className="flex-center-column" id="new-reply">
                <ForumNewReply myWidth={900} toggleNewReply={toggleNewReply} handleChange={handleChange}/>
                <Stack direction="row" spacing={2} sx={{marginBottom: "10px"}} >
                    <GAButton onClick={saveReply}>Reply</GAButton>

                    <GAButton onClick={handleOpen}>Cancel</GAButton>
                </Stack>
            </div>
        )
    }

    useEffect(() => getReplies(), [])

    const mapReplies = () => {
        return replies.map((reply, index) => {
            return <ForumReply key={reply.id} replyIndex={index} message={reply.message} user_id={reply.user_id} posted={reply.created_at} firstname={reply.firstname} lastname={reply.lastname} deleteReply={props.deleteReply} editReply={props.editReply} getReplies={getReplies} reply_id={reply.id}/>
        })
    }

    return (
        <div className="">
            <DesktopNav />
            <div className="thread-header">
                <h3>{title ? title : null}</h3>
                {showNewReply ? null : <GAButton onClick={toggleNewReply} id="open-new-reply-button" href="#new-reply">Reply to this Forum</GAButton>}
            </div>
            <div className="flex-center-column">
                { replies ? mapReplies() : <><br /><LoadingIcon /></> }
            </div>
            {showNewReply ? NewReply() : null}
            {open ? <ForumCloseModal open={open} handleOpen={handleOpen} handleClose={handleClose} action={toggleNewReply} message={"Are you sure you wish to cancel this reply? This action cannot be undone."} buttonA={"No, keep writing"} buttonB={"Yes, cancel reply"}/> : null }
        </div>
    )
}

export default JobBoard;