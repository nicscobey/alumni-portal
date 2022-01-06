import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, CardContent, Typography } from '@mui/material';
import $ from 'jquery'; 

const StyledCard = styled.section`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding: 10px;
    max-width: 400px;
    background-color: ${props => props.bgcolor ? props.bgcolor : "white"};
    margin: 25px auto 25px auto;
    transition-duration: .25s;

    &:hover {
        transform: translate(0px, -5px);
        box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.12);
    }
`

const CardLink = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
`

const GACard = (props) => {

    const fullTitle = props.title;
    let titleWords = fullTitle.split(" ")
    let title = titleWords.join('')
    
    const animateArrow = () => {
        $(`#${title}-arrow`).addClass('animateArrow')
    }

    const stopAnimateArrow = () => {
        $(`#${title}-arrow`).removeClass('animateArrow')
    }

    return (
        <StyledCard bgcolor={props.bgcolor} onMouseEnter={animateArrow} onMouseLeave={stopAnimateArrow}>
            <Link to={props.path}>
                <CardLink id={`{props.title}-card-link`}>
                <div className="card-left">
                    <div className="bold">{props.title}</div>
                    {/* <div>Last updated: {props.lastUpdated}</div> */}
                    <div>{props.description}</div>
                </div>
                <div className="card-right" id={`${title}-arrow`}>
                    <ArrowForwardIosIcon />
                </div>
                </CardLink>
            </Link>
        </StyledCard>

    )
}

export default GACard;