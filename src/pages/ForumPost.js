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

// NOW I NEED TO MODIFY THE BUTTONS THAT SHOW UP SO IT'S ONLY THE BUTTONS THAT WE NEED

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

    // const targetId = parseInt(props.match.params.id);


    const handleChange = event => {
        const plainText = event.getCurrentContent().getPlainText() // for plain text
        const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
        // setValue(JSON.stringify(rteContent)) // store your rteContent to state
        console.log(event.getCurrentContent())
        console.log(rteContent)
        console.log(plainText)
        // console.log(plainText)
        setValue(draftToHtml(rteContent))
        // setValue(rteContent)
        // setValue(plainText)
    }

    const convertText = (str) => {
        const myHTML = str;
        const mySafeHTML = DOMPurify.sanitize(myHTML);
        return mySafeHTML
    }

    const toggleNewReply = () => {
        setShowNewReply(!showNewReply)
        setOpen(false)
        console.log(showNewReply)
    }

    const getReplies = async () => {
        // console.log(token)
        // console.log(state)
        const response = await fetch(url + "/replies", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const data = await response.json()
        // console.log(response)
        // console.log(data)

        const filteredReplies = data.filter(reply => reply.forum_id === forumId)

        console.log(filteredReplies)
        // return data

        setReplies(filteredReplies)


        const forumTitleResponse = await fetch(url + "/forums", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const  titleData = await forumTitleResponse.json()
        // console.log(titleData)
        const myTitle = titleData.find(forum => forum.id === forumId)
        setTitle(myTitle.title)
        console.log('hi, ducky')

        // return (
        //     <>
        //         <h1>Got the data!</h1>
        //     </>
        // )
    }
    // useEffect(() => setReplies(getReplies), [])


    const saveReply = async () => {
        await saveForumreply(value, forumId)
        await getReplies()
        setShowNewReply(false)
        setValue('')
    }

    const NewReply = () => {
        return (
            <div className="flex-center-column" id="new-reply">
                <ForumNewReply  myWidth={900} toggleNewReply={toggleNewReply} handleChange={handleChange}/>
                <Stack direction="row" spacing={2}>
                    <GAButton onClick={saveReply}>Reply</GAButton>

                    <GAButton onClick={handleOpen}>Cancel</GAButton>
                </Stack>
                
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
                {/* <h1>{value}</h1> */}
                {/* <div>{draftToHtml(value)}</div> */}
            </div>
        )
    }

    useEffect(() => getReplies(), [])

    const mapReplies = () => {
        // return (
        // console.log('ready to map!')
        // console.log(replies)
        // return "hi"

        return replies.map((reply, index) => {
            // console.log(index)
            return <ForumReply key={reply.id} replyIndex={index} message={reply.message} user_id={reply.user_id} posted={reply.created_at} firstname={reply.firstname} lastname={reply.lastname} deleteReply={props.deleteReply} editReply={props.editReply} getReplies={getReplies} reply_id={reply.id}/>
        })

            console.log(replies)

            
        // )
    }

    const log = () => {
        console.log(replies)
        console.log('hi')
        console.log(state)
    }

    return (
        <div className="">
            <DesktopNav />
            {/* <button onClick={log}>Click</button> */}
            {/* <button onClick={log}>Click me!</button> */}
            <div className="thread-header">
                <h3>{title ? title : null}</h3>
                {showNewReply ? null : <GAButton onClick={toggleNewReply} id="open-new-reply-button" href="#new-reply">Reply to this Forum</GAButton>}

            </div>
            <div className="flex-center-column">
                {/* <ForumReply />
                <ForumReply /> */}
                { replies ? mapReplies() : <h1>no data yet...</h1>}
            </div>
            {showNewReply ? NewReply() : null}
            {open ? <ForumCloseModal open={open} handleOpen={handleOpen} handleClose={handleClose} action={toggleNewReply}/> : null }
            {/* <div className="flex-center-column">
                <ForumNewReply handleChange={handleChange}/>
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
            </div> */}
        </div>
    )
}

export default JobBoard;