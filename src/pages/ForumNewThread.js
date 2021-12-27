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
import { Stack } from "@mui/material";
import ForumCloseModal from "../components/ForumCloseModal";


const JobBoard = (props) => {

    const [value, setValue] = useState('')
    const [showNewReply, setShowNewReply] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    // const toggleNewReply = () => {
    //     setShowNewReply(!showNewReply)
    //     console.log(showNewReply)
    // }

    const NewThread = () => {
        return (
            <div className="flex-center-column">
                <ForumNewReply  handleChange={handleChange}/>
                <Stack direction="row" spacing={2}>
                    <GAButton>Post</GAButton>

                    <GAButton onClick={handleOpen}>Cancel</GAButton>
                </Stack>
                
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
                {/* <h1>{value}</h1> */}
                {/* <div>{draftToHtml(value)}</div> */}
            </div>
        )
    }

    return (
        <div className="">
            <DesktopNav />
            <h2>Thread: is it possible to get the idea already? probably not, since it's not saved. {props._id}</h2>
            <h2>New Thread</h2>
            <h2>Set a title</h2>
            {/* <div className="flex-center-column">
                <ForumReply />
                <ForumReply />
            </div> */}
            <NewThread/>
            {/* <div className="flex-center-column">
                <ForumNewReply handleChange={handleChange}/>
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
            </div> */}
            {open ? <ForumCloseModal open={open} handleOpen={handleOpen} handleClose={handleClose}/> : null }
        </div>
    )
}

export default JobBoard;