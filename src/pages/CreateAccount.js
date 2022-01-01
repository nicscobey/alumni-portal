import Button from "../components/Button";
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import GAButton from "../components/Button";
import { TextField, Stack } from "@mui/material";
import DesktopNav from "../components/DesktopNav";
import {useAppState} from '../AppState'
import {useParams, useHistory} from 'react-router-dom'

const CreateAccount = (props) => {
    console.log(props);

    const [form, setForm] = useState({
        email: "",
        // confirmUsername: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: ""
    });



    ////////////

    const history = useHistory()

    const [userData, setUserData] = useState(null)

    const {state, dispatch} = useAppState()

    useEffect(() => {
        // if (userData && userData.error) {
        //     console.log(userData)
        //     alert('Invalid username or password')
        // }
        if (userData) {
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

    const signup = () => {
        console.log(form)
        console.log(JSON.stringify(form))
        console.log({email: form.email, password: form.password, firstname: form.firstname, lastname: form.lastname})
        return fetch(state.url + "/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(form),
            body: JSON.stringify({email: form.email, password: form.password, firstname: form.firstname, lastname: form.lastname})
        }).then((response) => response.json())
    }

    /////////////



    const handleChange = (event)=> {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(event.target);
        // alert('created account!!');
        // setForm({
        //     username: "",
        //     confirmUsername: "",
        //     password: "",
        //     confirmPassword: ""
        // })

        // if (event.target.username.value !== event.target.confirmUsername.value) {
        //     // console.log(event.target.username.value, event.target.confirmUsername.value)
        //     alert('usernames must match!')
        // }

        //check if email already exists

        // const response = await fetch(state.url + "/users")
        // const data = await response.json()
        // console.log(response)
        // console.log(data)


        if (event.target.password.value !== event.target.confirmPassword.value) {
            alert('passwords must match!')
            // console.log(event.target.password.value, event.target.confirmPassword.value)
        }
        else {
            setForm({
                email: "",
                // confirmUsername: "",
                firstname: "",
                lastname: "",
                password: "",
                confirmPassword: ""
            })
            // props.history.push("/")
            signup().then((data) => {
                console.log(data)
                if (data.error === "User already exists") {
                    alert("User already exists!")
                }
                else {
                    // setUserData(data)
                    props.history.push("/")
                }
            })
        }
    }

    return (
        <>
        <DesktopNav />
        <div className="create-account-page">
            <h2>LOGO</h2>
            <h3>Create Account</h3>
            <form className="flex-column" onSubmit={handleSubmit}>
                <Stack spacing={2} className="center-items">
                    <TextField required onChange={handleChange} type="text" name="firstname" label="First Name" value={form.firstname} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="lastname" label="Last Name" value={form.lastname} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="email" label="Email" value={form.email} className="fixed-width-input" />
                    {/* <TextField required onChange={handleChange} type="text" name="confirmUsername" label="Confirm username" value={form.confirmUsername} className="fixed-width-input" /> */}
                    <TextField required  onChange={handleChange} type="password" name="password" label="Password" value={form.password} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="password" name="confirmPassword" label="Confirm password" value={form.confirmPassword} className="fixed-width-input" />
                    {/* Note: Might have an issue with the button below being a button, not an input? */}
                    <GAButton type="submit">Create Account</GAButton>
                </Stack>
            </form>
            <p>Already have an account? <Link to="/" className="colored-link">Sign In</Link></p>
            {/* <GAButton>HELLO</GAButton> */}

        </div>
        </>
    )
}

export default CreateAccount;