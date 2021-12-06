import Card from "../components/Card";
import {useState} from 'react'

const AlumniSearchResults = (props) => {

    const [search, setSearch] = useState({})

    const handleChange = (event) => {

    }

    const handleSubmit = (event) => {

    }

    return (
        <div className="">
            <h4>AlumniSearchResults</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={search.firstName} onChange={handleChange} />
            </form>
        </div>
    )
}

export default AlumniSearchResults;