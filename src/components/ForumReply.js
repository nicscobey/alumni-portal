import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DOMPurify from "dompurify";


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

return (
    <Card sx={{ width: 900, margin: "10px" }}>
        {/* <CardContent sx={{ padding: 0, margin: 0 }}> */}
            <div className="reply-top">
                {/* <div className="reply-top-left">Date Posted</div> */}
                <div className="reply-top-right">#{props.replyIndex + 1}</div>
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