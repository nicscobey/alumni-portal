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
                textAlign: "left",
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

export default function ForumNewReply(props) {

return (
    <Card sx={{ width: props.myWidth, margin: "10px" }}>
        {/* <CardContent sx={{ padding: 0, margin: 0 }}> */}
            <div className="reply-new-top">
                <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor defaultValue={props.value} onChange={props.handleChange} inlineToolbar={true} label="Click here to start typing..." controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote"]} />
                </ThemeProvider>
            </div>
    </Card>
);
} 