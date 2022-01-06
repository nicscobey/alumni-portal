import {useState} from 'react'
import AlumnusCard from "../components/AlumnusCard";
// import AlumniPagination from "../components/AlumniPagination";
import DesktopNav from "../components/DesktopNav";
import { TextField} from "@mui/material";
import { useAppState } from "../AppState";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AlumniDatabase = () => {
    const [search, setSearch] = useState({
        firstName: "",
        lastName: "",
        gaProgram: "",
        jobTitle: "",
        location: ""
    })

    const [results, setResults] = useState(null)

    const {state, dispatch} = useAppState()
    const {token, url } = state;

    const getAlumni = async (newSearch) => {
        const response = await fetch(state.url + "/users", {
            method: "get",
            headers: {
                Authorization: "bearer " + token,
            }
        })
        const data = await response.json()        

        return data.filter(alumnus => {
            return (
                alumnus.firstname.toLowerCase().includes(newSearch.firstName.toLowerCase()) &&
                alumnus.lastname.toLowerCase().includes(newSearch.lastName.toLowerCase()) && 
                alumnus.program.includes(newSearch.gaProgram)
            )
        })
    }

    const handleChange = async (event) => {
        const newSearch = {...search, [event.target.name]: event.target.value};
        const alumni = await getAlumni(newSearch)
        await setResults(alumni)
        setSearch(newSearch)
    }

    const loadedResults = () => {
        if (results.length>0){
            return (
                results.map((result) => (
                    <div>
                        <AlumnusCard path={result.id} bgcolor="#F6F6F6" person={result}/>
                    </div>

                ))
            )
        }
        else {
            return <h3>No results found!</h3>
        }
    }

    return (
        <div className="">
            <DesktopNav />
            <h2>Alumni Database</h2>
            {results ? null : <h3>Enter some search parameters to get started!</h3>}
            <form>
                <TextField label="First Name" type="text" name="firstName" value={search.firstName} onChange={handleChange}  />
                <TextField label="Last Name" type="text" name="lastName" value={search.lastName} onChange={handleChange} />
                <FormControl sx={{width: 250, textAlign: "left"}}>
                    <InputLabel id="demo-simple-select-label">Select a Program</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={search.gaProgram}
                        label="Select a Program"
                        onChange={handleChange}
                        name="gaProgram"
                    >
                        <MenuItem value={"Data Analytics"}>Data Analytics</MenuItem>
                        <MenuItem value={"Data Science"}>Data Science</MenuItem>
                        <MenuItem value={"Digital Marketing"}>Digital Marketing</MenuItem>
                        <MenuItem value={"Product Management"}>Product Management</MenuItem>
                        <MenuItem value={"Software Engineering"}>Software Engineering</MenuItem>
                        <MenuItem value={"User Experience Design"}>User Experience Design</MenuItem>
                    </Select>
                </FormControl>
            </form>
            <div className="alumni-search-results">
                {results ? loadedResults() : null }
            </div>
        </div>
    )
}

export default AlumniDatabase;