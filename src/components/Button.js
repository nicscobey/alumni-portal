import { Button } from "@mui/material";
import { styled } from "@mui/system";


const GAButton = styled(Button)(({theme}) => ({
    width: 225,
    boxShadow: "0px 3px 0px #a20101",
    color: "white",
    background: "#fa4542",
    '&:hover': {
        background: "#da3a37",
        boxShadow: "0px 3px 0px #8e0101"
    }
}))

export default GAButton