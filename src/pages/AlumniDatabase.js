import Card from "../components/Card";
import AlumniSearchResults from "../components/AlumniSearchResults";
import {useState} from 'react'
import Alumni from '../SampleAlumni'
import AlumnusCard from "../components/AlumnusCard";
import AlumniPagination from "../components/AlumniPagination";
import DesktopNav from "../components/DesktopNav";
import { TextField} from "@mui/material";


const AlumniDatabase = () => {
    const [search, setSearch] = useState({
        firstName: "",
        lastName: "",
        gaProgram: "",
        jobTitle: "",
        location: ""
    })

    const [results, setResults] = useState(Alumni);
    const [page, setPage] = useState(1)


    const handleChange = (event) => {
        const newSearch = {...search, [event.target.name]: event.target.value};
        const newResults = Alumni.filter(alumnus => {

            
            let takenCourse = false;
            alumnus.gaProgram.forEach(course => {
                if (course.includes(newSearch.gaProgram)) {
                    takenCourse = true;
                }
            })

            return (
                alumnus.firstName.toLowerCase().includes(newSearch.firstName.toLowerCase()) &&
                alumnus.lastName.toLowerCase().includes(newSearch.lastName.toLowerCase()) &&
                alumnus.jobTitle.toLowerCase().includes(newSearch.jobTitle.toLowerCase()) &&
                alumnus.location.toLowerCase().includes(newSearch.location.toLowerCase())
            )
        })
        setResults(newResults);
        setSearch(newSearch);
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert('submitted!')
    // }

    const loadingResults = () => {
        return <h3>Loading...</h3>
    }

    const loadedResults = () => {
        return (
            results.map((result) => (
                <div>
                    {/* <h1>{result.firstName} {result.lastName}</h1> */}
                    <AlumnusCard path={result._id} bgcolor="#F6F6F6" person={result}/>
                </div>

            ))
        )
    }

    return (
        <div className="">
            <DesktopNav />
            <h2>Alumni Database</h2>
            <form>
                <TextField type="text" name="firstName" value={search.firstName} onChange={handleChange} placeholder="First Name" />
                <TextField type="text" name="lastName" value={search.lastName} onChange={handleChange} placeholder="Last Name" />
                {/* CONSIDER ADDING THE MUI SELECT HERE INSTEAD */}
                <select multiple>
                    <option value="">Select a GA Program</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="User Experience Design">User Experience Design</option>
                </select>
                <TextField type="text" name="jobTitle" value={search.jobTitle} onChange={handleChange} placeholder="Job Title"/>
                <TextField type="text" name="lastname" value={search.location} onChange={handleChange} placeholder="Location" />
                {/* <input type="submit" className="button" value="Search" /> */}
            </form>
            {/* <AlumniSearchResults /> */}
            <div className="alumni-search-results">
                {results ? loadedResults() : loadingResults() }
            </div>
            <AlumniPagination results={results} setPage={setPage}/>
        </div>
    )
}

export default AlumniDatabase;