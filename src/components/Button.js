// import styled from 'styled-components'

// const Button = styled.button`
//     width: 225px;
//     height: 40px;
//     left: 48px;
//     top: 433px;
//     background: #FA4542;
//     box-shadow: 0px 3px 0px #A20101;
//     border-radius: 3px;
//     border: none;
//     color: white;
//     font-weight: bold;
//     &:hover {
//         cursor: pointer;
//     }
// `

// export default Button;

import { Button } from "@mui/material";
import { styled } from "@mui/system";

//   width: 225px;
//   height: 40px;
//   left: 48px;
//   top: 433px;
//   background: #fa4542;
//   box-shadow: 0px 3px 0px #a20101;
//   border-radius: 3px;
//   border: none;
//   color: white;
//   font-weight: bold;


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