import Card from "../components/Card";
import AlumniSearchResults from "../components/AlumniSearchResults";
import {useState} from 'react'
import Alumni from '../SampleAlumni'
import AlumnusCard from "../components/AlumnusCard";
import AlumniPagination from "../components/AlumniPagination";
import DesktopNav from "../components/DesktopNav";
import { TextField} from "@mui/material";
import { useAppState } from "../AppState";


const AlumniDatabase = () => {
    const [search, setSearch] = useState({
        firstName: "",
        lastName: "",
        gaProgram: "",
        jobTitle: "",
        location: ""
    })

    // const [results, setResults] = useState(Alumni);
    const [results, setResults] = useState(null)
    const [page, setPage] = useState(1)


    const {state, dispatch} = useAppState()
    const {token, url } = state;


    const getAlumni = async (newSearch) => {
        const response = await fetch(state.url + "/users", {
            method: "get",
            headers: {
                Authorization: "bearer " + token,
            }
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        

        return data.filter(alumnus => {

            
            let takenCourse = false;
            alumnus.gaprograms.forEach(course => {
                if (course.includes(newSearch.gaProgram)) {
                    takenCourse = true;
                }
            })
            // console.log(alumnus)
            // console.log(alumnus.firstname.toLowerCase())
            // console.log(newSearch.firstName.toLowerCase())
            // console.log(alumnus.firstname.toLowerCase().includes(newSearch.firstName.toLowerCase()))

            return (
                alumnus.firstname.toLowerCase().includes(newSearch.firstName.toLowerCase()) &&
                alumnus.lastname.toLowerCase().includes(newSearch.lastName.toLowerCase()) && 
                takenCourse
                // alumnus.jobTitle?.toLowerCase().includes(newSearch.jobTitle.toLowerCase()) &&
                // alumnus.location?.toLowerCase().includes(newSearch.location.toLowerCase())
            )
        })
    }

    const handleChange = async (event) => {
        const newSearch = {...search, [event.target.name]: event.target.value};
        // const newResults = Alumni.filter(alumnus => {

            
        //     let takenCourse = false;
        //     alumnus.gaProgram.forEach(course => {
        //         if (course.includes(newSearch.gaProgram)) {
        //             takenCourse = true;
        //         }
        //     })

        //     return (
        //         alumnus.firstName.toLowerCase().includes(newSearch.firstName.toLowerCase()) &&
        //         alumnus.lastName.toLowerCase().includes(newSearch.lastName.toLowerCase()) &&
        //         alumnus.jobTitle.toLowerCase().includes(newSearch.jobTitle.toLowerCase()) &&
        //         alumnus.location.toLowerCase().includes(newSearch.location.toLowerCase())
        //     )
        // })
        // setResults(newResults);
        // setSearch(newSearch);
        const alumni = await getAlumni(newSearch)
        console.log(alumni)
        console.log(search)
        await setResults(alumni)
        setSearch(newSearch)
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert('submitted!')
    // }

    const loadingResults = () => {
        return <h3>Loading...</h3>
    }

    const loadedResults = () => {
        console.log(results)
        if (results.length>0){
            return (
                results.map((result) => (
                    <div>
                        {/* <h1>{result.firstName} {result.lastName}</h1> */}
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
            <form>
                <TextField label="First Name" type="text" name="firstName" value={search.firstName} onChange={handleChange}  />
                <TextField label="Last Name" type="text" name="lastName" value={search.lastName} onChange={handleChange} />
                {/* CONSIDER ADDING THE MUI SELECT HERE INSTEAD */}
                <select name="gaProgram" onChange={handleChange}>
                    <option value="">Select a GA Program</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="User Experience Design">User Experience Design</option>
                </select>
                {/* <TextField type="text" name="jobTitle" value={search.jobTitle} onChange={handleChange} placeholder="Job Title"/>
                <TextField type="text" name="lastname" value={search.location} onChange={handleChange} placeholder="Location" /> */}
                {/* <input type="submit" className="button" value="Search" /> */}
            </form>
            {/* <AlumniSearchResults /> */}
            <div className="alumni-search-results">
                {results ? loadedResults() : loadingResults() }
            </div>
            {/* <AlumniPagination results={results} setPage={setPage}/> */}
        </div>
    )
}

export default AlumniDatabase;