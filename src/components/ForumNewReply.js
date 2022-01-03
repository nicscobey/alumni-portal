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
import { useState } from 'react';
import { convertToRaw } from 'draft-js' 


import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import GAButton from '../components/Button'



const myTheme = createTheme({
    // Set up your custom MUI theme here
    palette: {
        primary: {
            main: "#000000"
        }
    }
})

Object.assign(myTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                // backgroundColor: "#ebebeb",
            },
            editor: {
                // borderBottom: "1px solid gray", 
                textAlign: "left",
                // color: "red",
                // width: "100%",
                // margin: "10px",
                // backgroundColor: "pink"
            },
            container: {
                // backgroundColor: "green"
            },
            editorContainer: {
                // backgroundColor: "yellow",
                margin: "10px",
            },
            toolbar: {
                backgroundColor: "rgb(235, 235, 235)",
                color: "#white !important",
                textAlign: "center"
            },
            placeHolder: {
                // backgroundColor: "#ebebeb",
                // paddingLeft: 20,
                // width: "inherit",
                // font: "inherit"
            },
            // anchorLink: {
            //     color: "#333333",
            //     textDecoration: "underline",
            //     backgroundColor: "blue"
            // }
        }
    }
})

// export default function BasicButtonGroup() {
//   return (
//     <ButtonGroup variant="contained" aria-label="outlined primary button group">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </ButtonGroup>
//   );
// }
export default function ForumNewReply(props) {

    // const [textEditor, setTextEditor] = useState("")

    // const onChange = (event) => {
    //     // console.log(event.target.value)
    //     // setTextEditor(event.target.value)
    //     console.log('hi')
    // }

    // const [value, setValue] = useState('')

    // const handleChange = event => {
    //     const plainText = event.getCurrentContent().getPlainText() // for plain text
    //     // const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
    //     // setValue(JSON.stringify(rteContent)) // store your rteContent to state
    //     // console.log(rteContent)
    //     console.log(plainText)
    //     setValue(plainText)
    // }

    console.log(props.value)
    // console.log(myWidth)
    console.log(props.myWidth)
return (
    <Card sx={{ width: props.myWidth, margin: "10px" }}>
        {/* <CardContent sx={{ padding: 0, margin: 0 }}> */}
            <div className="reply-new-top">
                <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor defaultValue={props.value} onChange={props.handleChange} inlineToolbar={true} label="Click here to start typing..." controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote"]} />
                </ThemeProvider>

                {/* controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear"]} */}
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
            {/* <div className="reply-new-bottom"> */}
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
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography> */}
                {/* </div> */}
            {/* </div> */}
    </Card>
);
}