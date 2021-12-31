import Button from "../components/Button";
import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { TextField, Stack } from "@mui/material";
import GAButton from "../components/Button";
import DesktopNav from "../components/DesktopNav";
import {useAppState} from '../AppState'


const Login = (props) => {

    let history = useHistory();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event)=> {
        setForm({...form, [event.target.name]: event.target.value})
    }

    ////////////

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
            dispatch({type: "auth", payload: {token, email: user.email, user_id: user.id}})
            window.localStorage.setItem("auth", JSON.stringify({token, email: user.email}))
            history.push("/my/home")
        }
    }, [userData])

    const login = async () => {
        console.log(state)
        console.log(state.url)
        return fetch(state.url + "/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then((response) => response.json())
    }

    /////////////

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('logged in!');
        // setForm({
        //     username: "",
        //     password: ""
        // })
        login().then((data) => {
            setUserData(data)
        })
    }

    return (
        <>
            <DesktopNav />
            <div className="login-page">
                <h2>LOGO</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="center-items">
                        <TextField label="Email" onChange={handleChange} type="text" name="email" value={form.email} />
                        <TextField label="Password" onChange={handleChange} type="password" name="password" value={form.password} />
                        <GAButton type="submit">Log In</GAButton>   
                    </Stack>
                </form>
                <p>Not registered? <Link to="/signup" className="colored-link">Create an Account</Link></p>
            </div>
        </>
    )
}

export default Login;