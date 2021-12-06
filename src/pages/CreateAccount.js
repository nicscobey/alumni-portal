import Button from "../components/Button";
import {useState} from 'react'
import {Link} from 'react-router-dom'
import GAButton from "../components/Button";
import { TextField, Stack } from "@mui/material";

const CreateAccount = (props) => {
    console.log(props);

    const [form, setForm] = useState({
        username: "",
        confirmUsername: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event)=> {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        alert('created account!!');
        // setForm({
        //     username: "",
        //     confirmUsername: "",
        //     password: "",
        //     confirmPassword: ""
        // })

        if (event.target.username.value !== event.target.confirmUsername.value) {
            // console.log(event.target.username.value, event.target.confirmUsername.value)
            alert('usernames must match!')
        }
        else if (event.target.password.value !== event.target.confirmPassword.value) {
            alert('passwords must match!')
            // console.log(event.target.password.value, event.target.confirmPassword.value)
        }
        else {
            setForm({
                username: "",
                confirmUsername: "",
                password: "",
                confirmPassword: ""
            })
            props.history.push("/")
        }
    }

    return (
        <div className="create-account-page">
            <h2>LOGO</h2>
            <h3>Create Account</h3>
            <form className="flex-column" onSubmit={handleSubmit}>
                <Stack spacing={2} className="center-items">
                    <TextField required onChange={handleChange} type="text" name="username" label="Username" value={form.username} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="confirmUsername" label="Confirm username" value={form.confirmUsername} className="fixed-width-input" />
                    <TextField required  onChange={handleChange} type="password" name="password" label="Password" value={form.password} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="password" name="confirmPassword" label="Confirm password" value={form.confirmPassword} className="fixed-width-input" />
                    {/* Note: Might have an issue with the button below being a button, not an input? */}
                    <GAButton type="submit">Create Account</GAButton>
                </Stack>
            </form>
            <p>Already have an account? <Link to="/" className="colored-link">Sign In</Link></p>
            {/* <GAButton>HELLO</GAButton> */}

        </div>
    )
}

export default CreateAccount;