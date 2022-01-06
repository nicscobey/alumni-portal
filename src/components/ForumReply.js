import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DOMPurify from "dompurify";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useAppState } from '../AppState'; 
import { useState } from 'react'; 
import ForumNewReply from './ForumNewReply';
import { convertFromRaw, convertFromHTML, convertToRaw } from 'draft-js';
import GAButton from '../components/Button'
import draftToHtml from 'draftjs-to-html';



export default function ForumReply(props) {

    const {state} = useAppState()
    const [editOn, setEditOn] = useState(false)
    const [value, setValue] = useState('')
    const [newForumreply, setNewForumreply] = useState({
        message: ""
    })

    const convertText = (str) => {
        const myHTML = str;
        const mySafeHTML = DOMPurify.sanitize(myHTML);
        return mySafeHTML
    }

    const convertToDate = (ms) => {
        const dateObj = new Date(ms)  
        let hour
    
        if (dateObj.getHours() === 0) {
            hour = 12;
        }
        else if (dateObj.getHours() >= 12) {
            hour = dateObj.getHours() - 12
        }
        else {
            hour = dateObj.getHours()
        }
  
        return `${dateObj.getMonth()+1}-${dateObj.getDate()}-${dateObj.getFullYear()} at ${hour}:${dateObj.getMinutes()>9 ? dateObj.getMinutes() : "0" + dateObj.getMinutes()} ${dateObj.getHours() >= 12 ? "pm" : "am"}`
    }

    const deleteReply = async () => {
        await props.deleteReply(props.reply_id)
        await props.getReplies()
    }

    const toggleEditReply = () => {
        setEditOn(!editOn)
    }

    const editReply = async () => {
        await props.editReply(props.reply_id, newForumreply.message)
        await props.getReplies()
        toggleEditReply()
    }

    const Editor = () => {
        const handleChangeReply = event => {
            const plainText = event.getCurrentContent().getPlainText() // for plain text
            const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
            setValue(draftToHtml(rteContent))
            setNewForumreply({...newForumreply, message: draftToHtml(rteContent)})
        }

        return (
            <>
                <ForumNewReply myWidth={625} handleChange={handleChangeReply} />
                <Stack direction="row" spacing={2} sx={{marginBottom: 2}} justifyContent="center">
                    <GAButton onClick={editReply}>Update</GAButton>
                    <GAButton onClick={toggleEditReply}>Cancel</GAButton>
                </Stack>
            </>
        )
    }

return (
    <Card sx={{ width: 900, margin: "10px" }}>
        {/* <CardContent sx={{ padding: 0, margin: 0 }}> */}
            <div className="reply-top">
                <div className="reply-top-left">#{props.replyIndex + 1}</div>
                {/* <div className="reply-top-right"><DeleteIcon fontSize="small"/></div> */}
            </div>
            <div className="reply-bottom">
                <div className="reply-bottom-left">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>{props.firstname} {props.lastname}</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {convertToDate(props.posted)}
                    </Typography>
                </div>
                <div className="reply-bottom-right">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom dangerouslySetInnerHTML={{ __html: convertText(props.message) }}>

                    </Typography>
                    {state.user_id === props.user_id && !editOn ? <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <div className="edit-delete-reply">
                            <IconButton onClick={toggleEditReply} ><EditIcon/></IconButton>
                            <IconButton onClick={deleteReply}><DeleteIcon /></IconButton>
                        </div>
                    </Typography> : null}
                    {
                        editOn ? Editor() : null
                    }
                </div>
            </div>
    </Card>
);
}