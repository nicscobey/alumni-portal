import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';

// export default function BasicButtonGroup() {
//   return (
//     <ButtonGroup variant="contained" aria-label="outlined primary button group">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </ButtonGroup>
//   );
// }
export default function ForumNewReply() {
return (
    <Card sx={{ width: 900, margin: "10px" }}>
        {/* <CardContent sx={{ padding: 0, margin: 0 }}> */}
            <div className="reply-new-top">
                {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button size="small"><FormatBoldIcon /></Button>
                    <Button size="small"><FormatItalicIcon /></Button>
                    <Button size="small"><FormatUnderlinedIcon /></Button>
                    <Button size="small"><FormatListBulletedIcon/></Button>
                    <Button size="small"><FormatListNumberedIcon/></Button>
                    <Button size="small"><FormatIndentDecreaseIcon/></Button>
                    <Button size="small"><FormatIndentIncreaseIcon/></Button>
                </ButtonGroup> */}
                {/* <FormatBoldIcon />
                <FormatItalicIcon />
                <FormatUnderlinedIcon /> */}
            </div>
            <div className="reply-new-bottom">
                {/* <div className="reply-bottom-left">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Author</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Image
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Date Posted
                    </Typography>
                </div> */}
                {/* <div className="reply-new-bottom"> */}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                {/* </div> */}
            </div>
    </Card>
);
}