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

// NOW I NEED TO MODIFY THE BUTTONS THAT SHOW UP SO IT'S ONLY THE BUTTONS THAT WE NEED

const JobBoard = (props) => {

    const [value, setValue] = useState('')
    const [showNewReply, setShowNewReply] = useState(false)

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
        console.log(showNewReply)
    }

    const NewReply = () => {
        return (
            <div className="flex-center-column">
                <ForumNewReply toggleNewReply={toggleNewReply} handleChange={handleChange}/>
                <Stack direction="row" spacing={2}>
                    <GAButton>Reply</GAButton>

                    <GAButton onClick={toggleNewReply}>Cancel</GAButton>
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
            <h2>Thread: {props._id}</h2>
            {showNewReply ? null : <GAButton onClick={toggleNewReply}>Reply to this Forum</GAButton>}
            <div className="flex-center-column">
                <ForumReply />
                <ForumReply />
            </div>
            {showNewReply ? NewReply() : null}
            {/* <div className="flex-center-column">
                <ForumNewReply handleChange={handleChange}/>
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
            </div> */}
        </div>
    )
}

export default JobBoard;