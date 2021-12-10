import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledCard = styled.section`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding: 10px;
    max-width: 400px;
    background-color: ${props => props.bgcolor ? props.bgcolor : "white"};
    margin: 25px auto 25px auto;
`

const CardLink = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
`

const AlumnusCard = (props) => {

    const person = props.person;
    return (
        <StyledCard bgcolor={props.bgcolor}>
            <Link to={`alumni/${props.path}`} person={person}>
                <CardLink>
                    <h1>{person.firstName} {person.lastName}</h1>
                    <h4>{person.jobTitle}</h4>
                </CardLink>
            </Link>
        </StyledCard>
    )
}

export default AlumnusCard;