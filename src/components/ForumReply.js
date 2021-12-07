import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const bull = (
// <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
// >
//     •
// </Box>
// );

export default function ForumReply() {
return (
    <Card sx={{ width: 900, margin: "10px" }}>
        {/* <CardContent sx={{ padding: 0, margin: 0 }}> */}
            <div className="reply-top">
                <div className="reply-top-left">Date Posted</div>
                <div className="reply-top-right">#1</div>
            </div>
            <div className="reply-bottom">
                <div className="reply-bottom-left">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Author</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Image
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Date Posted
                    </Typography>
                </div>
                <div className="reply-bottom-right">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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