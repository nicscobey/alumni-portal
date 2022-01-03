import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DOMPurify from "dompurify";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useAppState } from '../AppState'; 
import { useState } from 'react'; 
import ForumNewReply from './ForumNewReply';
import { convertFromRaw, convertFromHTML, convertToRaw } from 'draft-js';

// const bull = (
// <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
// >
//     •
// </Box>
// );


// replyIndex={index} message={reply.message} user_id={reply.user_id} posted={reply.created_at}
export default function ForumReply(props) {

    const {state} = useAppState()
    // const [editOn, setEditOn] = useState(false)
    // console.log(state)

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
          hour = dateObj.getHours() + 1
      }
  
      // let minutes
  
  
      // if (dateObj.getMinutes() === 0) {
      //     hour = 12;
      // }
      // else if (dateObj.Minutes() >= 12) {
      //     hour = dateObj.Minutes() - 11
      // }
      // else {
      //     hour = dateObj.Minutes() + 1
      // }
  
        return `${dateObj.getMonth()+1}-${dateObj.getDate()}-${dateObj.getFullYear()} at ${hour}:${dateObj.getMinutes()>9 ? dateObj.getMinutes() : "0" + dateObj.getMinutes()} ${dateObj.getHours() >= 12 ? "pm" : "am"}`
    }

    const deleteReply = async () => {
        await props.deleteReply(props.reply_id)
        await props.getReplies()
    }

    // const toggleEditReply = () => {
    //     setEditOn(!editOn)
    // }
    // const editReply = async () => {
    //     console.log('moo')
    //     await props.editReply(props.reply_id, "new message")
    //     await props.getReplies()
    // }

    // const Editor = () => {
    //     console.log(props.message)
    //     // console.log(convertFromHTML(props.message).contentBlocks)
    //     // console.log(convertFromHTML(props.message).contentBlocks[0])
    //     // console.log(convertFromHTML(props.message).contentBlocks[0]._map)

    //     // console.log(convertFromHTML(props.message)[0])

    //     console.log(JSON.stringify(convertFromHTML(props.message)))
    //     // console.log(convertToRaw(props.message))
    //     // console.log(convertFromRaw(props.message))
    //     return (
    //         <>
    //             <h3>Hi you</h3>
    //             <ForumNewReply myWidth={500}  />
    //         </>
    //     )
    // }

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
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Image
                    </Typography> */}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {convertToDate(props.posted)}
                    </Typography>
                </div>
                <div className="reply-bottom-right">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom dangerouslySetInnerHTML={{ __html: convertText(props.message) }}>
                    {/* {props.message} */}
                    {/* <div dangerouslySetInnerHTML={{ __html: convertText(props.message) }}/> */}

                    </Typography>
                    {state.user_id === props.user_id ? <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <div className="edit-delete-reply">
                            {/* <IconButton onClick={toggleEditReply} ><EditIcon/></IconButton> */}
                            <IconButton onClick={deleteReply}><DeleteIcon /></IconButton>
                        </div>
                    </Typography> : null}
                    {/* {
                        editOn ? Editor() : null
                    } */}
                </div>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
                </Typography>
                <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography> */}
            </div>
        {/* </CardContent> */}
        {/* <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
);
}