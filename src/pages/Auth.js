import { useState, useEffect } from "react";
import {useAppState} from '../AppState'
import {useParams, useHistory} from 'react-router-dom'
import DesktopNav from "../components/DesktopNav";
import { Stack, TextField } from "@mui/material";
import GAButton from "../components/Button";

const Auth = (props) => {

    // const {page} = useParams()
    // console.log(form)
    // console.log(props)

    console.log(props)

    const history = useHistory()

    const type = useParams().form
    // console.log(type)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [userData, setUserData] = useState(null)

    const {state, dispatch} = useAppState()

    useEffect(() => {
        if (userData && userData.error) {
            console.log(userData)
            alert('Invalid username or password')
        }
        else if (userData) {
            console.log(userData)
            // if (userData.error) {
            //     console.log('hey')
            // }
            const {token, user} = userData
            dispatch({type: "auth", payload: {token, email: user.email}})
            window.localStorage.setItem("auth", JSON.stringify({token, email: user.email}))
            history.push("/my/home")
        }
    }, [userData])

    const actions = {
        signup: () => {
            return fetch(state.url + "/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        login: () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        }
    }

    // const actions = {
    //     signup: {  
    //         type: "signup",
    //         payload: formData
    //     }, 
    //     login: {
    //         type: "login",
    //         payload: formData
    //     }
    // }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        // console.log(formData)
    }

    // const handleSubmit = (event) => {
    //     event.prevent Default()
    //     // console.log(dispatch, actions)
    //     dispatch(actions[type])
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(dispatch, actions)
        actions[type]().then((data) => {
            setUserData(data)
        })
    }

    const Login = () => {
        return (
            <>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="center-items">
                        <TextField label="Email" type="text" name="email" value={formData.email} onChange={handleChange} />
                        <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                        <GAButton type="submit">Log In</GAButton>
                    </Stack>
                </form>
            </>
        )
    }

    const Signup = () => {
        return (
            <>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="center-items">
                        <TextField label="Email" type="text" name="email" value={formData.email} onChange={handleChange} />
                        <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                        <TextField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        <GAButton type="submit">Sign Up</GAButton>
                    </Stack>
                </form>
            </>
        )
    }

    return (
        <div>
            <DesktopNav />
            {/* <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <input type="submit" value={type} />
            </form> */}
            {type === "login" ? <Login /> : <Signup />}
        </div>
    )

    return <h1>hi</h1>

}

export default Auth